'use client'
import LoginForm from "@/app/ui/common/login-form";
import LogupForm from "../ui/common/logup-form";
import { Heading, Text } from "@radix-ui/themes";
import { useSearchParams, usePathname, useRouter } from "next/navigation";


export default function LoginPage() {
  const param = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParam = new URLSearchParams(param);
  console.log('param',searchParam);
  const isLogUp = searchParam.get('logup') === '1' && searchParam.get('logup') != undefined 

  const check = () => {
    searchParam.set('logup', isLogUp ? '0' : '1')
    replace(`${pathname}?${searchParam.toString()}`);
  }
  
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div
          style={{ background: "rgb(62 64 67)" }}
          className="flex h-20 w-full items-end rounded-lg p-3 md:h-36"
        >
          <div className="w-32 text-white md:w-36">
            <Heading>Little Dog Book</Heading>
          </div>
        </div>
        {!isLogUp ? <LoginForm /> : <LogupForm/>}
        <h3>{!isLogUp ? 'Dont have accout?' : 'Already have accout?'} Check to  
          <Text color="blue" onClick={check}>
            {!isLogUp ? ' Sign Up' : ' Sign In'}
          </Text>
          </h3>
      </div>
    </main>
  );
}
