const express = require('express');
const bodyParser = require('body-parser');
const sgMail = require('@sendgrid/mail');
const cors = require('cors')
const app = express();
const port = 3000;
app.use(bodyParser.json({ limit: '50mb' })); // Adjust the limit as needed

app.use(cors()); // Enable CORS for all routes


app.use(bodyParser.json());

sgMail.setApiKey("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");

app.post('/send-email', (req, res) => {
    console.log("hello");
  const { email, photoDataURL } = req.body;

  console.log(email);

  const msg = {
    to: email,
    from: 'itsprason@gmail.com',
    subject: 'Captured Photo',
    text: 'Attached is the captured photo.',
    attachments: [
      {
        content: photoDataURL.split(',')[1],
        filename: 'captured_photo.png',
        type: 'image/png',
        disposition: 'attachment',
      },
    ],
  };

  sgMail.send(msg)
    .then(() => {
      console.log('Email sent');
      res.status(200).json({ success: true, message: 'Email sent successfully' });
    })
    .catch((error) => {
      console.error('Error sending email:', error);
      res.status(500).json({ success: false, message: 'Error sending email' });
    });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
