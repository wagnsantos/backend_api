/**************************************************************************************
 * Objetivo: Realizar a integração de cadastro, consulta, edição e exclusão de livros *
 * Data: 29/10/2024                                                                   *
 * Autor: Wagner                                                                      *
 * Versão 1.0                                                                         *
**************************************************************************************/

let url = 'https://b094b01d-02a1-42ff-9c36-ab23c9004e75-00-342mfnr81pztc.riker.replit.dev/'

// Recebe do HTML o botão de salvar um novo livro
const botaoSalvar = document.getElementById('salvar')

// Função para criar um novo livro para o banco de dados
const postLivro = async function(){
    // Receber os dados do formulario
    let titulo = document.getElementById('title')
    let descricao = document.getElementById('subtitle')
    let foto = document.getElementById('image')
    let valor = document.getElementById('price')

    // Cria um objeto do tipo JSON
    let livroJSON = {}

    // Criando os atributos do JSON e colocando os valores
    livroJSON.title = titulo.value
    livroJSON.subtitle = descricao.value
    livroJSON.image = foto.value
    livroJSON.price = valor.value

    let response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(livroJSON)
    }) 

    //Mensagem de interação com o usuário (201 -- )
    if(response.status == 201){
        alert('Item inserido com sucesso')
        getLivros()
    }else{
        alert('Não foi possivel inserir o registro, verifique os dados enviados')
    }

}

// Função para atualizar um livro existente
const putLivro = function(){

}

// Função para excluir um livro
const deleteLivro = async function(idLivro){
    let url = 'https://app-livraria-2024-gsc9e3gcdsh2f2b5.brazilsouth-01.azurewebsites.net/v2/livraria/excluir/livro/'+idLivro

    let response = await fetch(url, {
        method: 'DELETE'
    })

    if (response.status == 200){
        alert('Registro excluido com sucesso!')
        getLivros()
    }else{
        alert('Não foi possível relizar a exclusão do registro.')
    }
}

// Função para listar todos os livros
const getLivros = async function(){

    //URL da API
    let url = 'https://b094b01d-02a1-42ff-9c36-ab23c9004e75-00-342mfnr81pztc.riker.replit.dev/'

    //Executa a URL através do fetch
    let response = await fetch(url)

    //Converte os dados em json
    let dados = await response.json()
    console.log(dados)
    console.log(dados[0].author)

    //Recebe a div principal onde será carregado a lista de dados
    let divListDados = document.getElementById('listDados')

    //Limpar a lista de dados antes de carregar uma nova lista
    divListDados.innerText = ''

    //Percorre o array de livros dentro da API
    dados.books.forEach(function(livro){
        //Cria os elementos no HTML
        let divDados =    document.createElement('div')
        let divTitle =    document.createElement('div')
        let divSubtitle = document.createElement('div')
        let divPrice =    document.createElement('div')
        let divOpcoes =   document.createElement('div')
        let spanEditar =  document.createElement('span')
        let imgEditar =   document.createElement('img')
        let spanExcluir = document.createElement('span')
        let imgExcluir =  document.createElement('img')
         
        //Adiciona os atributos
        divDados.setAttribute('id', 'dados')
        divDados.setAttribute('class', 'linha dados')
        imgEditar.setAttribute('src', 'icones/editar.png')
        imgEditar.setAttribute('idLivro', livro.id)
        imgExcluir.setAttribute('src', 'icones/excluir.png')
        imgExcluir.setAttribute('idLivro', livro.id)
    
        divTitle.innerText    = livro.title
        divSubtitle.innerText = livro.subtitle
        divPrice.innerText    = livro.price    

        //Associa os seu elemento ao seu elemento Pai
        divListDados.appendChild(divDados)
        divDados.appendChild(divTitle)
        divDados.appendChild(divSubtitle)
        divDados.appendChild(divPrice)

        divDados.appendChild(divOpcoes)
        divOpcoes.appendChild(spanEditar)
        spanEditar.appendChild(imgEditar)
        divOpcoes.appendChild(spanExcluir)
        spanExcluir.appendChild(imgExcluir)  
        
        //Função para o click do Excluir
        imgExcluir.addEventListener('click', function(){

            let resposta = confirm('Deseja realmente excluir este item?')

            if(resposta){
            //Resgatando o ID do livro quando ouver o click na imagem 
            let id = imgExcluir.getAttribute('idlivro')
            //Chama a função para excluir o livro e encaminha o ID
            deleteLivro(id)
            }
        })
        imgEditar.addEventListener('click', function(){
            let id = imgEditar.getAttribute('idLivro')
            //Chamar a função que vai localizar os dados do livro pelo ID
            getBuscarLivros(id)
        })
    })

}

// Função para buscar um livro pelo ID
const getBuscarLivros = async function(idLivro){
    let url = 'https://b094b01d-02a1-42ff-9c36-ab23c9004e75-00-342mfnr81pztc.riker.replit.dev/'+idLivro

    let response = await fetch(url)

    let dados = await response.json()

    if(response.status == 200){
        //Carregar os dados no formulario
        document.getElementById('title').value = dados.books[0].title
        document.getElementById('subtitle').value = dados.books[0].subtitle
        document.getElementById('image').value = dados.books[0].image
        document.getElementById('price').value = dados.books[0].price
    }else{
        alert('Não foi possível localizar o registro')
    }

}

botaoSalvar.addEventListener('click', function(){
    postLivro()
})

window.addEventListener('load', function(){
    getLivros()
})