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
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { GenderOptions, Doctors } from "@/constans"
import { Label } from "../ui/label"
import { SelectItem } from "../ui/select"
import Image from "next/image"


const RegisterForm = ({user}:{user:User}) => {
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12 flex-1">
        <section className="space-y-4">
          <h1 className="header">Welcome</h1>
          <p className="text-dark-700">Let us know more about yourself.</p>
        </section>
        <section className="space-y-6">
          <div className="mb-9 space-y-1"> 
          <h2 className="sub-header">Personal Information</h2>
          </div>
        </section>


        <CustomFormField 
          control={form.control} 
          fieldType={FormFieldType.INPUT}
          name='name'
          placeholder='John Doe'
          iconSrc='/assets/icons/user.svg'
          iconAlt='user'
        />
        
        <div className="flex flex-col gap-6 xl:flex-row">
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
        </div>
        
        <div className="flex flex-col gap-6 xl:flex-row">
        <CustomFormField 
          control={form.control} 
          fieldType={FormFieldType.DATE_PICKER}
          name='birthDate'
          label='Date of Birth'
        />
        
        <CustomFormField 
          control={form.control} 
          fieldType={FormFieldType.SKELETON}
          name='gender'
          label='Gender'
          renderSkeleton={field=>(
            <FormControl>
                <RadioGroup className='flex h-11 gap-6 xl:justify-between'
                onValueChange={field.onChange}
                defaultValue={field.value}>
                    {GenderOptions.map(option=>(
                        <div key={option} className='radio-group'>
                        <RadioGroupItem 
                          value={option}
                          id={option}
                        />
                            <Label htmlFor={option} className='cursor-pointer'>
                                {option}
                            </Label>
                        </div>
                    ))}

                </RadioGroup>
            </FormControl>
          )}
        />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
        <CustomFormField 
          control={form.control} 
          fieldType={FormFieldType.INPUT}
          name='address'
          label='Address'
          placeholder='14th Street, New York'
        />

<CustomFormField 
          control={form.control} 
          fieldType={FormFieldType.INPUT}
          name='occupation'
          label='Occupation'
          placeholder='Software Engineer'
        />

        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
        <CustomFormField 
          control={form.control} 
          fieldType={FormFieldType.INPUT}
          name='emergencyContactName'
          label='Emergency cCcontact name'
          placeholder="Guardian's name"
        />
        
        <CustomFormField 
          control={form.control} 
          fieldType={FormFieldType.PHONE_INPUT}
          name='emergencyContactNumber'
          label='Emeregency contact number'
          placeholder='(555)123-4567'
        />
        </div>

        <section className="space-y-6">
          <div className="mb-9 space-y-1"> 
          <h2 className="sub-header">Medical Information</h2>
          </div>
        </section>

        <CustomFormField 
          control={form.control} 
          fieldType={FormFieldType.SELECT}
          name='primaryPhysician'
          label='Primary Physician'
          placeholder='Select a physician'
        >
          {Doctors.map(doctor=>(
            <SelectItem key={doctor.name} value={doctor.name}>
              <div className="flex cursor-pointer items-center gap-2">
                <Image 
                  src={doctor.image}
                  width={32}
                  height={32}
                  alt={doctor.name}
                  className='rounded-full border border-dark-500'
                />
                <p>{doctor.name}</p>
              </div>
            </SelectItem>

          ))}
        </CustomFormField>

        <div className="flex flex-col gap-6 xl:flex-row">

        </div>

        <div className="flex flex-col gap-6 xl:flex-row">

        </div>

        <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
      </form>
    </Form>
  )
}

export default RegisterForm