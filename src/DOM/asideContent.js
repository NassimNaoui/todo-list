import ProjectManager from "../models/projectManager";
import { addOptionsIcon } from "../UI/imgUploader";

const myProjectManager = new ProjectManager();

function addNewProject (projectName) {

    // Ajouter un projet
    myProjectManager.addProject(projectName);
    
    console.log(myProjectManager.getAllProjects());

    return projectName;
}


// Function for adding HTML Code in Aside bottom section

const sectionBottomContainer = document.getElementById("content")

function addHtmlproject (projectName) {
    
    //Adding the list container
    const newListContainer = document.createElement('div');
    newListContainer.className = "list-container";
    
    sectionBottomContainer.appendChild(newListContainer);
    
    //Adding the 2 children into the list container
    const divContent = document.createElement('div');
    divContent.textContent = projectName;
    
    const iconContainer = document.createElement('div');
    iconContainer.id = "options-icon"
    iconContainer.className = "icon"
    
    newListContainer.appendChild(divContent)
    newListContainer.appendChild(iconContainer)
    
    //ading 2 children into the iconContainer
    addOptionsIcon();
}

// Adding function to the add button icon

const addButton = document.getElementById("add-icon")

addButton.addEventListener('click', function() {
    
    const newProject = document.createElement("div");
    newProject.textContent = addNewProject("New list")
    
    addHtmlproject(newProject.textContent);
    
})

// Displaying options and undiplaying

const optionsButton = document.getElementById("options-icon");
const optionsCard = document.getElementById("options-card");
const bodyElement = document.querySelector("body");

// Variable pour vérifier si le pop-up est visible
let isOptionsCardVisible = false;

optionsButton.addEventListener('click', function(event) {
    // Empêche l'événement de se propager au body
    event.stopPropagation();

    // Toggle l'affichage du pop-up
    isOptionsCardVisible = !isOptionsCardVisible;
    optionsCard.style.display = isOptionsCardVisible ? 'flex' : 'none';

    // Delete Hover effect
    
});

bodyElement.addEventListener('click', function() {
    if (isOptionsCardVisible) {
        optionsCard.style.display = 'none';
        isOptionsCardVisible = false;
    }
});

// Empêche le clic sur la carte d'options de fermer le pop-up
optionsCard.addEventListener('click', function(event) {
    event.stopPropagation();
});




