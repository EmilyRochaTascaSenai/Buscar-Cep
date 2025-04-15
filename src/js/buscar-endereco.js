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
        
    }

});


// Adiciona evento de clique ao botão de nova consulta
document.querySelector('#novaConsulta').addEventListener