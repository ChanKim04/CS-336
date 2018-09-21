/*  Lab03
 *  
 * created Fall 2018 (09/19) 
 * @author: Chan Kim (ck45) for CS 336 at Calvin College  
 */
const express = require('express')
const app = express()
const port = 3000

app.use(express.static('public'))

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))