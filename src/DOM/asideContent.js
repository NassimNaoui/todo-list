import ProjectManager from "../models/projectManager";
import { myProjectManager } from "../models/projectManager";
import { addOptionsIcon } from "../UI/imgUploader";
import changeMainContent from "./mainContent";

// Function to add a new project
function addNewProject(projectName) {
  const id = Date.now();
  myProjectManager.addProject(projectName, id);

  myProjectManager.saveProjectsToLocalStorage();
  return [projectName, id];
}

function loadProjectsFromLocalStorageDOM() {
  const projects = myProjectManager.loadProjectsFromLocalStorage();
  console.log(projects);
  if (projects) {
    projects.forEach((project) => {
      addHtmlproject(project.projectName, project.id);
    });
  }
}

// Function for adding HTML Code in Aside bottom section
function addHtmlproject(projectName, id) {
  console.log(`Adding HTML for project: ${projectName}, ID: ${id}`);
  const newListContainer = document.createElement("div");
  newListContainer.className = "list-container";

  const sectionBottomContainer = document.getElementById("content");
  if (!sectionBottomContainer) {
    console.error('Element with id "content" not found.');
    return;
  }
  sectionBottomContainer.appendChild(newListContainer);

  const divContent = document.createElement("div");
  divContent.textContent = projectName;
  divContent.id = id;
  divContent.classList.add("project-name");

  const iconContainer = document.createElement("div");
  iconContainer.id = "options-icon";
  iconContainer.className = "icon";

  newListContainer.appendChild(divContent);
  newListContainer.appendChild(iconContainer);

  // Adding 2 children into the iconContainer
  addOptionsIcon(iconContainer);

  const htmlStringCard = `
        <div id="options-card">
            <ul id="rename-option">Rename</ul>
            <ul id="delete-option">Delete</ul>
        </div>`;
  newListContainer.insertAdjacentHTML("beforeend", htmlStringCard);

  const optionsButton = iconContainer;
  const optionsCard = newListContainer.querySelector("#options-card");
  // const listContainerHovered = document.getElementById("section-bottom")

  let isOptionsCardVisible = false;

  optionsButton.addEventListener("click", function (event) {
    event.stopPropagation();

    isOptionsCardVisible = !isOptionsCardVisible;
    optionsCard.style.display = isOptionsCardVisible ? "flex" : "none";
  });

  document.body.addEventListener("click", function () {
    if (isOptionsCardVisible) {
      optionsCard.style.display = "none";
      isOptionsCardVisible = false;
    }
  });

  optionsCard.addEventListener("click", function (event) {
    event.stopPropagation();
  });

  const renameButton = document.querySelectorAll("#rename-option");

  renameButton.forEach((element) => {
    element.addEventListener("click", function () {
      const parentDiv = element.parentElement;
      const grandParentDiv = parentDiv.parentElement;
      const firstChild = grandParentDiv.firstChild;

      if (grandParentDiv.querySelector("input")) {
        return;
      }

      firstChild.style.display = "none";

      const newProjectNameInput = document.createElement("input");
      newProjectNameInput.type = "text";
      newProjectNameInput.value = firstChild.textContent.trim();
      grandParentDiv.insertBefore(
        newProjectNameInput,
        grandParentDiv.firstChild
      );

      newProjectNameInput.focus();

      newProjectNameInput.addEventListener("kewdown", function (event) {
        if (event.key === "Enter") {
          updateProjectNameDom();
        }
      });

      newProjectNameInput.addEventListener("blur", updateProjectNameDom);

      function updateProjectNameDom() {
        const newName = newProjectNameInput.value;
        if (newName.length === 0) {
          newProjectNameInput.remove();
          firstChild.style.display = "flex";
        } else {
          myProjectManager.updateProject(getIndex(firstChild.id), {
            projectName: newName,
          });
          firstChild.textContent = newName;
          newProjectNameInput.remove();
          firstChild.style.display = "flex";
          console.log(myProjectManager.getAllProjects());
        }
      }
    });
  });

  const deleteButton = document.querySelectorAll("#delete-option");

  deleteButton.forEach((element) => {
    element.addEventListener("click", function () {
      const parentDiv = element.parentElement;
      const grandParentDiv = parentDiv.parentElement;
      const firstChild = grandParentDiv.firstChild;
      myProjectManager.removeProject(getIndex(firstChild.id));
      grandParentDiv.remove();
      console.log(myProjectManager.getAllProjects());
    });
  });

  //update main content

  const pages = document.querySelectorAll(".list-container");

  pages.forEach((element) => {
    if (!element.hasEventListenerAdded) {
      // Utilise un flag custom
      element.addEventListener("click", function () {
        const page = element.firstChild;
        changeMainContent(page.textContent, page.id);
      });
      element.hasEventListenerAdded = true; // Définit le flag
    }
  });
}

// Event listener for adding a new project
const addButton = document.getElementById("add-icon");

addButton.addEventListener("click", function () {
  const infoproject = addNewProject("New page");
  const projectName = infoproject[0];
  const projectId = infoproject[1];

  addHtmlproject(projectName, projectId);
});

// Get the index of the object by the ID in the DOM
function getIndex(divId) {
  const projects = myProjectManager.getAllProjects();

  for (let i = 0; i < projects.length; i++) {
    if (projects[i].id == divId) {
      return i;
    }
  }

  return -1;
}

// Load projects from localStorage when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", loadProjectsFromLocalStorageDOM);
