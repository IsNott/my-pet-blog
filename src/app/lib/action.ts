'use server'

// 登录
export async function authenticate(
    pervState: string | undefined,
    formData: FormData
    ) {
    try{
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