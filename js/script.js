document.addEventListener("DOMContentLoaded", function () {
  renderCategories();

  btnNewCategorie.addEventListener("click", onClickNewCategorie);
  categoryList.addEventListener("click", onClickCategorie);
});

// Categories...
const categories = [
  {
    name: "Frutas",
    items: ["Maçã", "Banana", "Laranja", "Acerola"],
  },
  {
    name: "Verduras",
    items: ["Agrião", "Brócolis", "Rúcula"],
  },
  {
    name: "Carnes",
    items: ["Frango", "Alcatra", "Carne moída"],
  },
  {
    name: "Café",
    items: ["Pao", "Nata", "Leite", "Queijo"],
  },
  {
    name: "Doces",
    items: ["Cuca de chocolate", "Caixa de biz (1)"],
  },
];

// Referência aos elementos DOM
const categoryList = document.getElementById("category-list");
const itemList = document.getElementById("item-list");
const tableBody = document.getElementById("table-body");
const btnNewCategorie = document.getElementById("btnNewCategorie");
const ipCategorie = document.getElementById("ipCategorie");
// const itemList = document.getElementById("table-body");

function renderCategories() {
  categoryList.innerHTML = "";
  if (tableBody) tableBody.innerHTML = ""; // Limpa o conteúdo da tabela, se existir

  categories.forEach(function (category) {
    const li = document.createElement("li");
    li.textContent = category.name;
    categoryList.appendChild(li);

    if (tableBody) {
      const tr = document.createElement("tr");
      const td = document.createElement("td");
      td.textContent = category;
      tr.appendChild(td);
      tableBody.appendChild(tr);
    }
  });
}

//Eventos de cliques...
function onClickNewCategorie() {
  addNewCategorie();
}

function onClickCategorie() {
  const clickedCategory = event.target.textContent;
  if (clickedCategory) {
    // alert(`Categoria clicada: ${clickedCategory}`);
    renderItemsList(clickedCategory); // Renderiza os itens da categoria clicada
  }
}

function addNewCategorie() {
  const newCategorie = {
    name: ipCategorie.value.trim(),
    items: [],
  };

  if (newCategorie !== "") {
    debugger;
    categories.push(newCategorie);
    renderCategories();
    ipCategorie.value = "";
  } else {
    alert("Por favor, insira um nome para a nova categoria.");
  }
}

//Lista de itens...
// Função para renderizar itens de uma categoria específica
function renderItemsList(categoryName) {
  const category = categories.find((cat) => cat.name === categoryName); // Encontra a categoria correta
  if (!category) return;

  itemList.innerHTML = ""; // Limpa a lista de itens

  category.items.sort();
  category.items.forEach(function (item) {
    const li = document.createElement("li");

    // Cria a div do ícone
    const iconDiv = document.createElement("div");
    iconDiv.className = "icon";
    iconDiv.textContent = item.charAt(0); // Primeiro caractere do nome do item

    // Cria o span para o nome do item
    const span = document.createElement("span");
    span.textContent = item;

    // Cria as div das ações
    const actionsDiv = document.createElement("div");
    actionsDiv.className = "actions";

    // Botão de delete
    const deleteButton = document.createElement("button");
    deleteButton.className = "delete";
    deleteButton.textContent = "🗑️";
    deleteButton.onclick = function () {
      // Lógica para deletar o item
      alert(`Item ${item} deletado!`);
      // Remover o item da lista ou da categoria
    };

    // Checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    // Monta a estrutura do <li>
    actionsDiv.appendChild(deleteButton);
    actionsDiv.appendChild(checkbox);

    li.appendChild(iconDiv);
    li.appendChild(span);
    li.appendChild(actionsDiv);

    itemList.appendChild(li);
  });
}
