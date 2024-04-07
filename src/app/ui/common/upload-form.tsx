import React, { useState } from 'react';
import { PlusIcon } from '@radix-ui/react-icons';
import { Button,Flex } from '@radix-ui/themes';
import { uploadFile,getFilePreView } from '@/app/lib/action';
import { any } from 'zod';
import Image from 'next/image';
import ImgBox from './img-box';
import { useEffect } from 'react';
import { Cross1Icon,CheckIcon } from "@radix-ui/react-icons"

export default function UploadImage() {
  const crypto = require('crypto');
  const [file, setFile] = useState('');
  const [uploadedFileId,setUploadedFileIds] = useState<string[]>([])
  const [ImgUrls,setImgUrls] = useState<string[]>([])
  // 捕获文件添加到文件列表
  const handleFileChange = (e) => {
    setFile(e.target.files[0])
  }

  // 监听 uploadId 的变化
  useEffect(() => {
    if (file !== null) {
      const filedom = document.getElementById('submitUpload');
      filedom?.click()
    }
  }, [file]);

    // 监听 uploadId 的变化
    useEffect(() => {
      if(uploadedFileId.length > 1){
        handlePreView(uploadedFileId)
      }
    }, [uploadedFileId]);

  // 模拟点击选择文件按钮
  const handldWareFile = ()=>{
    setFile('')
    const filedom = document.getElementById('file');
    filedom?.click()
  }

  const [showDelete, setShowDelete] = useState(false);
    
    const handleMouseEnter = () => {
      setShowDelete(true);
    };
  
    const handleMouseLeave = () => {
      setShowDelete(false);
    };
  
    const handleDeleteClick = () => {
      console.log(1);
      // onDelete()
    }  

  const onDelete = (id:string) => {
    if(!uploadedFileId.includes(id)){
      // setUploadedFileIds(upl)
    }
  }

  const handleUpload = async () => {
    try {
      if(file){
        const formData = new FormData();      
        formData.set('file', file);
        const data = await uploadFile(formData)
        setUploadedFileIds([...uploadedFileId, data.obj.id]);
      }
    } catch (error) {
      throw error
    }
  }

  const handlePreView = async (ids:string[]) =>{
   try {
    const urls = await getFilePreView(ids)
    setImgUrls(urls)
   } catch (error) {
    throw error
   }
  }
  const imgDiv = []
  if(ImgUrls.length > 0){
    for(let i = 0; i <= ImgUrls.length;i++){
      const id = i
      imgDiv.push(
        <div key={id} style={{ position: 'relative', display: 'inline-block' }}>
                <Image
                width={100}
                height={100}
                key={id} 
                id={String(i)}
                alt={'uploadFile' + id}
                src={ImgUrls[i]}
                priority={true}
                onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} 
                />
                {showDelete && (
                  <div style={{ position: 'absolute', top: 0, right: 0, cursor: 'pointer' }}>
                    <button onClick={handleDeleteClick}>{showDelete ? <Cross1Icon/> : <CheckIcon/>}</button>
                  </div>
                )}
                </div>
      )  
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
        {uploadedFileId.length > 0 && (
          <Flex direction="row">
            {imgDiv}
          </Flex>
        )}
      </Flex>
      <Button id='submitUpload' style={{display:"none"}} onClick={handleUpload}>Upload Image</Button>
    </Flex>
  )
}

