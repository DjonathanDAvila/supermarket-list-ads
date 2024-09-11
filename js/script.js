document.addEventListener("DOMContentLoaded", function () {
  loadCategoriesFromStorage(); // Carrega as categorias salvas no localStorage
  renderCategories(); // Renderiza as categorias na interface

  // Adiciona os event listeners para os botões
  btnNewCategorie.addEventListener("click", onClickNewCategorie);
  btnNewItem.addEventListener("click", onClickNewItemList);

  // Listener para seleção de categorias
  categoryList.addEventListener("click", function (event) {
    if (event.target.tagName === "LI" || event.target.tagName === "SPAN") {
      onClickCategorie(event);
    }
  });
});

// Lista de categorias
const categories = []; // Inicialmente vazio, será carregado do localStorage
let selectedCategory = ""; // Armazena a categoria selecionada pelo usuário

// Referência aos elementos DOM
const categoryList = document.getElementById("category-list");
const itemList = document.getElementById("item-list");
const nameList = document.getElementById("name-list");
const btnNewCategorie = document.getElementById("btnNewCategorie");
const btnNewItem = document.getElementById("btnNewItem");
const ipCategorie = document.getElementById("ipCategorie");
const ipItemList = document.getElementById("ipItemList");

/**
 * Salva a lista de categorias no localStorage
 */
function saveCategoriesToStorage() {
  localStorage.setItem("categories", JSON.stringify(categories));
}

/**
 * Carrega a lista de categorias do localStorage, se houver
 */
function loadCategoriesFromStorage() {
  const savedCategories = localStorage.getItem("categories");
  if (savedCategories) {
    categories.push(...JSON.parse(savedCategories));
  }
}

/**
 * Ativa ou desativa o botão de adicionar item dependendo da categoria selecionada
 */
function updateNewItemButtonState() {
  if (selectedCategory) {
    btnNewItem.classList.remove("disabled");
    btnNewItem.disabled = false;
  } else {
    btnNewItem.classList.add("disabled");
    btnNewItem.disabled = true;
  }
}

/**
 * Renderiza a lista de categorias e itens na interface
 */
function renderCategories() {
  categoryList.innerHTML = "";

  categories.forEach(function (category) {
    const li = document.createElement("li");

    // Nome da categoria
    const span = document.createElement("span");
    span.textContent = category.name;

    // Botão de deletar categoria
    const deleteButton = document.createElement("button");
    deleteButton.className = "delete";
    deleteButton.textContent = "🗑️";
    deleteButton.onclick = function (event) {
      // Para evitar a propagação do clique para o evento de seleção da categoria
      event.stopPropagation();
      deleteCategory(category.name);
    };

    // Adiciona a ação de clicar na categoria (exceto no botão)
    li.onclick = function () {
      selectedCategory = category.name;
      renderItemsList(category.name); // Renderiza os itens da categoria clicada
    };

    li.appendChild(span);
    li.appendChild(deleteButton);
    categoryList.appendChild(li);
  });

  // Seleciona e renderiza a primeira categoria, se existir
  if (categories.length > 0) {
    if (!selectedCategory) {
      selectedCategory = categories[0].name; // Define a primeira categoria como selecionada
    }
    renderItemsList(selectedCategory); // Renderiza os itens da primeira categoria
  } else {
    selectedCategory = ""; // Se não houver categorias, nenhuma está selecionada
    itemList.innerHTML = ""; // Limpa a lista de itens
    nameList.textContent = "Itens";
  }
}

/**
 * Evento de clique para adicionar uma nova categoria
 */
function onClickNewCategorie() {
  addNewCategorie();
}

/**
 * Evento de clique para adicionar um novo item à categoria selecionada
 */
function onClickNewItemList() {
  // if (selectedCategory === "") {
  //   alert("Por favor, selecione uma categoria antes de adicionar um item.");
  // } else {
    addNewItem(selectedCategory, ipItemList.value.trim());
  // }
}

/**
 * Evento de clique para selecionar uma categoria e exibir seus itens
 */
function onClickCategorie(event) {
  const clickedCategory = event.target.textContent;
  if (clickedCategory) {
    selectedCategory = clickedCategory;
    renderItemsList(clickedCategory); // Renderiza os itens da categoria clicada
    updateNewItemButtonState(); // Ativa o botão de adicionar item
  }
}

/**
 * Adiciona uma nova categoria à lista e salva no localStorage
 */
function addNewCategorie() {
  const newCategorie = {
    name: ipCategorie.value.trim(),
    items: [], // Cada categoria começa sem itens
  };

  if (newCategorie.name !== "") {
    categories.push(newCategorie);
    saveCategoriesToStorage(); // Salva as categorias no localStorage
    renderCategories();
    ipCategorie.value = ""; // Limpa o campo de entrada
  } else {
    alert("Por favor, insira um nome para a nova categoria.");
  }
}

/**
 * Deleta uma categoria e seus itens, e atualiza o localStorage
 */
function deleteCategory(categoryName) {
  const categoryIndex = categories.findIndex((cat) => cat.name === categoryName);
  if (categoryIndex !== -1) {
    categories.splice(categoryIndex, 1); // Remove a categoria
    saveCategoriesToStorage(); // Atualiza o localStorage
    renderCategories(); // Re-renderiza as categorias

    if (categories.length === 0) {
      itemList.innerHTML = ""; // Limpa a lista de itens se não houver categorias
      nameList.textContent = "Itens";
      updateNewItemButtonState(); // Desativa o botão de adicionar item
    }
    alert(`Categoria ${categoryName} e seus itens foram excluídos!`);
  }
}

/**
 * Renderiza os itens de uma categoria selecionada
 */
function renderItemsList(categoryName) {
  const category = categories.find((cat) => cat.name === categoryName);
  if (!category) return;
  nameList.textContent = category.name;

  itemList.innerHTML = ""; // Limpa a lista de itens

  // Ordena os itens por nome e os renderiza
  category.items.sort((a, b) => a.name.localeCompare(b.name));
  category.items.forEach(function (item) {
    const li = document.createElement("li");

    // Cria a div do ícone com a primeira letra do item
    const iconDiv = document.createElement("div");
    iconDiv.className = "icon";
    iconDiv.textContent = item.name.charAt(0).toUpperCase();

    // Cria o span para o nome do item
    const span = document.createElement("span");
    span.textContent = item.name;

    // Cria as div de ações (delete e checkbox)
    const actionsDiv = document.createElement("div");
    actionsDiv.className = "actions";

    // Botão de deletar item
    const deleteButton = document.createElement("button");
    deleteButton.className = "delete";
    deleteButton.textContent = "🗑️";
    deleteButton.onclick = function () {
      deleteItemList(categoryName, item.name);
    };

    // Checkbox para marcar o item como selecionado
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = item.selecionado;
    checkbox.onclick = function () {
      toggleItemStatus(categoryName, item.name, this.checked);
    };

    actionsDiv.appendChild(deleteButton);
    actionsDiv.appendChild(checkbox);

    li.appendChild(iconDiv);
    li.appendChild(span);
    li.appendChild(actionsDiv);

    // Aplica estilo ao item se estiver selecionado
    if (item.selecionado) {
      span.style.textDecoration = "line-through";
      span.style.color = "#ccc";
    } else {
      span.style.textDecoration = "none";
      span.style.color = "inherit";
    }

    itemList.appendChild(li);
  });
}

/**
 * Adiciona um novo item à categoria e salva no localStorage
 */
function addNewItem(categoryName, itemName) {
  const category = categories.find((cat) => cat.name === categoryName);

  const newItem = {
    name: capitalizeFirstLetter(itemName.trim()),
    selecionado: false,
  };

  if (newItem.name) {
    category.items.push(newItem);
    saveCategoriesToStorage(); // Salva as alterações no localStorage
    renderItemsList(categoryName);
    ipItemList.value = ""; // Limpa o campo de entrada
  } else {
    alert("Por favor, insira um nome para o novo item.");
  }
}

/**
 * Deleta um item de uma categoria e atualiza o localStorage
 */
function deleteItemList(categoryName, itemName) {
  const category = categories.find((cat) => cat.name === categoryName);
  const itemIndex = category.items.findIndex((item) => item.name === itemName);

  if (itemIndex !== -1) {
    category.items.splice(itemIndex, 1);
    saveCategoriesToStorage(); // Atualiza o localStorage
    renderItemsList(categoryName);
    alert(`Item ${itemName} deletado!`);
  }
}

/**
 * Alterna o status de um item (selecionado ou não)
 */
function toggleItemStatus(categoryName, itemName, isSelected) {
  const category = categories.find((cat) => cat.name === categoryName);
  const item = category.items.find((item) => item.name === itemName);

  if (item) {
    item.selecionado = isSelected;
    saveCategoriesToStorage(); // Salva o status atualizado no localStorage
    renderItemsList(categoryName);
  }
}

/**
 * Capitaliza a primeira letra de uma string
 */
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}
