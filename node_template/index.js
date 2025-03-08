var figlet = require('figlet');

figlet('Hello World!!', function(err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(data)
});

// index.js
// const express = require('express')
// const app = express()
// const port = 3000

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })

// const express = require('express')
// const app = express()
// const port = 3000

// app.get('/', (req, res) => {
//     res.send('Hello World!')
// })

// app.get('/dog', (req, res) => {
//     res.send('멍멍')
// })

// app.get('/cat', (req, res) => {
//     res.send('<h1>야옹</h1>')
// })

// app.listen(port, () => {
//     console.log(`Example app listening on port ${port}`)
// })

// const express = require('express')
// const cors = require('cors')
// const app = express()
// const port = 3000

// app.use(cors())

// app.get('/sound/:name', (req, res) => {
//     const { name } = req.params

//     if(name == 'dog') {
//         res.json('멍멍')
//     }else if(name == 'cat') {
//         res.json('야옹')
//     }else if(name == 'pig') {
//         res.json('꿀꿀')
//     }else{
//         res.json('알수 없음!!')
//     }
    
// })

// app.listen(port, () => {
//     console.log(`localhost:${port}`)
// })

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

