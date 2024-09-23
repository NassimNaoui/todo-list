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

  if (mainContent.firstChild && mainContent.firstChild.textContent == page) {
    return;
  } else if (
    mainContent.firstChild &&
    mainContent.firstChild.textContent !== page
  ) {
    while (mainContent.firstChild) {
      mainContent.removeChild(mainContent.firstChild);
    }
    mainContent.appendChild(pageTitle);
    addEmptyContent(mainContent);
    // addSublistContainer(mainContent);
  } else {
    mainContent.appendChild(pageTitle);
    addEmptyContent(mainContent);
    // addSublistContainer(mainContent);
  }
}

function addSublistContainer(divParent) {
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

  const addTaskButton = document.createElement("div");
  addTaskButton.id = "add-task-button";
  taskContainer.appendChild(addTaskButton);
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
      addList("New Main Task", "Description");
      //   const ListName = infoproject[0];
      //   const listDescription = infoproject[1];
      //   const listId = infoproject[2];
    });

    return emptyContainer;
  }
}

function removeEmptyContent() {
  const emptyContentContainer = document.querySelector(".empty-container");
  emptyContentContainer.remove();
}
