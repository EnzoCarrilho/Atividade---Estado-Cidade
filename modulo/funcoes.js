/***********************************************************************************************************************
 * Objetivo: Arquivo de funções para gerenciar a API de estados e cidades
 * Data: 15/09/2025
 * Autor: Enzo Felix Carrilho
 * Versão: 1.0
 * 
 * ***********************************************************************************************************************/ 
const MESSAGE_ERROR = {status: false, status_code: 500, development: 'Enzo Felix Carriho'}
const dados = require('./estados_cidades.js')


//Retorna todos os estados
const getAllEstados = function(){
    //Variavel de base para o cabeçalho da API
    let message = {status: true, status_code: 200, development: 'Enzo Felix Carrilho', uf: []}

    dados.listaDeEstados.estados.forEach( (item) => {
        message.uf.push(item.sigla)
    })
    //Para adicionar um elemento novo no JSON
    message.quantidade = message.uf.length

    //Para remover o atributo do JSON
    //delete message.status

    if(message.uf.length > 0 )
        return message //Verdadeira 200
    else
        return MESSAGE_ERROR //Falsa 500
    
}

//Retorna um estado pesquisando pela sigla(UF)
const getEstadoBySigla = function(sigla){

    const uf = sigla.toUpperCase()
    estadoInfo = dados.listaDeEstados.estados.find(estado => estado.sigla === uf)
    delete estadoInfo.cidades

    let message = {status: true, status_code: 200, development: 'Enzo Felix Carrilho', estado: {}}

    estado.uf = estadoInfo.sigla

    console.log(message)

    //if(message.estado)
        //return message 
    //else
        //return MESSAGE_ERROR 
}

//Retorna a Capital referente a um estado pesquisando pela sigla
const getCapitalBySigla = function(sigla){
    const uf = sigla.toUpperCase()
    estado = dados.listaDeEstados.estados.find(estado => estado.sigla === uf)
    delete estado.cidades
    delete estado.regiao

    let message = {status: true, status_code: 200, development: 'Enzo Felix Carrilho', estado}
    console.log(message)
    
}

//Retorna uma lista de estados pesquisando pela região
const getEstadosByRegiao = function(regiao){
    estados = dados.listaDeEstados.estados.filter(estado => estado.regiao === regiao)
    //console.log(estados)

    let message = {status: true, status_code: 200, development: 'Enzo Felix Carrilho', regiao: regiao, estados: []}

    estados.forEach((estado) => {
        message.estados.push({uf: estado.sigla, descricao: estado.nome})
    })

    console.log(message)
}

//Retorna uma lista de estados referente as capitais do país
const getVerifyCapitaisDoPais = function(){

}

//Retorna uma lista de Cidades pesquisando pela sigla do Estado
const getCidadesBySigla = function(sigla){

}

module.exports = {
    getAllEstados,
    getEstadoBySigla,
}

//getEstadoBySigla('sp')
//getCapitalBySigla('sp')
getEstadosByRegiao('Sul')
