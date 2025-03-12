const express = require('express')
const app = express()
const port = 3000

app.get('/user/:id', (req, res) => {
    const param = req.params
    console.log(param)
    console.log(param.id)

    res.json({'id': param.id})
})

app.listen(port, () => {
    console.log(`localhost:${port}`)
})

