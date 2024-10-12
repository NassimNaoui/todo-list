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

  getListById(id) {
    return this.lists.find((list) => list.id === id);
  }

  getIndexlist(id) {
    const list = this.getListById(id); // Récupérer la liste par ID
    if (list) {
      // Vérifier si la liste existe
      for (let i = 0; i < this.lists.length; i++) {
        if (this.lists[i].id === list.id) {
          return i;
        }
      }
    }
    return -1; // Retourner -1 si la liste n'est pas trouvée
  }

  updateList(list, upDatedData) {
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
