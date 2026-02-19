// Gera ID único
const gerarID = () => Date.now();

// Calcula idade em meses
const calcularIdade = (dataPlantio) => {
    const plantio = new Date(dataPlantio);
    const hoje = new Date();

    let anos = hoje.getFullYear() - plantio.getFullYear();
    let meses = hoje.getMonth() - plantio.getMonth();

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

// Preparar cards (adicione uma div id="cartoes" no HTML)
const prepararCards = () => {
    const lista = document.getElementById("cartoes");

    if (!lista) return; // evita erro se não existir

    lista.innerHTML = "";
    const plantas = getPlantas();

    if (plantas.length === 0) {
        lista.innerHTML = `<p class="text-center">Nenhuma planta cadastrada.</p>`;
        return;
    }

    plantas.forEach(item => {
        const idade = calcularIdade(item.plantio);

        const card = document.createElement("div");
        card.className = "col-md-4 mb-3";

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
document.addEventListener("DOMContentLoaded", () => {

    const form = document.querySelector("form"); // pega seu form atual

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const novaPlanta = {
            id: gerarID(),
            nomePopular: document.getElementById("nomePopular").value.trim(),
            nomeCientifico: document.getElementById("nomeCientifico").value.trim(),
            producao: parseFloat(document.getElementById("producao").value),
            plantio: document.getElementById("data").value
        };

        const plantas = getPlantas();
        plantas.push(novaPlanta);
        salvarPlantas(plantas);

        this.reset();

        // Fecha modal (id correto do seu HTML)
        const modalEl = document.getElementById("exampleModal");
        const modal = bootstrap.Modal.getInstance(modalEl);
        modal.hide();

        prepararCards();
    });

    prepararCards();
});