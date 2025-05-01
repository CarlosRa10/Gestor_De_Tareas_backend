 //npm i nodemailer
 //npm i -D @types/nodemailer
 import nodemailer from 'nodemailer'
 import dotenv from 'dotenv'//variables de entorno
 dotenv.config()

 const config = () =>{
     return{
         host: process.env.SMTP_HOST,
         port: +process.env.SMTP_PORT,
         auth: {
           user: process.env.SMTP_USER,
           pass: process.env.SMTP_PASS
         }
     }
 }

// // Looking to send emails in production? Check out our Email API/SMTP product!
// //cada vez que se envia un email se tiene que llamar esta función
export const transporter = nodemailer.createTransport(config());//cada vez que se llame transporter, cargara las configuraciones con el createTransport

// import nodemailer from 'nodemailer';
// import dotenv from 'dotenv';
// dotenv.config();

// const config = () => {
//   return {
//     service: 'Resend', // Especificamos que usamos Resend
//     host: 'smtp.resend.com', // Host SMTP de Resend
//     port: 465, // Puerto seguro para Resend
//     secure: true, // Usar SSL
//     auth: {
//       user: 'resend', // Usuario fijo para Resend
//       pass: process.env.RESEND_API_KEY // Tu API Key de Resend
//     }
//   };
// };

// export const transporter = nodemailer.createTransport(config());

// // Opcional: Verificar la conexión al iniciar
// transporter.verify((error) => {
//   if (error) {
//     console.error('Error al verificar transporter:', error);
//   } else {
//     console.log('Server is ready to take our messages');
//   }
// });