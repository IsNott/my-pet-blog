'use client'
import { Theme } from "@radix-ui/themes";
import { Text } from "@radix-ui/themes";
import { MoonIcon,SunIcon } from "@radix-ui/react-icons";
import { change } from "@/redux/features/theme-slice";
import { useDispatch } from 'react-redux'
import { AppDispatch,useAppSelector } from "@/redux/store";



export default function ThemeButton(){
    const dispatch = useDispatch<AppDispatch>()
    const useLight = useAppSelector((state) => state.themeReducer)
    
    const handleClick = () =>{
      dispatch(change())
      console.log(useLight);
    }
    
    return(
      <Text onClick={handleClick}> 
       {useLight && <SunIcon className="hidden md:block sm:block" 
        height="18" width="18" 
        style={{marginRight:2}} color="gray"/>}
        {!useLight &&  <MoonIcon className="hidden md:block sm:block" 
        height="18" width="18" 
        style={{marginRight:2}} color="gray"/>}
      </Text>
    )
  }``

export function ThemeElement({children}: {children: React.ReactNode}){
    const useLight = useAppSelector((state) => state.themeReducer)
    return(
      <>
      <Theme appearance={useLight ? "light" : "dark"}>
        {children}
      </Theme>
      </>
    )
}