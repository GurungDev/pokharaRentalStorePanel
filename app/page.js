"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { loginUser } from "@/services/auth/login.service"
import { useRouter } from "next/navigation"
import { setLoginInfo } from "@/lib/storage.utils"
import Image from "next/image"
 

const formSchema = z.object({
  email: z.string().email({
    message: "Invalid email format.",
  }),

  password: z.string({message: "must be string"}).min(5, {
    message: " must be at least 5 characters.",
  }),
})


 
export default function Home() {
  const { toast } = useToast()
  const { push } = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  })

  async function onSubmit(values) {
    try {
       const res = await loginUser({"email": values.email, "password": values.password,  "validateFor": "admin"});
      
       if(!res){
        throw new Error(400, "Something went wrong")
      }
    
      setLoginInfo({token: res?.data?.token})
      push("/dashboard")
      toast({
        title: "Login sucess"})

    } catch (error) {
     
      toast({
        variant: "destructive",
        title: "Login failed",
        description: error.response?.data?.message || "Something went wrong"})
    }
   
  }

  return (
   <main className=" w-[80%] md:w-[50%] lg:w-[45%] m-auto h-full ">
    <Image src={"/logo-black.png"} alt="logo" width={100} height={50} className="m-auto"></Image>
     <Form {...form} >
      <form  className="grid gap-7 bg-neutral-100 my-5 py-10 px-20 shadow-md" onSubmit={form.handleSubmit(onSubmit)}>
      <div className="text-center">
      <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Pokhara Rental</h1>
      <small className="">Login into the admin panel</small>
      </div>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="email" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> 
        <Button type="submit" className='btn'>Login</Button>
      </form>
    </Form>
   </main>
  )
}


  