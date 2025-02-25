"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import CustomFormField, { FormFieldType } from "../CustomFormField"
import SubmitButton from "../SubmitButton"
import { useState } from "react"
import { UserFormValidation } from "@/lib/validation"
import { useRouter } from "next/navigation"
import { createUser } from "@/lib/actions/patient.actions"


const PatientForm = () => {
  const router = useRouter()
  const [isLoading,setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
    },
  })

  async function onSubmit({name,email,phone}: z.infer<typeof UserFormValidation>) {
    setIsLoading(true)
    try{
      const userData = {name,email,phone}
      const user = await createUser(userData)
      console.log(user)
      if(user) {router.push(`/patients/${user.$id}/register`)}
    }catch(error){
      console.log(error)
    }
    
    setIsLoading(false)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="mb-12 space-y-4">
          <h1 className="header">Hi There</h1>  
          <p className="text-dark-700">Schedule your first appointment.</p>
        </section>
        <CustomFormField 
          control={form.control} 
          fieldType={FormFieldType.INPUT}
          name='name'
          label='Full name'
          placeholder='John Doe'
          iconSrc='/assets/icons/user.svg'
          iconAlt='user'
        />
        
        <CustomFormField 
          control={form.control} 
          fieldType={FormFieldType.INPUT}
          name='email'
          label='Email'
          placeholder='JohnDoe@zOrbital.sat'
          iconSrc='/assets/icons/email.svg'
          iconAlt='email'
        />
        
        <CustomFormField 
          control={form.control} 
          fieldType={FormFieldType.PHONE_INPUT}
          name='phone'
          label='Phone number'
          placeholder='(555)123-4567'
        />
        
        <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
      </form>
    </Form>
  )
}

export default PatientForm