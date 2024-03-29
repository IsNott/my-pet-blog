import React, { useState } from 'react';
import { PlusIcon } from '@radix-ui/react-icons';
import { Button,Flex } from '@radix-ui/themes';
export default function UploadImage() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    console.log(e.target.files[0]);
    
    setFile(e.target.files[0]);
  }

  const handldWareFile = ()=>{
    const filedom = document.getElementById('file');
    filedom?.click()
  }

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch('/upload', {
      method: 'POST',
      body: formData,
    });

    if (res.ok) {
      console.log('File uploaded successfully');
    } else {
      console.error('Error uploading file');
    }
  };

  return (
    <Flex direction="column">
      <input 
        id="file" style={{display:"none"}} 
        accept='.png,.jpg'
        type="file" onChange={handleFileChange} />
      <button onClick={handldWareFile}>
        <div className='board'>
          <PlusIcon height="100" width="100"/>
        </div>
      </button>
      <Button onClick={handleUpload}>Upload Image</Button>
    </Flex>
  );
}
