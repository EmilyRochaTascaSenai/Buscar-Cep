// Seleção dos elemento sdo formulario

const form =document.querySelector('#consultaForm');
const ufInput = document.querySelector('#uf');
const cidadeInput = document.querySelector('#cidade');
const logadouroInput = document.querySelector('#logadouro');
const resultContainer = document.querySelector('#result');



// Adiciona evento da submit ao formulario de consulta
form.addEventListener('submit',async(event) =>{
    event.preventDefault();

    // Capturar valores dos campos do formulario  e remover os espaços
    const uf = ufInput.value;
    const cidade = cidadeInput.value.trim();
    const logadouro = logadouroInput.value.trim();

    // Validação dos campos do formulario
    // Verificar so um estado foi selecionado
    if (uf === ''){
        await  Swal.fire({
            icon:'error',
            title:'Campo obrigatorio',
            text: 'Por favor selecione um estado',
            confirmButtonColor:'#1177000'
        })
        return;
    }
    // Verificar se a cidade pelo menos caracteres
    if(cidade.lenght<3){
        awaitSwal.fire({
            icon:'error',
            title:'Campo invalido',
            text: 'Campo deve ter pelo menos caracteres',
            confirmButtonColor:'#1177000'
        })
        return;
    }
    
    // Verificar se a logadouro pelo menos caracteres
    if(logadouro.lenght<3){
        awaitSwal.fire({
            icon:'error',
            title:'Campo invalido',
            text: 'Logadouro deve ter pelo menos caracteres',
            confirmButtonColor:'#1177000'
        })
        return;
    }
    try{
        // Exibir indicador de carregamento
        Swal.fire({
            title:'Consultando endereço......',
            allowOutsideClick:false,
            didOpen:() =>{
                Swal.showLoading()
            }
        });
    }
    // Contruir URL da API  ViaCep com parametros
    const cidadeEncoded = encodeURIComponent(cidade);
    const logadouroEncoded = encodeURIComponent(logadouro);
    // https://viacep.com.br/ws/01001000/json/
    const url ='https://viacep.com.br/ws/${uf}/${cidadeEncoded}/${logadouroEncoded}/json/'

    // Realizar consulta á API ViaCep e aguardar resposta
    const data = await consultaViaCep(url);
    // Fechar indicador de carregamento
    Swal.close();
    
    // Limpa resultados anteriores
    resultContainer.innerHTML= '';

    // Verifica se a consulta retorna resultado
    if(data && data.lenght>0){
        // Criar tabela para exibir os resultados  da consulta
        const table = document.createElement('table');
        table.className='results__table';
    }

    // Criar cabeçalho da tabela (thead)
    const thead = document.createElement('thead');
    const headerRow = document.createElement9('tr')

    // Definir as colunas que serão exibidas na tabela
    const headers = ['CEP', ' Logadouro' , 'Bairro'] ;

    // Criar células do cabeçalho para cada coluna
    headers.forEach(headerText =>{
        const th = document.createElement9('th');
        th.textContent = headerText;
        headerRow.appendChild(th);
    })
});


// Adiciona evento de clique ao botão de nova consulta
document.querySelector('#novaConsulta').addEventListener