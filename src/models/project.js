import List from "./list";

export default class Project {
    constructor(projectName) {
        this.projectName = projectName;
        this.lists = [];
    }

    updateProjectName(newProjectName) {
        this.projectName = newProjectName;
    }

    addList(name,description) {
        const newList = new List(name,description);
        this.lists.push(newList)
    }

    removeList(index) {
        if(index >= 0 && index < this.lists.length) {
            this.lists.splice(index, 1);
        }
    }

    getList(index) {
        return this.lists[index];
    }

    updateList(index,upDatedData) {
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