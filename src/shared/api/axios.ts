import axios from 'axios'


const options = {
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "X-RapidAPI-Key": process.env.NEXT_PUBLIC_API_KEY,
    "X-RapidAPI-Host": process.env.NEXT_PUBLIC_API_HOST,
  },
};

console.log('options', options);


export const API = axios.create(options);



export const API_V2 = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL_V2,
})