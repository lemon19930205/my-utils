const express = require('express')
const app = express()

console.log(__dirname);


app.get('/', (req, res) => {
  res.sendFile(require("path").join(__dirname,"","index.html"))
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))