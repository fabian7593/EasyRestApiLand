//This class is a test connection with the DB
import fs from 'fs';
import {sendMail} from "../src/Utils/sendEmailsUtils";
const htmlTemplate = fs.readFileSync('email_templates/register_email.html', 'utf-8');

(async () => {
   
    const htmlBody = htmlTemplate
    .replace(/\{\{ companyName \}\}/g, 'Vitalink')
    .replace(/\{\{ userName \}\}/g, 'Fabian Rosales')
    .replace(/\{\{ confirmationLink \}\}/g, 'https://tudominio.com/confirmacion');
 
   
      if(!await sendMail("fabian7593@gmail.com", "prueba", htmlBody)){
        console.log("Error sending");
      }
    
})();