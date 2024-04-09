'use server'
import { signIn } from '../../../auth';
import { AuthError } from 'next-auth';
import { z } from 'zod';
import pool from "@/app/public/db";
import { error } from 'console';

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
      console.log('rec data',formData);
      
    } catch (error) {
      console.error(error);
      return 'doPost failed something wrong'
    }
}

export async function uploadFile(formData: FormData) {
  const uploadPath:any = process.env.UPLOAD_PATH
    if(!formData.get('file')){
      return null
    }
    try {
      const res = await fetch(uploadPath,{
        method: 'POST',
        body: formData,
      })
      const resp = await res.json()
      // return resp
      if(resp.code !== 200){
        throw new Error(resp.msg ||  'fetch upload file failed')
      }else{
        return resp
      }
    } catch (error) {
        throw error
    }
};


export async function getFilePreView(id: string[]) {
  const perviewPath:any = process.env.PERVIEW_PATH
  try {
    const url = perviewPath
    const res = await fetch(url,{
      method:'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(id)
    })
    const resp = await res.json()
    
    if(resp.code !== 200){
      throw new Error(resp.msg || 'fetch upload file failed')
    }else{
      return resp.obj
    }
  } catch (error) {
      throw error
  }
};