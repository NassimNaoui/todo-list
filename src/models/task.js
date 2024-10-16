export default class Task {
  constructor(title, id, note, priority, date, status) {
    (this.title = title),
      (this.id = id),
      (this.note = note),
      this.setPriority(priority),
      (this.date = date),
      (this.status = status);
  }

  setPriority(priority) {
    const validProperties = ["Low", "Medium", "High"];
    if (!validProperties.includes(priority)) {
      throw new Error(`Priority must be one of: ${validProperties.join(", ")}`);
    }
    this.priority = priority;
  }

  updateTitle(newTitle) {
    this.title = newTitle;
  }

  updateNote(newNote) {
    this.note = newNote;
  }

  updatePriority(newPriority) {
    this.setPriority(newPriority);
  }

  updateDate(newDate) {
    this.date = newDate;
  }

  updateStatus() {
    this.status = !this.status;
  }
}
