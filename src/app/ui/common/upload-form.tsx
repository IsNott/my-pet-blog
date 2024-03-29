import React, { useState } from 'react';

export default function UploadImage() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

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
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload Image</button>
    </div>
  );
}
