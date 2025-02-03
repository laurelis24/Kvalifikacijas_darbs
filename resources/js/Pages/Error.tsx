import React from 'react'

interface Props{
    error: {message:string, code:number};
}

export default function Error(props:Props) {
    console.log(props)
  return (
    
    <div className='text-2xl font-bold'>{props.error.message}</div>
  )
}
