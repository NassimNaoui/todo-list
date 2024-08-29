export default class Task {
    constructor(title, note, priority, date) {
        this.title = title,
        this.note = note,
        this.setPriority(priority),
        this.date = date,
        this.status = false
    }

    setPriority(priority) {
        const validProperties = ['low','medium','high'];
        if (!validProperties.includes(priority)) {
            throw new Error(`Priority must be one of: ${validProperties.join(', ')}`)
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
        this.setPriority(newPriority)
    }

    updateDate(newDate) {
        this.date = newDate;
    }

    updateStatus() {
        this.status = !this.status;
    }
}
