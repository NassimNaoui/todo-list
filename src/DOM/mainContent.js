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
    console.log(myProjectManager.getAllProjects());
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
    }
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
        } else if (subSubdiv.className === "sub-list-description") {
          subSubdiv.textContent = description;
        }
        subDiv.appendChild(subSubdiv);
      }
    } else if (i === 2) {
      subSubdiv.classList.add(subSideContainer[2]);
      subDiv.appendChild(subSubdiv);
    }
  }

  // Adding 2 children into the iconContainer
  const iconContainer = document.createElement("div");
  iconContainer.id = "options-icon";
  iconContainer.className = "icon";

  addOptionsIcon(iconContainer);

  const htmlStringCard = `
        <div id="options-card">
            <ul id="rename-option">Rename</ul>
            <ul id="delete-option">Delete</ul>
        </div>`;
  subListLayout.insertAdjacentHTML("beforeend", htmlStringCard);

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

    const MainContentChildren = divParent.children;
    let lenChildren = divParent.children.length;
    const containerToChange = MainContentChildren[lenChildren - 1];
    const containerFirstChild = containerToChange.children[0];
    const containerSecondGrandChild = containerFirstChild.children[1];
    const subListName = containerSecondGrandChild.children[0];
    const subListDescription = containerSecondGrandChild.children[1];
    subListName.textContent = "New List test";
    subListDescription.textContent = "Add a description test";

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
      const subListName = document.querySelector(".sub-list-name");
      subListName.textContent = "New List";

      const subListDescription = document.querySelector(
        ".sub-list-description"
      );
      subListDescription.textContent = "Add a description";

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
  const displayTaskButtonContainer = document.querySelector(
    ".sub-list-container-left"
  );
  const displayTaskButton = document.querySelector(".display-tasks");
  if (displayTaskButton) {
    let displayTaskButtonIsActive = true;

    displayTaskButtonContainer.addEventListener("click", function () {
      displayTaskButtonIsActive = !displayTaskButtonIsActive;
      if (!displayTaskButtonIsActive) {
        displayTaskButton.classList.add("down");
      } else {
        displayTaskButton.classList.remove("down");
      }
    });
  }
}

const myProject = myProjectManager.getProjectById(1725142384056);
myProject.addList("New List 1", "Description 1");
myProject.addList("New List 2", "Description 2");
myProject.addList("New List 3", "Description 3");
myProject.addList("New List 4", "Description 4");

console.log(myProject);
