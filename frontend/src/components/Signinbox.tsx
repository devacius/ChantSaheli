import React from 'react'
import {signinInput} from '@brokencoder/medium-clone-common';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "./ui/input"
import { Label } from "./ui/label"

type Props = {}

export default function SigninBox  (props: Props){
const navigate=useNavigate();
  return (
    <div className='min-h-screen w-auto'>
        <Card >
      <CardHeader >
        <CardTitle>Sign in to you Account</CardTitle>
        <CardDescription>Don't have an Account?<Label onClick={()=>{navigate('/signup')}}><b><u>Signup</u></b></Label></CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Email</Label>
              <Input id="email" placeholder="acb@gmail.com" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Password</Label>
              <Input id="password" placeholder="123.." />
            </div>
            
          </div>
        </form>
      </CardContent>
      <CardFooter >
        <Button   className='w-full border-2 rounded bg-black text-white'>Sign  in</Button>
      </CardFooter>
    </Card>
    </div>
  )
}