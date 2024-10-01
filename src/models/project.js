import List from "./list";

export default class Project {
  constructor(projectName, id) {
    this.projectName = projectName;
    this.id = id;
    this.lists = [];
  }

  updateProjectName(newProjectName) {
    this.projectName = newProjectName;
  }

  addList(name, description, id) {
    const newList = new List(name, description, id);
    this.lists.push(newList);
  }

  removeList(index) {
    if (index >= 0 && index < this.lists.length) {
      this.lists.splice(index, 1);
    }
  }

  getList(index) {
    return this.lists[index];
  }

  // Récupérer une liste par ID
  getListById(id) {
    return this.lists.find((list) => list.id === id);
  }

  updateList(index, upDatedData) {
    const list = this.lists[index];
    if (list) {
      if (upDatedData.name) {
        list.updateNameList(upDatedData.name);
      }
      if (upDatedData.description) {
        list.updateDescription(upDatedData.description);
      }
    }
  }

  getAllList() {
    return this.lists;
  }
}
