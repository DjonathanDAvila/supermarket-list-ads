document.addEventListener("DOMContentLoaded", function () {
  renderCategories();

  btnNewCategorie.addEventListener("click", onClickNewCategorie);
  btnNewItem.addEventListener("click", onClickNewItemList);

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

let selectedCategory = "";

// Referência aos elementos DOM
const categoryList = document.getElementById("category-list");
const itemList = document.getElementById("item-list");
const nameList = document.getElementById("name-list");
const tableBody = document.getElementById("table-body");
const btnNewCategorie = document.getElementById("btnNewCategorie");
const btnNewItem = document.getElementById("btnNewItem");
const ipCategorie = document.getElementById("ipCategorie");
const ipItemList = document.getElementById("ipItemList");

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

  // Seleciona a primeira categoria e renderiza seus itens, se existir
  if (categories.length > 0) {
    selectedCategory = categories[0].name; // Define a primeira categoria como selecionada
    renderItemsList(selectedCategory); // Renderiza os itens da primeira categoria
  }
}

//Eventos de cliques...
function onClickNewCategorie() {
  addNewCategorie();
}

function onClickNewItemList() {
  addNewItem(selectedCategory, ipItemList.value.trim());
}

function onClickDelete() {
  deleteItemList();
}

function onClickCategorie() {
  const clickedCategory = event.target.textContent;
  if (clickedCategory) {
    selectedCategory = clickedCategory;
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
  nameList.textContent = category.name;

  itemList.innerHTML = ""; // Limpa a lista de itens

  category.items.sort();
  category.items.forEach(function (item) {
    const li = document.createElement("li");

    // Cria a div do ícone
    const iconDiv = document.createElement("div");
    iconDiv.className = "icon";
    const char = item.charAt(0);
    iconDiv.textContent = char.toUpperCase(); // Primeiro caractere do nome do item

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
      deleteItemList(categoryName, item);
    };

    // Checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.onclick = function () {
      toggleItemStatus(categoryName, item, this.checked);
    };

    // Monta a estrutura do <li>
    actionsDiv.appendChild(deleteButton);
    actionsDiv.appendChild(checkbox);

    li.appendChild(iconDiv);
    li.appendChild(span);
    li.appendChild(actionsDiv);

    itemList.appendChild(li);
  });
}

function addNewItem(categoryName, itemName) {
  const category = categories.find((cat) => cat.name === categoryName);

  if (!category) {
    alert(`Por favor, selecione uma categoria.`);
    return;
  }

  const newItem = capitalizeFirstLetter(itemName.trim());
  if (newItem) {
    category.items.push(newItem);
    renderItemsList(categoryName);
    ipItemList.value = "";
  } else {
    alert("Por favor, insira um nome para o novo item.");
  }
}

function deleteItemList(categoryName, itemName) {
  const category = categories.find((cat) => cat.name === categoryName);

  const itemIndex = category.items.findIndex((item) => item === itemName);

  if (itemIndex !== -1) {
    category.items.splice(itemIndex, 1);
    renderItemsList(categoryName); // Atualiza a lista de itens após a remoção
    alert(`Item ${itemName} deletado!`);
  }
}

function toggleItemStatus(categoryName, itemName, isChecked) {
  const category = categories.find((cat) => cat.name === categoryName);
  const itemIndex = category.items.findIndex((item) => item === itemName);

  if (itemIndex !== -1) {
    const itemElement = itemList.children[itemIndex];
    const itemSpan = itemElement.querySelector("span");

    if (isChecked) {
      itemSpan.style.textDecoration = "line-through";
      itemSpan.style.color = "#ccc";
    } else {
      itemSpan.style.textDecoration = "none";
      itemSpan.style.color = "inherit";
    }
  }
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
