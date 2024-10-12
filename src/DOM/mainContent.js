import { addOptionsIcon } from "../UI/imgUploader";
import { myProjectManager } from "../models/projectManager";

const mainContent = document.getElementById("main-content");

function addList(listName, listDescription) {
  if (!mainContent.firstChild) {
    return;
  } else {
    const projectId = parseInt(mainContent.firstChild.id);
    const myProject = myProjectManager.getProjectById(projectId);
    const listId = Date.now();
    myProject.addList(listName, listDescription, listId);
    myProjectManager.saveProjectsToLocalStorage();
    console.log(myProjectManager.getAllProjects());
    console.log(myProject.getAllList());
    console.log(myProject.getAllList().length);
  }
}

export default function changeMainContent(page, id) {
  const pageTitle = document.createElement("div");
  pageTitle.classList.add("page-title");
  pageTitle.id = id;
  pageTitle.textContent = page;

  const projectId = parseInt(id);
  const myProject = myProjectManager.getProjectById(projectId);
  const myProjectLists = myProject.getAllList();
  const listsIndex = myProjectLists.length;

  if (mainContent.firstChild?.textContent === page) {
    return; // Si le contenu actuel est déjà la bonne page, on ne fait rien
  }

  // On nettoie le contenu de mainContent
  mainContent.innerHTML = "";
  mainContent.appendChild(pageTitle);

  // On ajoute soit un contenu vide soit le conteneur des listes
  if (listsIndex === 0) {
    addEmptyContent(mainContent);
  } else {
    for (let i = 0; i < listsIndex; i++) {
      addSublistContainer(
        mainContent,
        myProjectLists[i].name,
        myProjectLists[i].description
      );
      const listInfosContainer = document.querySelectorAll(
        ".sub-list-container-middle"
      );
      const array = Array.from(listInfosContainer);
      array[i].id = myProjectLists[i].id;
    }
    updateInfoListDOM();
    addListbutton(mainContent);
  }
}

function addSublistContainer(divParent, name, description) {
  const subListContainer = document.createElement("div");
  subListContainer.classList.add("sub-list-container");
  divParent.appendChild(subListContainer);

  const subListLayout = document.createElement("div");
  subListLayout.classList.add("sub-list-layout");
  subListContainer.appendChild(subListLayout);

  const sideContainer = ["left", "middle", "right"];
  const subSideContainer = [
    ["display-tasks"],
    ["sub-list-name", "sub-list-description"],
    ["sub-list-progess-container"],
  ];

  for (let i = 0; i < sideContainer.length; i++) {
    const subDiv = document.createElement("div");
    const subSubdiv = document.createElement("div");
    subDiv.classList.add(`sub-list-container-${sideContainer[i]}`);
    subListLayout.appendChild(subDiv);
    if (i === 0) {
      subSubdiv.classList.add(subSideContainer[0]);
      subDiv.appendChild(subSubdiv);
    } else if (i === 1) {
      for (let j = 0; j < subSideContainer[1].length; j++) {
        const subSubdiv = document.createElement("div");
        subSubdiv.classList.add(subSideContainer[1][j]);
        if (subSubdiv.className === "sub-list-name") {
          subSubdiv.textContent = name;
          subSubdiv.contentEditable = "true";
        } else if (subSubdiv.className === "sub-list-description") {
          subSubdiv.textContent = description;
          subSubdiv.contentEditable = "true";
        }
        subDiv.appendChild(subSubdiv);
      }
    } else if (i === 2) {
      subSubdiv.classList.add(subSideContainer[2]);
      subDiv.appendChild(subSubdiv);
    }
  }

  const containerRight = document.querySelectorAll(".sub-list-container-right");

  const htmlStringCard = `
        <div id="delete-list">
            <div class="delete-button">X</div>
        </div>`;

  containerRight.forEach((element) => {
    if (!element.querySelector("#delete-list")) {
      element.insertAdjacentHTML("afterbegin", htmlStringCard);
    }
  });

  // Ajout du container pour les tâches
  const taskContainer = document.createElement("div");
  taskContainer.classList.add("task-container");
  subListContainer.appendChild(taskContainer);

  const htmlStringAddTaskButton = `
    <div id="add-task-button">
      <div class="plus-layout">+</div>  
      <div class="add-label"> Add a New Task</div> 
    </div>
  `;

  taskContainer.insertAdjacentHTML("beforeend", htmlStringAddTaskButton);
}

function addListbutton(divParent) {
  const htmlStringAddListButton = `
    <div id="add-list-button">
      <div class="plus-layout">+</div>  
      <div class="add-label"> Add a New List</div> 
    </div>
  `;

  divParent.insertAdjacentHTML("beforeend", htmlStringAddListButton);

  const addListDom = document.getElementById("add-list-button");

  addListDom.addEventListener("click", function () {
    addSublistContainer(mainContent);
    displayTaks();
    addList("New List", "Description");
    const projectId = parseInt(mainContent.firstChild.id);
    const myProject = myProjectManager.getProjectById(projectId);

    let lenList = myProject.getAllList().length;
    const newList = myProject.getList(lenList - 1);

    const MainContentChildren = divParent.children;
    let lenChildren = divParent.children.length;
    const containerToChange = MainContentChildren[lenChildren - 1];
    const containerFirstChild = containerToChange.children[0];
    const containerSecondGrandChild = containerFirstChild.children[1];
    const subListName = containerSecondGrandChild.children[0];
    const subListDescription = containerSecondGrandChild.children[1];
    subListName.textContent = newList.name;
    subListDescription.textContent = newList.description;
    containerSecondGrandChild.id = newList.id;

    updateInfoListDOM();

    divParent.appendChild(addListDom);
  });
}

function addEmptyContent(divParent) {
  if (divParent) {
    const tempContainer = document.createElement("div");
    tempContainer.innerHTML = `
            <div class="empty-container">
                <div class="empty-text">Oops..There are no main tasks</div>
                <div class="empty-button-container">
                    <div class="sub-empty-text">Click</div>
                    <div id="add-main-task">+</div>
                    <div class="sub-empty-text">to add one :)</div>
                </div> 
            </div>`;
    // Récupérer le premier élément enfant (le .empty-container) de tempContainer
    const emptyContainer = tempContainer.firstElementChild;

    // Ajouter cet élément au parent
    divParent.appendChild(emptyContainer);

    const addMaintaskButton = document.getElementById("add-main-task");

    addMaintaskButton.addEventListener("click", function () {
      removeEmptyContent();
      addSublistContainer(mainContent);
      displayTaks();
      addList("New List", "Description");
      const projectId = parseInt(mainContent.firstChild.id);
      const myProject = myProjectManager.getProjectById(projectId);
      let lenList = myProject.getAllList().length;
      const newList = myProject.getList(lenList - 1);

      const subListName = document.querySelector(".sub-list-name");
      subListName.textContent = newList.name;

      const subListDescription = document.querySelector(
        ".sub-list-description"
      );
      subListDescription.textContent = newList.description;

      subListName.parentElement.id = newList.id;

      updateInfoListDOM();

      addListbutton(mainContent);
    });

    return emptyContainer;
  }
}

function removeEmptyContent() {
  const emptyContentContainer = document.querySelector(".empty-container");
  emptyContentContainer.remove();
}

function displayTaks() {
  const displayTaskButtonContainer = document.querySelectorAll(
    ".sub-list-container-left"
  ); // Sélectionner tous les éléments avec cette classe
  const displayTaskButton = document.querySelector(".display-tasks");
  let displayTaskButtonIsActive = true; // Déplacer cette ligne en dehors du if

  if (displayTaskButton) {
    displayTaskButtonContainer.forEach((element) => {
      element.addEventListener("click", function () {
        displayTaskButtonIsActive = !displayTaskButtonIsActive;
        if (!displayTaskButtonIsActive) {
          displayTaskButton.classList.add("down");
        } else {
          displayTaskButton.classList.remove("down");
        }
      });
    });
  }
}

function updateInfoListDOM() {
  // Sélectionne tous les éléments avec l'attribut contenteditable
  const editableElements = document.querySelectorAll("[contenteditable]");

  // Ajoute un écouteur d'événements pour chaque élément éditable
  editableElements.forEach((element) => {
    element.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        element.blur();
      }
    });

    // Ajoute un autre écouteur pour l'événement "blur" (quand l'élément perd le focus)
    element.addEventListener("blur", function () {
      const projectId = parseInt(mainContent.firstChild.id);
      const myProject = myProjectManager.getProjectById(projectId);

      const listId = parseInt(this.parentElement.id);
      const list = myProject.getListById(listId);
      let newName = "";
      let newDescription = "";

      if (element.className === "sub-list-name") {
        newName = this.textContent;
      } else if (element.className === "sub-list-description") {
        newDescription = this.textContent;
      }

      const updatedData = { name: newName, description: newDescription };

      myProject.updateList(list, updatedData);
      myProjectManager.saveProjectsToLocalStorage();
      console.log(myProject);
      console.log(myProjectManager.getAllProjects());
    });
  });
  deleteListDOM();
}

function deleteListDOM() {
  const deleteButtons = document.querySelectorAll("#delete-list");

  deleteButtons.forEach((element) => {
    element.addEventListener("click", function () {
      // Vérifie si le bouton a déjà été cliqué via un attribut "data-clicked"
      if (element.getAttribute("data-clicked") === "true") return;

      const projectId = parseInt(mainContent.firstChild.id);
      const myProject = myProjectManager.getProjectById(projectId);

      const grandParent = this.parentElement.parentElement;
      const listElement = grandParent.children[1];

      if (!listElement || !listElement.id) {
        console.log("Erreur : Aucun ID trouvé pour l'élément liste.");
        return;
      }

      const listId = parseInt(listElement.id);

      const indexList = myProject.getIndexlist(listId);

      if (indexList >= 0) {
        myProject.removeList(indexList);
        myProjectManager.saveProjectsToLocalStorage();

        // Supprimer l'élément parent de la carte actuelle du DOM
        grandParent.parentElement.remove();

        // Marque ce bouton comme ayant été cliqué
        element.setAttribute("data-clicked", "true");
      } else {
        console.log(`Erreur : Liste non trouvée pour l'ID ${listId}`);
      }
    });
  });
}

const projects = myProjectManager.loadProjectsFromLocalStorage();
console.log(projects);
