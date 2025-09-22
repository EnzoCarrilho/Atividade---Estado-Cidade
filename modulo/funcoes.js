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

    estado = {uf: estadoInfo.sigla, descricao: estadoInfo.nome, capital: estadoInfo.capital, regiao: estadoInfo.regiao}

    let message = {status: true, status_code: 200, development: 'Enzo Felix Carrilho', estado}

    // Object.keys cria um array do objeto estado, com os nomes dos atributos em String. 
    // Sendo array é possível utilizar a função .length
    let tamanhoJson = Object.keys(estado).length

    if(tamanhoJson > 0)
        return message 
    else
        return MESSAGE_ERROR 
}

//Retorna a Capital referente a um estado pesquisando pela sigla
const getCapitalBySigla = function(sigla){
    const uf = sigla.toUpperCase()
    estadoInfo = dados.listaDeEstados.estados.find(estado => estado.sigla === uf)

    estado = {uf: estadoInfo.sigla, descricao: estadoInfo.nome, capital: estadoInfo.capital}

    let message = {status: true, status_code: 200, development: 'Enzo Felix Carrilho', estado}
    
    let tamanhoJson = Object.keys(estado).length

    if(tamanhoJson > 0)
        return message 
    else
        return MESSAGE_ERROR 
    
}

//Retorna uma lista de estados pesquisando pela região
const getEstadosByRegiao = function(regiao){
    estados = dados.listaDeEstados.estados.filter(estado => estado.regiao === regiao)
    //console.log(estados)

    let message = {status: true, status_code: 200, development: 'Enzo Felix Carrilho', regiao: regiao, estados: []}

    estados.forEach((estado) => {
        message.estados.push({uf: estado.sigla, descricao: estado.nome})
    })

    if(message.estados.length > 0)
        return message
    else
        return MESSAGE_ERROR
}

//Retorna uma lista de estados referente as capitais do país
const getVerifyCapitaisDoPais = function(){
    estadosCapital = dados.listaDeEstados.estados.filter(estado => 'capital_pais' in estado)
    
    let message = {status: true, status_code: 200, development: 'Enzo Felix Carrilho', capitais: []}

    estadosCapital.forEach((estado) => {
        message.capitais.push({capital_atual: estado.capital_pais.capital, uf: estado.sigla, descricao: estado.nome, 
        capital: estado.capital, regiao: estado.regiao, capital_pais_ano_inicio: estado.capital_pais.ano_inicio,
        capital_pais_ano_termino: estado.capital_pais.ano_fim})
    })

    if(message.capitais.length > 0)
        return message
    else
        return MESSAGE_ERROR

}

//Retorna uma lista de Cidades pesquisando pela sigla do Estado
const getCidadesBySigla = function(sigla){
    const uf = sigla.toUpperCase()
    estadoInfo = dados.listaDeEstados.estados.find(estado => estado.sigla === uf)
    quantidadeDeCidades = estadoInfo.cidades.length

    estado = {uf: estadoInfo.sigla, descricao: estadoInfo.nome, quantidade_cidades: quantidadeDeCidades, cidades: []}

    estadoInfo.cidades.forEach((cidade) => {
        estado.cidades.push(cidade.nome)
    })

    let message = {status: true, status_code: 200, development: 'Enzo Felix Carrilho', estado}

    if(estado.cidades.length > 0)
        return message
    else
        return MESSAGE_ERROR

}

module.exports = {
    getAllEstados,
    getEstadoBySigla,
    getCapitalBySigla,
    getEstadosByRegiao,
    getVerifyCapitaisDoPais,
    getCidadesBySigla
}


//getEstadoBySigla('sp')
//getCapitalBySigla('sp')
//getEstadosByRegiao('Sul')
//getVerifyCapitaisDoPais()
//getCidadesBySigla('sp')