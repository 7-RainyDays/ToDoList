export class Project {

    constructor(projectID, title, description) {
        this.projectID = projectID;
        this.title = title;
        this.description = description;
        this.todoArray = [];
    }

    initializeTodo(name, dueDate, priority, notes) {
        const newTodo = new Todo(name, dueDate, priority, notes);
        this.todoArray.push(newTodo);
    }

    deleteTodo(i) {
        this.todoArray.splice(i, 1);
    }

    updateTodo(title, date, prio, notes, i) {
        this.todoArray[i].title = title;
        this.todoArray[i].date = date;
        this.todoArray[i].prio = prio;
        this.todoArray[i].notes = notes;
    }
}


export class Todo {
    constructor(name, dueDate, priority, notes) {
        this.name = name;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
    }
};

export const projectArray = [];
const defaultProject = new Project('1', 'Your First Project', 'I got things to do.')
projectArray.push(defaultProject);
