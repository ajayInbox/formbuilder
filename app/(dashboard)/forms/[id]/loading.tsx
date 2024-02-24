import { ImSpinner2 } from "react-icons/im"

export default function Loading() {
  return (
    <div className='flex justify-center items-center h-full w-full'>
        <ImSpinner2 className="animate-spin h-12 w-12"/>
    </div>
  )
}
