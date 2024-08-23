document.addEventListener("DOMContentLoaded", function () {
  renderCategories();

  btnNewCategorie.addEventListener("click", onClickNewCategorie);
});

// Categories...
const categories = ["Frutas", "Verduras", "Carnes", "Café", "Doces"];

// Referência aos elementos DOM
const categoryList = document.getElementById("category-list");
const tableBody = document.getElementById("table-body"); 
const btnNewCategorie = document.getElementById("btnNewCategorie");
const ipCategorie = document.getElementById("ipCategorie");

function renderCategories() {
  categoryList.innerHTML = ""; 
  if (tableBody) tableBody.innerHTML = ""; // Limpa o conteúdo da tabela, se existir

  categories.forEach(function (category) {
    const li = document.createElement("li");
    li.textContent = category;
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

function onClickNewCategorie() {
  addNewCategorie();
}

function addNewCategorie() {
  const newCategorie = ipCategorie.value.trim(); 

  if (newCategorie !== "") {
    categories.push(newCategorie); 
    renderCategories(); 
    ipCategorie.value = ""; 
  } else {
    alert("Por favor, insira um nome para a nova categoria.");
  }
}
