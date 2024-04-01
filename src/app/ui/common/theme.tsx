'use client'
import { Theme } from "@radix-ui/themes";
import { useState } from "react";
import { Button } from "@radix-ui/themes";
import { MoonIcon,SunIcon } from "@radix-ui/react-icons";


export default function ThemeButton(){
    const [useLight,setUseLight] = useState(false)
    return(
      <Button> 
       {useLight && <SunIcon className="hidden md:block sm:block" 
        height="18" width="18" 
        style={{marginRight:2}} color="gray"/>}
        {!useLight &&  <SunIcon className="hidden md:block sm:block" 
        height="18" width="18" 
        style={{marginRight:2}} color="gray"/>}
      </Button>
    )
  }

export function ThemeElement({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>){
    return(
        <Theme appearance={useLight ? "light" : "dark"}>
          {children}
        </Theme>
    )
}