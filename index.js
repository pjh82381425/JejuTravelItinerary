const express = require('express')
const app = express()
const port = 3000

app.get('/place/:id', (req, res) => {
    const param = req.params
    console.log(param)
    console.log(param.id)

    res.json((param.id + " 처리 완료"))
})

app.listen(port, () => {
    console.log(`localhost:${port}`)
})

