const express = require('express');
require('dotenv/config');

console.log(process.env.API_PASSWORD)
console.log(process.env.API_MAIL)
/* const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require('path');
const nodemailer = require('nodemailer'); */

const app = express();

const nodemailer = require("nodemailer")

const PORT = process.env.PORT || 5000;

// Middleware 

app.use(express.static('dist'))
app.use(express.json())

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/dist/index.html')
})
app.post('/', (req, res) => {
    console.log(req.body)
    const output = `
    <p>Здравствуйте хотел бы этот великолепный видеорегистратор</p>
    <h3>Contact Details</h3>
    <ul>  
      <li>Name: ${req.body.name}</li>
      <li>количество: ${req.body.amount}</li>
      <li>Phone: ${req.body.phone}</li>
    </ul>
    <h3>Message</h3>
    <p>Спасибо</p>
  `;
    const transporter = nodemailer.createTransport(
        {

            service: 'gmail',
            auth: {
                user: process.env.API_MAIL,
                pass: process.env.API_PASSWORD
            }
        }
    )

    const mailOptions = {
        from: req.body.phone,
        to: process.env.API_MAIL,
        subject: `vehicle blackbox dvr Сообщение от ${req.body.phone}`,
        text: `${req.body.name}, ${req.body.amount}`,
        html: output
    }
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.send('error')
        } else {
            console.log('email sent ' + info.response)
            res.send('success')
        }
    })
})


app.listen(PORT, () => {
    console.log('Server started...')
});

