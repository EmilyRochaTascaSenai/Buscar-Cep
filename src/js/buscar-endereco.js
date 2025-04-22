// Seleção dos elementos do formulário
const form = document.querySelector('#consultaForm');
const ufInput = document.querySelector('#uf');
const cidadeInput = document.querySelector('#cidade');
const logadouroInput = document.querySelector('#logadouro');
const resultContainer = document.querySelector('#result');

// Função para realizar a consulta à API ViaCep
async function consultaViaCep(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

// Adiciona evento de submit ao formulário de consulta
form.addEventListener('submit', async (event) => {
    event.preventDefault();

    // Capturar valores dos campos do formulário e remover os espaços
    const uf = ufInput.value;
    const cidade = cidadeInput.value.trim();
    const logadouro = logadouroInput.value.trim();

    // Validação dos campos do formulário
    // Verificar se um estado foi selecionado
    if (uf === '') {
        await Swal.fire({
            icon: 'error',
            title: 'Campo obrigatório',
            text: 'Por favor, selecione um estado',
            confirmButtonColor: '#1177000'
        });
        return;
    }

    // Verificar se a cidade tem pelo menos 3 caracteres
    if (cidade.length < 3) {
        await Swal.fire({
            icon: 'error',
            title: 'Campo inválido',
            text: 'A cidade deve ter pelo menos 3 caracteres',
            confirmButtonColor: '#1177000'
        });
        return;
    }

    // Verificar se o logradouro tem pelo menos 3 caracteres
    if (logadouro.length < 3) {
        await Swal.fire({
            icon: 'error',
            title: 'Campo inválido',
            text: 'O logradouro deve ter pelo menos 3 caracteres',
            confirmButtonColor: '#1177000'
        });
        return;
    }

    try {
        // Exibir indicador de carregamento
        Swal.fire({
            title: 'Consultando endereço...',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        // Construir URL da API ViaCep com parâmetros
        const cidadeEncoded = encodeURIComponent(cidade);
        const logadouroEncoded = encodeURIComponent(logadouro);
        const url = `https://viacep.com.br/ws/${uf}/${cidadeEncoded}/${logadouroEncoded}/json/`;

        // Realizar consulta à API ViaCep e aguardar resposta
        const data = await consultaViaCep(url);

        // Fechar indicador de carregamento
        Swal.close();

        // Limpar resultados anteriores,caso tenha algo na tabela 
        resultContainer.innerHTML = '';

        // Verificar se a consulta retorna resultados
        if (data && data.length > 0) {
            // Criar tabela para exibir os resultados da consulta
            const table = document.createElement('table');
            table.className = 'results__table';

            // Criar cabeçalho da tabela (thead)
            const thead = document.createElement('thead');
            const headerRow = document.createElement('tr');

            // Definir as colunas que serão exibidas na tabela
            const headers = ['CEP', 'Logradouro', 'Bairro'];

            // Criar células do cabeçalho para cada coluna
            headers.forEach(headerText => {
                const th = document.createElement('th');
                th.textContent = headerText;
                headerRow.appendChild(th);
            });
            // Adiconanr linha de cabeçalho  ao thead e thead á table
            thead.appendChild(headerRow);
            table.appendChild(thead);

            // Criar corpo da tabela (tbody)
            const tbody = document.createElement('tbody');
            // Criação da tabela

            // Popular a tabela com os dados retornados pela API
            // Iterar sobre os endereços retornados pela API
            data.forEach(item => {
                // Criando uma nova linha para cada endereço
                const row = document.createElement('tr');

                // Criar e prencher célula da Cep
                const cellCep = document.createElement('td');
                cellCep.textContent = item.cep;
                row.appendChild(cellCep);
                // Criar e prencher célula da Logadouro
                const cellLogadouro = document.createElement('td');
                cellCep.textContent = item.logadouro;
                row.appendChild(cellLogadouro);
                // Criar e prencher célula da Bairro
                const cellBairro = document.createElement('td');
                cellCep.textContent = item.bairro;
                row.appendChild(cellBairro);

                // Adicionar  linha completa ao corpo da tabela
                tbody.appendChild(row);
            });

            // Adicionar corpo da tabela e a tabela completa
            table.appendChild(tbody);
            resultContainer.appendChild(table);
        }else{
            await Swal.fire({
                icon: 'info',
                title:'Nenhum resultado encontrado',
                text: 'Não foram encontrados endereços com critérios informados',
                confirmButtonColor: '#117000'
            });
        }
    } 
    catch (error){
        await Swal.fire({
                icon: 'error',
                title:'Erro na consulta',
                text: 'Ocorreu um erro ao consultar o endereço.Tente Novamente.',
                confirmButtonColor: '#117000'
        });
    }
});


// Adiciona evento de clique ao botão de nova consulta
document.querySelector('#novaConsulta').addEventListener('click', async () =>{
    // Limpar formulario e área de resultados
    form.reset();
    resultContainer.innerHTML = '';


    await Swal.fire({
        icon: 'sucess',
        title:'Formulário Limpo',
        text: 'Voce pode realizar uma nova consulta agora.',
        confirmButtonColor: '#117000',
        timer: 4000,
        timerProgressBar: true
    });
});

// Função para realizar consulta via API  ViaCep
const consultaViaCep = async (url) =>{
    try{
        // Realiza a requisição HTTP GET para  a API ViaCEP
        const response = await fetch (url);

        // Verifica se a resposta da API foi bem-sucedida(status 200-299)
        if(!response){
            throw new Error('sucess')
        }
        
    }
    catch (erro){
        // Propaga o erro para ser tratado pelo  código chamador
        throw error;
    }
};