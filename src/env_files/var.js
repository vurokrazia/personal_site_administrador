const dotenv = require('dotenv').config( {path: `./../../.env.${process.env.NODE_ENV}`} )
export const mode = process.env.NODE_ENV === 'production'
export const user_key = mode ? "user" : "development_user";
export const logged_key = mode ? "logged" : "development_logged";
export const token_key = mode ? "token" : "development_token";
export const url = mode ? "https://vk.vurokrazia.com/api/v1" : "http://localhost:3006/api/v1";