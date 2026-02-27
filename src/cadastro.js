// Gerar um identificador único para cada registro
const gerarID = () => Date.now();

// Calcula idade em meses e comparando a data de plantio com a data atual.
// Arrow function que recebe uma data como parâmetro
const calcularIdade = (dataPlantio) => {
// Cria um objeto Date a partir da data informada
    const plantio = new Date(dataPlantio);
    const hoje = new Date();
// Calcula a diferença de anos entre hoje e o plantio
// Subtrai os anos das duas datas
    let anos = hoje.getFullYear() - plantio.getFullYear();
    let meses = hoje.getMonth() - plantio.getMonth();
// Usa um if para verificar condição, anos-- para diminuir 1 ano e meses += 12 para ajustar o valor
    if (meses < 0) {
        anos--;
        meses += 12;
    }

    return anos * 12 + meses;
};

// Buscar plantas do localStorage
const getPlantas = () => {
    const data = localStorage.getItem("plantas");
    return data ? JSON.parse(data) : [];
};

// Salvar plantas
const salvarPlantas = (plantas) => {
    localStorage.setItem("plantas", JSON.stringify(plantas));
};

// Responsável por preparar e exibir os cards na tela
const prepararCards = () => {
    const lista = document.getElementById("cartoes");

    if (!lista) return; // evita erro se não existir
// Limpa a área dos cards, busca as plantas salvas,mas também se não houver planta cadastrada exibe a mensagem 
    lista.innerHTML = "";
    const plantas = getPlantas();

    if (plantas.length === 0) {
        lista.innerHTML = `<p class="text-center">Nenhuma planta cadastrada.</p>`;
        return;
    }
// Percorre cada planta cadastrada, calcula a idade e armazena no card
//Usa forEach para iterar sobre o array
  plantas.forEach(item => {
        const idade = calcularIdade(item.plantio);

        const card = document.createElement("div");
        card.className = "col-md-4 mb-3";
// Define o conteúdo visual do card
        card.innerHTML = `
            <div class="card h-100 shadow-sm">
                <div class="card-body">
                    <h5 class="card-title">${item.nomePopular}</h5>
                    <h6 class="card-subtitle mb-2 text-muted"><em>${item.nomeCientifico}</em></h6>
                    <p><strong>Produção:</strong> ${item.producao} Kg</p>
                    <p><strong>Plantio:</strong> ${new Date(item.plantio).toLocaleDateString('pt-BR')}</p>
                    <p><strong>Idade:</strong> ${idade} mês(es)</p>
                </div>
            </div>
        `;

        lista.appendChild(card);
    });
};

// Espera o DOM carregar
// Seleciona o formulário e controla o envio
document.addEventListener("DOMContentLoaded", () => {

    const form = document.querySelector("form"); // pega seu form atual

    form.addEventListener("submit", function (e) {
        e.preventDefault();
// Declara um objeto, chama funções para gerar ID, acessar valores dos inputs
        const novaPlanta = {
            id: gerarID(),
            nomePopular: document.getElementById("nomePopular").value.trim(),
            nomeCientifico: document.getElementById("nomeCientifico").value.trim(),
            producao: parseFloat(document.getElementById("producao").value),
            plantio: document.getElementById("data").value
        };
//Busca as plantas já salvas, adiciona à lista
// Chama uma função que retorna um array, usa push() para inserir um nova planta
        const plantas = getPlantas();
        plantas.push(novaPlanta);
        salvarPlantas(plantas);

        this.reset();

        // Fecha modal (id correto do seu HTML)
        const modalEl = document.getElementById("exampleModal");
        const modal = bootstrap.Modal.getInstance(modalEl);
        modal.hide();
// Atualiza a tela
        prepararCards();
    });

    prepararCards();

});
