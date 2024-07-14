export class Project {

    constructor() {
        this.title = title;
        this.description = description;
    }

    deleteEntry(params) {
        { };
    };
}


export class ToDoList extends Project {

    constructor() {
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
    }
}