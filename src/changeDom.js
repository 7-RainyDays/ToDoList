import { ToDoList } from "./project";

const domHandler = () => {

    const dialogNewProject = document.getElementById('add-project');
    const dialogNewTodo = document.getElementById('add-todo');
    const allProjects = document.querySelector('.overwiev');

    //buttons
    const newProjectBtn = document.querySelector('.add-project-btn');
    const newTodoBtns = document.getElementsByClassName('add-todo-btns');
    const submitBtns = document.getElementsByClassName('confirm')
    const cancelBtns = document.getElementsByClassName('cancel');

    //display projects on DOM
    const displayProjects = (title, description) => {
        const project = document.createElement('div');
        project.setAttribute('class', 'project');


        const a = document.createElement('h3');
        a.innerHTML = title;

        const b = document.createElement('p');
        b.innerHTML = description;

        project.appendChild(a);
        project.appendChild(b);
        allProjects.appendChild(project);
    }

    //multiple modals soon, needs flexibility
    const addProject = () => {
        newProjectBtn.addEventListener("click", () => {
            dialogNewProject.showModal();
        });
    };

    const addTodo = () => {
        Array.from(newTodoBtns).forEach(btn => {
            btn.addEventListener("click", () => {
                dialogNewTodo.showModal();
            });
        });
    };

    //add button listeners for cancel/submit

    //irgendwie felxibler formatieren, da bisher nur add Project buttons angesprochen werden.
    const addBtnListeners = () => {
        Array.from(cancelBtns).forEach(btn => {
            btn.addEventListener("click", event => {
                const dialog = event.currentTarget.closest('dialog');
                dialog.close("cancel action");
            })
        });

        Array.from(submitBtns).forEach(btn => {
            btn.addEventListener("click", () => {
                const projectTitle = document.getElementById('project-title').value;
                const projectDescription = document.getElementById('description').value;
                displayProjects(projectTitle, projectDescription);
                dialogNewProject.close("confirmed entry");
            })
        });
    }
    return { addProject, addTodo, addBtnListeners };
};


export default domHandler;