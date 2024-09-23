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

  addTask(title, note, priority, date) {
    const newTask = new Task(title, note, priority, date);
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
