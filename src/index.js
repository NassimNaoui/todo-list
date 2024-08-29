import "./styles.css";
import ProjectManager from "./models/projectManager";

import "./UI/imgUploader"
import "./DOM/domManager"



// Créer une instance de ProjectManager
const myProjectManager = new ProjectManager();

 // Ajouter un projet
//myProjectManager.addProject('Famille');
// const project = myProjectManager.getProject(0)
// project.addList('vacs','Départ aux EAU le 1er décembre')

// const list = project.getList(0);
// list.addTask('Booker hotel','De préférence à moins de 100e','medium',Date())

// myProjectManager.addProject('travail');
// const project2 = myProjectManager.getProject(1)

// project2.addList('Préparer book', 'Finalisation du book Nat')

// const list2 = project2.getList(0)


// // Récupérer tous les projets
console.log(myProjectManager.getAllProjects());



