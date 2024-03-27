'use server'
import { signIn } from '../../../auth';
import { AuthError } from 'next-auth';

// 登录
export async function authenticate(
    pervState: string | undefined,
    formData: FormData
    ) {
    try{
      formData.set('redirectTo',"/plog")      
      await signIn('credentials',formData)      
    }catch(error){
      if(error instanceof AuthError){
        switch(error.type){
          case 'CredentialsSignin': return 'Invalid credentials.'
          default: return 'Something went wrong.'
        } 
      }
      throw error
    }
  }