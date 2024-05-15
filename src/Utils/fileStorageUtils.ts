require('dotenv').config();
import s3 from '../../config/awsS3Config';
import { Documents } from '../../models_type_orm/entities/Documents';

export async function uploadFile(file : Express.Multer.File, filename: string) : Promise<any>{
    const params = {
        Bucket: process.env.BUCKET_NAME,
        Key: filename,
        Body: file.buffer,
        ContentType: file.mimetype, 
       // ACL: 'public-read', // opcional, establece los permisos de acceso al objeto
      };

      const result = await s3.upload(params).promise();
      return result.Location;
}

export function setNameDocument (file : Express.Multer.File,  documentBody : Documents ): Documents{
    let fileName : string = file.originalname; 
    const extension = fileName.split('.').pop(); 
    documentBody.extension = extension!;

    const formatDate = new Date().toLocaleDateString('es-ES').replace(/\//g, '') + new Date().toLocaleTimeString('es-ES').replace(/:/g, '');

    const name = documentBody.actionType + "__" + documentBody.table +  "__" + documentBody.idForTable;
    fileName = name + "__" + documentBody.type + "__" + formatDate;

    documentBody.fileName = fileName;
    documentBody.name = documentBody.actionType + "__" + formatDate;

    return documentBody;
}