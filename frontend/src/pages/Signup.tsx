import React from 'react'
import SignupBox from '../components/Signupbox'
type Props = {}

export default function Signup({}: Props) {
  return (
    <div className='flex flex-col min-h-screen min-w-full md:flex-row'>
      <div className='max-h-36 w-full justify-center items-center md: py-60 px-20 w-1/2 min-h-screen'>
        <SignupBox />
      </div>
      <div className='max-h-36 w-full md:py-60 px-20 w-1/2 min-h-screen'>
        <p className='font-extrabold text-3xl font-serif'>"If you cannot get the job done if one attempt. Take another , and another and another ...."<p className='text-lg'>-Deepansh Gupta</p></p>
      </div>
    </div>
  )
}