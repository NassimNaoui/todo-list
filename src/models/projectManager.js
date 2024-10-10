// import { List } from "./project";
import Project from "./project";

export default class ProjectManager {
  constructor() {
    this.projects = this.loadProjectsFromLocalStorage() || [];
  }

  // Ajouter un projet
  addProject(projectName, id) {
    const newProject = new Project(projectName, id);
    this.projects.push(newProject);
    this.saveProjectsToLocalStorage();
  }

  // Supprimer un projet par index
  removeProject(index) {
    if (index >= 0 && index < this.projects.length) {
      this.projects.splice(index, 1);
      this.saveProjectsToLocalStorage();
    }
  }

  // Supprimer un projet par ID
  removeProjectById(id) {
    const index = this.projects.findIndex((project) => project.id === id);
    if (index !== -1) {
      this.projects.splice(index, 1);
      this.saveProjectsToLocalStorage();
    }
  }

  // Récupérer un projet par index
  getProject(index) {
    return this.projects[index];
  }

  // Récupérer un projet par ID
  getProjectById(id) {
    return this.projects.find((project) => project.id === id);
  }

  // Mettre à jour un projet par index
  updateProject(index, updatedData) {
    const project = this.projects[index];
    if (project) {
      if (updatedData.projectName) {
        project.updateProjectName(updatedData.projectName);
      }
      this.saveProjectsToLocalStorage();
    }
  }

  // Récupérer tous les projets
  getAllProjects() {
    return this.projects;
  }

  // Sauvegarder les projets dans le localStorage
  saveProjectsToLocalStorage() {
    localStorage.setItem("projects", JSON.stringify(this.projects));
  }

  // Charger les projets depuis le localStorage
  // loadProjectsFromLocalStorage() {
  //   const savedProjects = localStorage.getItem("projects");
  //   if (savedProjects) {
  //     return JSON.parse(savedProjects).map(
  //       (projectData) => new Project(projectData.projectName, projectData.id)
  //     );
  //   }
  //   return [];
  // }

  loadProjectsFromLocalStorage() {
    const savedProjects = localStorage.getItem("projects");

    if (savedProjects) {
      return JSON.parse(savedProjects).map((projectData) => {
        // Crée un nouvel objet Project
        const project = new Project(projectData.projectName, projectData.id);

        // Si le projet a des listes, recrée les objets List et les ajoute au projet
        if (projectData.lists && Array.isArray(projectData.lists)) {
          projectData.lists.forEach((listData) => {
            // Crée une nouvelle liste
            project.addList(listData.name, listData.description, listData.id); // Ajoute chaque liste au projet
          });
        }

        return project; // Retourne le projet avec ses listes
      });
    }

    return [];
  }
}

export const myProjectManager = new ProjectManager();
