import { getFormStats, getForms } from "@/actions/form"
import CreateFormBtn from "@/components/create-form-btn"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { Form } from "@prisma/client"
import { ArrowUpRight, View } from "lucide-react"
import { ReactNode, Suspense } from 'react'
import {FaWpforms} from "react-icons/fa"
import { HiCursorClick } from "react-icons/hi"
import { formatDistance } from "date-fns"
import {LuView} from "react-icons/lu"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { BiRightArrowAlt} from "react-icons/bi"
import { FaEdit } from "react-icons/fa"


export default function Home() {
  return (
    <div>
      <Suspense fallback={<StatCards loading={true}/>}>
        <CardStatsWrapper/>
      </Suspense>
      <Separator className="my-6"/>
      <h2 className="text-4xl font-bold col-span-2">My Forms</h2>
      <Separator className="my-6"/>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <CreateFormBtn/>
      
        <Suspense fallback={
          [1,2,3,4].map((el)=>(
          <FormCardSkeleton key={el}/>
          ))
        }>
          <FormCards/>
        </Suspense>
      </div>
    </div>
  )
}

async function CardStatsWrapper() {
  const stats = await getFormStats()
  return <StatCards loading={false} data={stats}/>
}

type StatCardsProps = {
  data?: Awaited<ReturnType<typeof getFormStats>>,
  loading: boolean
}

function StatCards({ data, loading}: StatCardsProps){

  return(
    <div className="w-full pt-8 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
      title="Total visits"
      icon={<View className='text-blue-600' />}
      helperText = "All time form visits"
      value={data?.visits.toLocaleString() || ""}
      loading={loading}
      className='shadow-md shadow-blue-600'
      />

      <StatCard
      title="Total submissions"
      icon={<FaWpforms className='text-yellow-600' />}
      helperText = "All time form submissions"
      value={data?.submissions.toLocaleString() || ""}
      loading={loading}
      className='shadow-md shadow-yellow-600'
      />

      <StatCard
      title="Submission rate"
      icon={<HiCursorClick className='text-green-600' />}
      helperText = "visits that result in submission"
      value={data?.submissionRate.toLocaleString()+"%" || ""}
      loading={loading}
      className='shadow-md shadow-green-600'
      />

      <StatCard
      title="Bounce rate"
      icon={<ArrowUpRight className='text-red-600' />}
      helperText = "visits that leave without interacting"
      value={data?.bounceRate.toLocaleString()+"%" || ""}
      loading={loading}
      className='shadow-md shadow-red-600'
      />
    </div>
  )
}

type StatCardProp = {
  title:string,
  icon:ReactNode,
  helperText:string,
  value:string,
  loading:boolean,
  className:string
}

export function StatCard({ title, icon, helperText, value, loading, className }: StatCardProp){
  return(
    <Card
      className={className}
      >
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm text-muted-foreground font-medium">{title}</CardTitle>
          {icon}
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {loading && (
              <Skeleton>
                <span className="opacity-0">0</span>
              </Skeleton>
            )}
            {!loading && value}
          </div>
          <p className="text-xs text-muted-foreground pt-1">{helperText}</p>
        </CardContent>
      </Card>
  )
}

function FormCardSkeleton(){
  return <Skeleton className="border-2 border-primary/20 h-[190px] w-full"/>
}

async function FormCards() {
  const forms = await getForms()
  return <>
  {forms.map((form)=>(
    <FormCard key={form.id} form={form}/>
  ))}
  </>
}

function FormCard({form}:{form:Form}){
  return(
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 justify-between">
          <span className="font-bold truncate">
            {form.name}
          </span>
          {form.published && <Badge>Published</Badge>}
          {!form.published && <Badge variant={"destructive"}>Draft</Badge>}
        </CardTitle>
        <CardDescription className="flex items-center justify-between text-muted-foreground text-sm">
          {formatDistance(form.createdAt, new Date(),{
            addSuffix: true,
          })}
          {!form.published && (
            <span className="flex items-center gap-2">
              <LuView className="text-muted-foreground"/>
              <span>{form.visits.toLocaleString()}</span>
              <FaWpforms className="text-muted-foreground"/>
              <span>{form.submissions.toLocaleString()}</span>
            </span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="text-sm h-[20px] text-muted-foreground">
            {form.description || "No Description"}
      </CardContent>
      <CardFooter>
        {form.published && (
          <Button asChild>
            <Link href={`/forms/${form.id}`}>View Submissions <BiRightArrowAlt/></Link>
          </Button>
        )}
        {!form.published && (
          <Button variant={"secondary"} asChild className="mt-2 w-full text-md gap-4">
            <Link href={`/builder/${form.id}`}>Edit form <FaEdit/></Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}