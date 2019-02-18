const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

const { User } = require('./app/models')
//User.create({ name: 'Claudio', email: 'claudio@rocketseat.com.br', password: '123456' })

app.get('/', (req, res)=>{
    res.send('Foi')
})

//Listar todos
app.get('/users', async (req, res) => {
    const users = await User.findAll()

    if (!users){
        return res.status(404).send({Erro: 'Registros não encontrados'})
    }

    return res.send({users})
}) 

//Criar
app.post('/users', async (req, res) => {
    const user = await User.create(req.body)

    if (!user){
        return res.status(417).send({Erro: 'Erro durante a execução'})
    }
    
    return res.send({user})
})

//Buscar
app.get('/users/:id', async (req, res) => {
    const user = await User.findById(req.params.id)

    if (!user){
        return res.status(404).send({Erro: 'Registro não encontrado'})
    }

    return res.send({user})
})

//Editar
app.put('/users/:id', async (req, res) => {
    const user = await User.findById(req.params.id)

    if (!user){
        return res.status(417).send({Erro: 'Erro durante a execução'})
    }

    await user.update(req.body)

    return res.send({user})
})

//Deletar
app.delete('/users/:id', async (req, res) => {
    const user = await User.findById(req.params.id)

    if (!user){
        return res.status(417).send({Erro: 'Erro durante a execução'})
    }

    await user.destroy()

    return res.send()
}); 

app.listen(3000)