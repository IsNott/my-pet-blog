'use client';
 
import { useEffect } from 'react';
 import { Callout } from '@radix-ui/themes';
 import { InfoCircledIcon } from '@radix-ui/react-icons';
 import { useState } from 'react';
export default function ErrorDialog({
  error
}: { error : Error}) {
  const [show,setShow] = useState(true)

  useEffect(() => {
    console.error(error);
  }, [error]);


  // 只在渲染时执行一次
  useEffect(() => {
    setInterval(()=>{
        setShow(false)
    },1500)
  },[])
 
  return (
    (show && <main className="flex h-full flex-col items-center justify-center">
    <Callout.Root>
        <Callout.Icon>
            <InfoCircledIcon />
        </Callout.Icon>
        <Callout.Text>
            {error.message}
        </Callout.Text>
    </Callout.Root>
    </main>)
  );
}