export class Project {

    constructor(projectID, title, description) {
        this.projectID = projectID;
        this.title = title;
        this.description = description;
        this.todoArray = [];
    };

    initializeTodo(name, dueDate, priority, notes) {
        const newTodo = new Todo(name, dueDate, priority, notes);
        todoArray.push(newTodo);
    }
}


class Todo {
    constructor(name, dueDate, priority, notes) {
        self.name = name;
        self.dueDate = dueDate;
        self.priority = priority;
        self.notes = notes;
    }
}

