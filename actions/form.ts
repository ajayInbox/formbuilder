"use server"

import { db } from "@/lib/db"
import { formSchema, formSchemaType } from "@/schemas/form-schemas"
import { currentUser } from "@clerk/nextjs"

class UserNotFoundErr extends Error{}

export async function getFormStats() {
    
    const user = await currentUser()

    if(!user){
        throw new UserNotFoundErr()
    }

    const stats = await db.form.aggregate({
        where: {
            userId: user.id,
        },
        _sum: {
            visits: true,
            submissions: true,
        }
    })

    const visits = stats._sum.visits || 0
    const submissions = stats._sum.submissions || 0

    let submissionRate = 0
    if(visits>0){
        submissionRate = (submissions/visits)*100
    }

    const bounceRate = 100 - submissionRate

    return {
        visits, submissions, submissionRate, bounceRate
    }
}

export async function createForm(data: formSchemaType) {
    const validate = formSchema.safeParse(data)
    if(!validate.success){
        throw new Error("fields are not valid")
    }

    const user = await currentUser()
    if(!user){
        throw new UserNotFoundErr()
    }

    const { name, description } = data
    const form = await db.form.create({
        data: {
            userId: user.id,
            name,
            description
        }
    })

    if(!form){
        throw new Error("Something went wrong")
    }
    return form.id
}

export async function getForms() {
    const user = await currentUser()
    if(!user){
        throw new UserNotFoundErr()
    }

    return await db.form.findMany({
        where: {
            userId: user.id
        },
        orderBy: {
            createdAt: "desc"
        }
    })
}

export async function getFormById(id: number) {
    const user = await currentUser()
    if(!user){
        throw new UserNotFoundErr()
    }

    return await db.form.findUnique({
        where: {
            userId: user.id,
            id
        }
    })
}

export async function updateFormContent(id: number, jsonContent: string) {
    const user = await currentUser()
    if(!user){
        throw new UserNotFoundErr()
    }

    return await db.form.update({
        where: {
            userId: user.id,
            id,
        },
        data: {
            content: jsonContent
        }
    })
}

export async function publishFormContent(id: number) {
    const user = await currentUser()
    if(!user){
        throw new UserNotFoundErr()
    }

    return await db.form.update({
        data: {
            published: true,
        },
        where: {
            userId: user.id,
            id
        }
    })
}

export async function getFormContentByUrl(formUrl: string) {
  return await db.form.update({
    select: {
      content: true,
    },
    data: {
      visits: {
        increment: 1,
      },
    },
    where: {
      shareUrl: formUrl,
    },
  });
}

export async function SubmitForm(formUrl: string, content: string) {
   return await db.form.update({
    data: {
        submissions: {
            increment: 1
        },
        formSubmissions: {
            create: {
                content
            }
        }
    },
    where: {
        shareUrl: formUrl,
        published: true
    }
   }) 
}

export async function getFormSubmissions(id: number){
    const user = await currentUser()
    if(!user){
        throw new UserNotFoundErr()
    }

    return await db.form.findUnique({
        where: {
            userId: user.id,
            id
        },
        include: {
            formSubmissions: true
        }
    })
}
