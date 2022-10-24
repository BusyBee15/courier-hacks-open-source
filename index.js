// Dependencies to install:
// $ npm install node-fetch --save

// const fetch = require('node-fetch');
import fetch from "node-fetch"
import * as dotenv from "dotenv"
dotenv.config()
// import express from "express"

async function send_secret_message(){

        
const morse_options = {
  method: 'GET',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  
};
const original_message = process.env.MESSAGE

const morse_response = await fetch('https://api.funtranslations.com/translate/morse.json?text='+original_message, morse_options)
//   .then(response => response.json())
//   .then(response => console.log(response))
//   .catch(err => console.error(err));


const translation = await morse_response.json()
const message = translation.contents.translated 

    
const courier_options = {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + process.env.API_KEY
  },
  body: JSON.stringify({
    "message": {
      "to": {
        "email": process.env.EMAIL,
        "phone_number": process.env.PHONE_NUMBER
      },
      "content": {
        "title": "new subject",
        "body": message
      },
      "routing":{
        "method":"all", 
        "channels":["email", "sms"]
      }
    }
  })
};

fetch('https://api.courier.com/send', courier_options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));
}

console.log(send_secret_message())

