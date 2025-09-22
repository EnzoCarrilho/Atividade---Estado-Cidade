/***********************************************************************************************************************
 * Objetivo: EndPoints referente API de estados e cidades
 * Data: 15/09/2025
 * Autor: Enzo Felix Carrilho
 * Versão: 1.0
 * 
 * Observações: Instalação do Express, Cors, Body-Parser
 * npm install express     --save
 * npm cors    express     --save
 * npm install body-parser --save
 * ***********************************************************************************************************************/ 
//Import das dependencias da API
const express =    require('express') //Responsável pela API
const cors =       require('cors') //Responsável pelas permissões da API (APP) 
const bodyParser = require('body-parser') //Responsável por gerenciar a chegada dos dados da API com o front

//Import do arquivo de funções
const dados = require('./modulo/funcoes.js')
//Retorna a porta do sevidor atual ou colocamos uma porta local
const PORT = process.PORT || 8080

//Criando uma instância de uma classe do express
const app = express()

//Configuração de permissões
app.use((request, response, next)=>{
    response.header('Acces-Control-Allow-Origin', '*') //Servidor de origem da API
    response.header('Acces-Control-Allow-Methods', 'GET') //Verbos(requisições) permitidos na API
    //Carrega as configurações no CORS da API
    app.use(cors())
    next() //Próximo, carrega os próximos endpoints
})

//Request -> chegada de dados na API
//Response -> retorno de dados API

//ENDPOINTS
app.get('/v1/estados', (request,response)=>{
    //Pesquisa na função de estados 
    let estados = dados.getAllEstados()

    //Retorna o status code
    response.status(estados.status_code)
    //Retorna o JSON
    response.json(estados)
})

app.get('/v1/estado/:uf', (request,response) => {
    let sigla = request.params.uf
    let estado = dados.getEstadoBySigla(sigla)

    response.status(estado.status_code).json(estado)
})

app.get('/v1/estados/:regiao', (request, response) => {
    let regiao = request.params.regiao
    let estados = dados.getEstadosByRegiao(regiao)

    response.status(estados.status_code).json(estados)
})

app.get('/v1/capitais', (request, response) => {
    let capitais = dados.getVerifyCapitaisDoPais()
    response.status(capitais.status_code).json(capitais)
})

app.get('/v1/cidades/:uf', (request, response) => {
    let sigla = request.params.uf
    let cidades = dados.getCidadesBySigla(sigla)

    response.status(cidades.status_code).json(cidades)
})


//Start na API
app.listen(PORT, () => {
    console.log('API aguardando requisições ...')
})