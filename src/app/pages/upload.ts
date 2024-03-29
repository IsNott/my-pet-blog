import { randomUUID } from 'crypto';
import formidable from 'formidable';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req:any, res:any) {
  if (req.method === 'POST') {
    const form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
      files.file.name = randomUUID().replaceAll("-","")
      if (err) {
        res.status(500).json({ error: 'Error uploading file' });
        return;
      }

      const oldPath = files.file.path;
      const newPath = `${process.env.UPLOAD_PATH}/${files.file.name}`;

      fs.rename(oldPath, newPath, (err) => {
        if (err) {
          res.status(500).json({ error: 'Error moving file' });
          return;
        }

        res.status(200).json({ message: 'File uploaded successfully' });
      });
    });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
