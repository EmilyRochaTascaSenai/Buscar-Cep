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

        // Limpar resultados anteriores
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

            thead.appendChild(headerRow);
            table.appendChild(thead);

            // Criar corpo da tabela (tbody)
            const tbody = document.createElement('tbody');

            // Adicionar dados ao corpo da tabela
            data.forEach(item => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${item.cep}</td>
                    <td>${item.logradouro}</td>
                    <td>${item.bairro}</td>
                `;
                tbody.appendChild(row);
            });

            table.appendChild(tbody);
            resultContainer.appendChild(table);
        } else {
            // Caso não haja resultados
            resultContainer.innerHTML = '<p>Nenhum resultado encontrado.</p>';
        }
    } catch (error) {
        // Exibir erro caso a consulta falhe
        Swal.fire({
            icon: 'error',
            title: 'Erro',
            text: 'Não foi possível realizar a consulta. Tente novamente.',
            confirmButtonColor: '#1177000'
        });
    }
});

// Adiciona evento de clique ao botão de nova consulta
document.querySelector('#novaConsulta').addEventListener('click', () => {
    // Limpar os campos e resultados
    ufInput.value = '';
    cidadeInput.value = '';
    logadouroInput.value = '';
    resultContainer.innerHTML = '';
});
