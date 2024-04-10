'use server'
import { signIn } from '../../../auth';
import { AuthError } from 'next-auth';
import { z } from 'zod';

const PlogFormSchema = z.object({
  senderId: z.string(),
  title: z.string().min(6,{message: 'Please enter title over 6 word.'}),
  context: z.string().min(6,{ message: 'Please enter Context.' }),
  imgs: z.string().min(32,{message: 'Please upload last 1 picture.'})
})

export type State = {
  errors?: {
    senderId?: string[];
    title?: string[];
    context?: string[];
    imgs?: string[];
  };
  message?: string | null;
};

const CreatPlog = PlogFormSchema.omit({})

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
  pervState: State,
  formData: FormData
  ){
    try {
      const validateFields = CreatPlog.safeParse({
        senderId: formData.get('senderId'),
        title: formData.get('title'),
        context: formData.get('context'),
        imgs: formData.get('imgs')
      })
      console.log(validateFields);
      
      if (!validateFields.success) {
        return {
          errors: validateFields.error.flatten().fieldErrors,
          message: 'Missing Fields. Failed to Create Plog.',
        };
      }
      return {
          errors:{},
          message: '',
      }
    } catch (error) {
      return {
        message: 'doPost failed something wrong'
      }
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
  console.log('didd',id);
  
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