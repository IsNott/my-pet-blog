import React, { useState } from 'react';
import { PlusIcon } from '@radix-ui/react-icons';
import { Button,Flex } from '@radix-ui/themes';
import { uploadFile,getFilePreView } from '@/app/lib/action';
import { any } from 'zod';
import Image from 'next/image';

export default function UploadImage() {
  const [file, setFile] = useState(null);
  const [uploadedFile,setUploadedFile] = useState([])
  
  // 捕获文件添加到文件列表
  const handleFileChange = (e) => {
    setFile(e.target.files[0])
    const filedom = document.getElementById('submitUpload');
      filedom?.click()
  }

  // 模拟点击按钮
  const handldWareFile = ()=>{
    const filedom = document.getElementById('file');
    filedom?.click()
  }

  const handleUpload = async () => {
    try {
      const formData = new FormData();      
      formData.set('file', file);
      const data = await uploadFile(formData)
      console.log('data',data);
      setUploadedFile([...uploadedFile, data.obj.id]);
    } catch (error) {
      throw error
    }
  }

  const handlePreView = async (id:string) =>{
   try {
    const url = await getFilePreView(id)
    console.log('url',url);
    
    return url
   } catch (error) {
    throw error
   }
  }

  return (
    <Flex direction="column">
      <input 
        name="file"
        id="file" style={{display:"none"}} 
        accept='.png,.jpg'
        type="file" onChange={handleFileChange} />
      <Flex direction="row">
      <button onClick={handldWareFile}>
        <div className='board'>
          <PlusIcon height="100" width="100"/>
        </div>
      </button>
      {uploadedFile.length > 0 && (
        <Flex direction="row">
          {uploadedFile.map(id => (
            <Image
            width={100}
            height={100}
            key={id} 
            id={id}
            alt={'uploadFile' + id}
            src={handlePreView(id)}/>
          ))}
        </Flex>
      )}
      </Flex>
      <Button id='submitUpload' style={{display:"none"}} onClick={handleUpload}>Upload Image</Button>
      </Flex>
  )
}

