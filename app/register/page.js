 
import RegisterForm from "@/components/register page/registerForm";
import Image from "next/image";
 
export default function RegisterPage() {
  return (
    <main className=" w-[80%] md:w-[50%] lg:w-[55%] m-auto h-full ">
      <Image
        src={"/logo-black.png"}
        alt="logo"
        width={100}
        height={50}
        className="m-auto"
      ></Image>
      <RegisterForm/>
    </main>
  );
}
