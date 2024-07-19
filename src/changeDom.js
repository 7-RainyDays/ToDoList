//display todos funktioniert noch nicht richtig:;

import { Project, Todo } from "./project";


const domHandler = () => {

    let currentProject = "";
    const projectArray = []; //Array Brackets != Object Brackets;
    const defaultProject = new Project('1', 'Your First Project', 'I got things to do.')
    projectArray.push(defaultProject);

    //dialogs
    const dialogNewProject = document.getElementById('add-project-dialog');
    const dialogAddTodo = document.getElementById('add-todo-dialog');

    //left section 
    const allProjectsDiv = document.querySelector('.all-projects-con');

    //buttons
    const btnNewProject = document.querySelector('.add-project-btn');
    const btnsSubmitPro = document.getElementsByClassName('confirm-project');
    const btnsSubmitTodo = document.getElementsByClassName('confirm-todo');
    const btnsCancel = document.getElementsByClassName('cancel');

    //right Section
    const projectDetails = document.querySelector('.project-details');
    const children = projectDetails.children;
    const rightTodos = document.querySelector('.container-todos');
    const listTodos = document.querySelector('.to-do-list');

    //DOM MANIPULATION

    const displayRightSide = (proj) => {
        children[0].innerHTML = proj.title;
        children[1].innerHTML = proj.description;
    };

    //display projects on DOM
    const displayNewProjects = (proj) => {
        const projectDiv = document.createElement('div');
        projectDiv.setAttribute('class', 'project');

        projectDiv.setAttribute('data-project-id', proj.projectID);

        const header = document.createElement('h3');
        header.innerHTML = proj.title;

        const notes = document.createElement('p');
        notes.innerHTML = proj.description;

        const changeProject = document.createElement('div')
        changeProject.setAttribute('class', 'change-project');

        const btnAddTodo = document.createElement('button');
        btnAddTodo.setAttribute('class', 'add-todo-to-project');
        btnAddTodo.setAttribute('type', 'button');
        btnAddTodo.innerHTML = 'Add Todo';

        const btnEditProject = document.createElement('button');
        btnEditProject.setAttribute('class', 'edit-project');
        btnEditProject.setAttribute('type', 'button');
        btnEditProject.innerHTML = 'Edit';

        const btnDeleteProject = document.createElement('button');
        btnDeleteProject.setAttribute('class', 'delete-project');
        btnDeleteProject.setAttribute('type', 'button');
        btnDeleteProject.innerHTML = 'Delete';

        changeProject.appendChild(btnAddTodo);
        changeProject.appendChild(btnEditProject);
        changeProject.appendChild(btnDeleteProject);

        projectDiv.appendChild(header);
        projectDiv.appendChild(notes);
        projectDiv.appendChild(changeProject);
        allProjectsDiv.appendChild(projectDiv);
    };

    const displayTodos = (todoArray) => {
        todoArray.forEach(todo => {
            const listItem = document.createElement('li');
            listItem.setAttribute('class', todo);
            listItem.innerHTML = `Name: ${todo.name} , Due Date: ${todo.dueDate}, Priority: ${todo.dueDate}, Notes: ${todo.notes}`;

            const deleteTodo = document.createElement('Button')
            deleteTodo.setAttribute('type', 'button');
            deleteTodo.setAttribute('class', 'delete');
            deleteTodo.innerHTML = 'delete';

            const editTodo = document.createElement('Button')
            editTodo.setAttribute('type', 'button');
            editTodo.setAttribute('class', 'delete');
            editTodo.innerHTML = 'edit';

            listItem.appendChild(deleteTodo);
            listItem.appendChild(editTodo);
            listTodos.appendChild(listItem);
        });
    }

    const cleanTodoList =

        //EVENT LISTENERS 

        //logic to add todos with dialog
        (function addSubmitTodoListener() {
            Array.from(btnsSubmitTodo).forEach(todo => {

                todo.addEventListener('click', event => {
                    const respectiveProject = event.target.closest('.project')//.getAttribute('data-project-id');
                    const todoName = document.getElementById('todo-name').value.trim();
                    const todoDueDate = document.getElementById('due-date').value.trim();
                    const priority = document.getElementById('priority').value.trim();
                    const notes = document.getElementById('notes').value.trim();
                    currentProject.initializeTodo(todoName, todoDueDate, priority, notes);
                    dialogAddTodo.close('submitted new Todo')
                    displayTodos(currentProject.todoArray);
                });
            });
        })();

    //handle add project button 
    const btnAddProject = () => {
        btnNewProject.addEventListener("click", () => {
            dialogNewProject.showModal();
        });
    };

    const updateCurrentProject = (id) => {
        currentProject = projectArray.find((pro) => pro.projectID === id);
    }

    //Handle project click -> either projectEdit OR show project details
    (function handleProjectClick() {
        allProjectsDiv.addEventListener('click', event => {
            const selectedProject = (event.target.closest('.project')).getAttribute('data-project-id');
            updateCurrentProject(selectedProject);
            if (event.target.tagName === 'BUTTON') {
                switch (event.target.className) {
                    case 'add-todo-to-project':
                        dialogAddTodo.showModal();
                        break;
                    case 'edit-project':
                        alert('edit');
                        break;
                    case 'delete-project':
                        alert('delete');
                        break;
                };
            } else {
                displayRightSide(currentProject);
            }
        })
    })();

    //add cancel button listener
    (function addCancelBtnsListener() {
        Array.from(btnsCancel).forEach(btn => {
            btn.addEventListener("click", event => {
                const dialog = event.currentTarget.closest('dialog');
                dialog.close("cancel action");
            })
        })
    })();

    //add submit Project button listener
    const addSumbmitProjListener = () => {

        Array.from(btnsSubmitPro).forEach(btn => {
            btn.addEventListener("click", () => {

                const projectTitle = document.getElementById('project-title').value.trim();
                const projectDescription = document.getElementById('description').value.trim();
                const projectID = (projectArray.length + 1).toString() //toSting mit () :))
                const newProject = new Project(projectID, projectTitle, projectDescription);
                projectArray.push(newProject);
                displayNewProjects(newProject);
                dialogNewProject.close("confirmed entry");
            })
        });
    }

    return { BtnAddProject: btnAddProject, addBtnListeners: addSumbmitProjListener };
};

export default domHandler;

