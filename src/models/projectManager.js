import Project from "./project";

export default class ProjectManager {
    constructor() {
        this.projects = [];
    }

    addProject(projectName) {
        const newProject = new Project(projectName);
        this.projects.push(newProject)
    }

    removeProject(index) {
        if(index >= 0 && index < this.projects.length) {
            this.projects.splice(index, 1);
        }
    }

    getProject(index) {
        return this.projects[index];
    }

    updateProject(index,upDatedData) {
        const project = this.projects[index];
        if (project) {
            if (upDatedData.projectName) {
                project.updateProjectName(upDatedData.projectName);
            }
        }
    }

    getAllProjects() {
        return this.projects;
    }
}