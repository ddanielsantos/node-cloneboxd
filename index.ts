import express from 'express';
require('dotenv/config')
import knex from './knex/knex.js';
import { router } from './src/routes/routes';
const port = process.env.PORT || 1011
const app = express()

app.use(express.json()) // SEMPRE LEMBRAR DESSA PORCARIA ANTES DE QUALQUER UTILIZAÇÃO DO REQUEST

app.use(router)

app.listen(port, ()=>{
    console.log('Servidor rodando')
})

