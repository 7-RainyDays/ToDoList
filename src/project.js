export class Project {

    constructor(projectID, title, description) {
        this.projectID = projectID;
        this.title = title;
        this.description = description;
        this.todoArray = [];
    };

    initializeTodo(name, dueDate, priority, notes) {
        const newTodo = new Todo(name, dueDate, priority, notes);
        this.todoArray.push(newTodo);
    }

    deleteTodo(i) {
        this.todoArray.splice(i, 1);
    }
}


export class Todo {
    constructor(name, dueDate, priority, notes) {
        this.name = name;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
    }
}

