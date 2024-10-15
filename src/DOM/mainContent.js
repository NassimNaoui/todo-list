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
      const arrayList = Array.from(listInfosContainer);
      arrayList[i].id = myProjectLists[i].id;
      const parentDiv = arrayList[i].parentElement;
      const grandParent = parentDiv.parentElement;
      const taskcontainer = grandParent.children[1];

      const htmlStringTableHeader = `
        <div class="table-header">
          <div class="table-label" id="name">Name</div>  
          <div class="table-label" id="note">Note</div>
          <div class="table-label" id="priority">Priority</div>  
          <div class="table-label" id="date">Date</div> 
          <div class="table-label" id="status">Status</div>   
        </div>
      `;

      const listTasks = myProjectLists[i].getAllTasks();
      const taskIndex = listTasks.length;
      console.log(taskIndex);

      for (let j = 0; j < taskIndex; j++) {
        loadTaskDom(
          taskcontainer,
          listTasks[j].title,
          listTasks[j].note,
          listTasks[j].priority,
          listTasks[j].status
        );
      }
      taskcontainer.insertAdjacentHTML("afterbegin", htmlStringTableHeader);
    }
    updateInfoListDOM();
    addListbutton(mainContent);
    addTaskDOM();
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
    addTaskDOM();

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
  const editableElements = document.querySelectorAll(
    ".sub-list-container-middle [contenteditable]"
  );

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

function addTaskDOM() {
  const addTaskButton = document.querySelectorAll("#add-task-button");

  const htmlStringTableHeader = `
    <div class="table-header">
      <div class="table-label" id="name">Name</div>  
      <div class="table-label" id="note">Note</div>
      <div class="table-label" id="priority">Priority</div>  
      <div class="table-label" id="date">Date</div> 
      <div class="table-label" id="status">Status</div>   
    </div>
  `;

  const htmlStringTableRow = `
  <div class="table-row">
    <div class="task-name-container">
      <div class="task-name" contenteditable="true"></div>  
    </div>  
    <div class="task-note-container">
      <div class="task-note" contenteditable="true"></div>
    </div>
    <div class="task-priority">
      <div id="priority-value" class="option-Low">Low</div>
      <div class="priority-options">
        <div class="priority-label">
          <div class="option-Low">Low</div>
        </div>
        <div class="priority-label">
          <div class="option-Medium">Medium</div>
        </div>
        <div class="priority-label">
          <div class="option-High">High</div>
        </div>
      </div>
    </div>
    <input type="date" class="task-date"></input> 
    <div class="task-status-container">
      <input type="checkbox" class="task-status"></input>  
    </div>
  </div>
  `;

  function displayPriorities() {
    const priorityButtons = document.querySelectorAll(".task-priority");

    priorityButtons.forEach((element) => {
      let isClicked = false; // Variable locale pour suivre l'état du bouton

      element.addEventListener("click", function () {
        const priorityValue = this.children[0];
        const optionCard = this.children[1];

        if (!isClicked) {
          optionCard.style.display = "flex";
          updatepriorities(optionCard, priorityValue);
          isClicked = true; // Met à jour l'état à "true"
        } else {
          optionCard.style.display = "none";
          isClicked = false; // Réinitialise l'état à "false"
        }
      });
    });
  }

  function updatepriorities(container, value) {
    const options = container.querySelectorAll(".priority-label");

    options.forEach((element) => {
      element.addEventListener("click", () => {
        const optionselected = element.firstElementChild.textContent;
        value.textContent = optionselected;
        value.classList = `option-${optionselected}`;
      });
    });
  }

  addTaskButton.forEach((element) => {
    element.addEventListener("click", function () {
      if (element.getAttribute("data-clicked") === "true") return;

      const taskContainer = this.parentElement;
      const childrenContainer = taskContainer.children;
      const taskContainerLength = childrenContainer.length;

      if (taskContainerLength == 1) {
        taskContainer.insertAdjacentHTML("afterbegin", htmlStringTableHeader);
        taskContainer.insertAdjacentHTML("beforeend", htmlStringTableRow);
        displayPriorities();
        taskContainer.appendChild(element);
      } else if (taskContainerLength >= 2) {
        taskContainer.insertAdjacentHTML("beforeend", htmlStringTableRow);
        displayPriorities();
        taskContainer.appendChild(element);
      }
    });
  });
}

function loadTaskDom(divParent, name, note, priority, date, status) {
  const htmlStringTableRow = `
  <div class="table-row">
    <div class="task-name-container">
      <div class="task-name" contenteditable="true">${name}</div>  
    </div>  
    <div class="task-note-container">
      <div class="task-note" contenteditable="true">${note}</div>
    </div>
    <div class="task-priority">
      <div id="priority-value" class="option-Low">${priority}</div>
      <div class="priority-options">
        <div class="priority-label">
          <div class="option-Low">Low</div>
        </div>
        <div class="priority-label">
          <div class="option-Medium">Medium</div>
        </div>
        <div class="priority-label">
          <div class="option-High">High</div>
        </div>
      </div>
    </div>
    <input type="date" class="task-date">${date}</input> 
    <div class="task-status-container">
      <input type="checkbox" class="task-status" ${status}></input>  
    </div>
  </div>
  `;

  divParent.insertAdjacentHTML("afterbegin", htmlStringTableRow);

  const priorityButtons = document.querySelectorAll(".task-priority");

  priorityButtons.forEach((element) => {
    let isClicked = false; // Variable locale pour suivre l'état du bouton

    element.addEventListener("click", function () {
      const priorityValue = this.children[0];
      const optionCard = this.children[1];

      if (!isClicked) {
        optionCard.style.display = "flex";
        updatepriorities(optionCard, priorityValue);
        isClicked = true; // Met à jour l'état à "true"
      } else {
        optionCard.style.display = "none";
        isClicked = false; // Réinitialise l'état à "false"
      }
    });
  });

  function updatepriorities(container, value) {
    const options = container.querySelectorAll(".priority-label");

    options.forEach((element) => {
      element.addEventListener("click", () => {
        const optionselected = element.firstElementChild.textContent;
        value.textContent = optionselected;
        value.classList = `option-${optionselected}`;
      });
    });
  }
}

const myProject = myProjectManager.getProjectById(1728540471487);
const myList = myProject.getListById(1728975362046);
myList.addTask("Titre", Date.now(), "Note", "Low", "", false);
myList.addTask("Titre-2", Date.now(), "Note-2", "Low", "", false);
console.log(myList);
