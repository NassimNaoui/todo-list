import Task from "./task";

export default class List {
  constructor(name, description, id) {
    this.name = name;
    this.description = description;
    this.id = id;
    this.tasks = [];
  }

  updateNameList(newName) {
    this.name = newName;
  }

  updateDescription(newDescription) {
    this.description = newDescription;
  }

  addTask(title, id, note, priority, date, status) {
    const newTask = new Task(title, id, note, priority, date, status);
    this.tasks.push(newTask);
  }

  removeTask(index) {
    if (index >= 0 && index < this.tasks.length) {
      this.tasks.splice(index, 1);
    }
  }

  getTask(index) {
    return this.tasks[index];
  }

  getTaskById(id) {
    return this.tasks.find((task) => task.id === id);
  }

  getIndexTask(id) {
    const task = this.getTaskById(id); // Récupérer la liste par ID
    if (task) {
      // Vérifier si la liste existe
      for (let i = 0; i < this.tasks.length; i++) {
        if (this.tasks[i].id === task.id) {
          return i;
        }
      }
    }
    return -1; // Retourner -1 si la liste n'est pas trouvée
  }

  updateTask(index, updatedData) {
    const task = this.tasks[index];
    if (task) {
      if (updatedData.title) {
        task.updateTitle(updatedData.title);
      }
      if (updatedData.note) {
        task.updateNote(updatedData.note);
      }
      if (updatedData.priority) {
        task.updatePriority(updatedData.priority);
      }
      if (updatedData.date) {
        task.updateDate(updatedData.date);
      }
      if (typeof updatedData.status !== "undefined") {
        task.status = updatedData.status;
      }
    }
  }

  getAllTasks() {
    return this.tasks;
  }
}
