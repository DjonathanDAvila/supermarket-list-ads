const categories = ["Frutas", "Verduras", "Carnes", "Café", "Doces"];

// Função para renderizar as categorias na tabela
function renderCategories() {
    const tableBody = document.querySelector("#category-table tbody");
    tableBody.innerHTML = ""; // Limpa o conteúdo existente

    categories.forEach(category => {
        const row = document.createElement("tr");
        const cell = document.createElement("td");
        cell.textContent = category;
        row.appendChild(cell);
        tableBody.appendChild(row);
    });
}

// Chama a função para renderizar as categorias ao carregar a página
window.onload = renderCategories;