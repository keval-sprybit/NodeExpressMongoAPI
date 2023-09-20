const nodemailer = require('nodemailer');

const emailUser='bettie52@ethereal.email';
const emailPassword='qS1pFuSxN8Pm8Z8sVU';

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: emailUser,
      pass: emailPassword
    }
  });
  
    var subject = "this is subject";
    var html = `<tr class="welcome-content">
    <td valign="middle" class="middle">
    <table role="presentation"  cellpadding="0" cellspacing="0" width="100%">
    <tbody>
    <tr>
    <td>
    <h2>Hi <<ADMIN_NAME>></h2>  
    </td>
    </tr>
    <tr>
    <td class="text pb-20">
    Welcome to Grass Mowin platform. We are pleased to have you on-board. 
    </td>
    </tr>
    
    <tr>
    <td class="text pb-18">
    Kind Regards,</td>
    </tr>
    <tr>
    <td class="text"> Grass Mowin team</td>
    </tr>
    </tbody>
    </table>
    </td>
    </tr>`;
  
    /* const mailOptions = {
      from: 'bettie52@ethereal.email',
      to,
      subject,
      html
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
         res.status(500).json({'error': error});
      }
       res.json({'data':info.response});
    });
  
  }); */

  const sendEmail = (to, subject, html) => {
    const mailOptions = {
      from: emailUser,
      to,
      subject,
      html
    };
  
    return transporter.sendMail(mailOptions);
  };
  
  module.exports = sendEmail;