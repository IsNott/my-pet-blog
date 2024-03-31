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
      
    } catch (error) {
      console.log(error);
      return 'doPost failed something wrong'
    }
}

export async function uploadFile(formData: FormData) {
  console.log('11111');
  
    try {
      const res = await fetch('http://127.0.0.1:9091/file/upload',{
        method: 'POST',
        body: formData,
      })
      const resp = await res.json()
      console.log('11111',resp);
      // return resp
      if(resp.code !== 200){
        throw new Error(resp.message? resp.message: 'fetch upload file failed')
      }else{
        return resp
      }
    } catch (error) {
        throw error
    }
};


export async function getFilePreView(id: string) {
  try {
    const url = "http://127.0.0.1:9091/file/preview/" + id
    const res = await fetch(url,{
      method:'post'
    })
    const resp = await res.json()
    console.log(resp);
    
    if(resp.code !== 200){
      throw new Error('fetch upload file failed')
    }else{
      return resp.obj
    }
  } catch (error) {
      throw error
  }
};