const express= require('express')
const cors=require('cors')
const app=express()
const bodyParser=require('body-parser')
const path=require('path')
const API=require('./src/routers/api')

app.use(cors())
app.set('view engine','ejs')
app.set('views','views')
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname,'public')))

app.use(API)

app.listen(4000)