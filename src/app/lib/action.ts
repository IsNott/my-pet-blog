'use server'
import { signIn } from '../../../auth';
import { AuthError } from 'next-auth';
import { z } from 'zod';
import pool from "@/app/public/db";

// 登录
export async function authenticate(
    pervState: string | undefined,
    formData: FormData
    ) {
    try{
      // formData.set('redirectTo',"/plog")      
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

export async function doNewPost(
  pervState: string | undefined,
  formData: FormData
  ){
    try {
      
    } catch (error) {
      console.log(error);
      return 'doPost failed something wrong'
    }
}