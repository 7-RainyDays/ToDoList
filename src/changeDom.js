import { Project, Todo, projectArray } from "./project";


const domHandler = () => {

    let currentProject = "";
    let currentTodo = "";

    //dialogs
    const dialogNewProject = document.getElementById('add-project-dialog');
    const dialogEditProject = document.getElementById('edit-project-dialog');
    const dialogAddTodo = document.getElementById('add-todo-dialog');
    const dialogEditTodo = document.getElementById('edit-todo-dialog');

    //form
    const proForm = document.getElementById('project-form');
    const editProForm = document.getElementById('edit-project-form');

    const todoForm = document.getElementById('todo-form');
    const editTodoForm = document.getElementById('edit-todo-form');

    //left section 
    const allProjectsDiv = document.querySelector('.all-projects-con');

    //buttons
    const btnNewProject = document.querySelector('.add-project-btn');
    const btnsSubmitPro = document.getElementsByClassName('confirm-project');
    const btnSubmitEditedPro = document.querySelector('.confirm-edit-project');
    const btnsSubmitTodo = document.getElementsByClassName('confirm-todo');
    const btnsSubmitEditedTodo = document.querySelector('.confirm-edit-todo');
    const btnsCancel = document.getElementsByClassName('cancel');

    //right Section
    const projectDetails = document.querySelector('.project-details');
    const children = projectDetails.children;
    const listTodos = document.querySelector('.to-do-list');

    //edit Project and Todo Dialog Values
    const editProTitle = document.getElementById('edit-project-title');
    const editProDescription = document.getElementById('edit-description');
    const editTodoName = document.getElementById('edit-todo-name');
    const editTodoDueDate = document.getElementById('edit-due-date');
    const editPriority = document.getElementById('edit-priority');
    const editNotes = document.getElementById('edit-notes');

    const projectHeaders = document.getElementsByClassName('display-project-title');
    const projectHeaderDescr = document.querySelector('.display-project-description');

    //DOM MANIPULATION

    const displayRightSide = (proj) => {
        children[0].innerHTML = proj.title;
        children[1].innerHTML = proj.description;
    };

    const resetTodoInDOM = () => {
        const getList = document.getElementsByClassName('todo');
        if (getList.length > 0) {
            Array.from(getList).forEach(element => element.remove());
        };
    };

    //display projects on DOM
    const displayNewProjects = (proj) => {
        const projectDiv = document.createElement('div');
        projectDiv.setAttribute('class', 'project');

        projectDiv.setAttribute('data-project-id', proj.projectID);

        const header = document.createElement('h3');
        header.classList.add("display-project-title");
        header.innerHTML = proj.title;

        const notes = document.createElement('p');
        notes.classList.add("display-project-description");
        notes.innerHTML = proj.description;

        const changeProject = document.createElement('div')
        changeProject.classList.add('change-project');

        const btnAddTodo = document.createElement('button');
        btnAddTodo.classList.add('add-todo-to-project');
        btnAddTodo.type = 'button';
        btnAddTodo.innerHTML = 'Add Todo';

        const btnEditProject = document.createElement('button');
        btnEditProject.classList.add('edit-project');
        btnEditProject.type = 'button';
        btnEditProject.innerHTML = 'Edit';

        const btnDeleteProject = document.createElement('button');
        btnDeleteProject.classList.add('delete-project');
        btnDeleteProject.type = 'button';
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
        resetTodoInDOM();
        for (let i = 0; i < todoArray.length; i++) {
            const todoValues = Object.values(todoArray[i]);
            const todoKeys = Object.keys(todoArray[i]);
            const listItem = document.createElement('li');
            listItem.setAttribute('class', 'todo');

            for (let y = 0; y < todoValues.length; y++) {
                const p = document.createElement('p');
                p.innerHTML = todoValues[y]
                p.classList.add(todoKeys[y])
                listItem.appendChild(p);
            }

            const toBeDeleted = document.createElement('Button')
            toBeDeleted.type = 'button';
            toBeDeleted.classList.add('delete');
            toBeDeleted.innerHTML = 'delete';
            toBeDeleted.addEventListener("click", () => removeTodoDOM(i));

            const toBeEdited = document.createElement('Button')
            toBeEdited.type = 'button';
            toBeEdited.classList.add('edit');
            toBeEdited.innerHTML = 'edit';
            toBeEdited.addEventListener("click", () => editTodo(i));

            listItem.appendChild(toBeDeleted);
            listItem.appendChild(toBeEdited);
            listTodos.appendChild(listItem);
        };
    };

    const editTodo = (i) => {
        currentTodo = i;
        editTodoName.value = currentProject.todoArray[i].name;
        editTodoDueDate.value = currentProject.todoArray[i].dueDate;
        editPriority.value = currentProject.todoArray[i].priority;
        editNotes.value = currentProject.todoArray[i].notes;
        dialogEditTodo.showModal();
    };

    const editProject = () => {
        editProTitle.value = currentProject.title;
        editProDescription.value = currentProject.description;
        dialogEditProject.showModal();
    };

    const removeTodoDOM = (i) => {
        const getList = document.getElementsByClassName('todo');
        Array.from(getList)[i].remove();
        currentProject.deleteTodo(i);
    };

    //update global variable currentProject
    const updateCurrentProject = (id) => {
        currentProject = projectArray.find((pro) => pro.projectID === id);
    }

    const deleteProject = (project) => {
        { };
    }

    //EVENT LISTENERS 

    //logic to add todos with dialog
    (function addSubmitTodoListener() {
        Array.from(btnsSubmitTodo).forEach(todo => {

            todo.addEventListener('click', () => {
                const todoName = document.getElementById('todo-name').value.trim();
                const todoDueDate = document.getElementById('due-date').value.trim();
                const priority = document.getElementById('priority').value.trim();
                const notes = document.getElementById('notes').value.trim();
                currentProject.initializeTodo(todoName, todoDueDate, priority, notes);
                dialogAddTodo.close('submitted new Todo')
                todoForm.reset();
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
                        editProject();
                        break;

                    case 'delete-project':
                        deleteProject(selectedProject);
                        break;
                };
            } else {
                displayRightSide(currentProject);
                displayTodos(currentProject.todoArray);
            };
        });
    })();

    (function addCancelBtnsListener() {
        Array.from(btnsCancel).forEach(btn => {
            btn.addEventListener("click", event => {
                const dialog = event.currentTarget.closest('dialog');
                dialog.close("cancel action");
            });
        });
    })();

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
                proForm.reset();
            });
        });
    };

    (function submitEditedProject() {
        btnSubmitEditedPro.addEventListener('click', () => {
            const editedProTitle = document.getElementById('edit-project-title').value.trim();
            const editedProDescription = document.getElementById('edit-description').value.trim();
            currentProject.title = editedProTitle;
            currentProject.description = editedProDescription;

            Array.from(projectHeaders).forEach(pro => {
                pro.innerHTML = editedProTitle;
            });

            projectHeaderDescr.innerHTML = editedProDescription;
            dialogEditProject.close('submitted edited Project')
            editProForm.reset();
        });
    })();

    (function submitEditedTodo() {
        btnsSubmitEditedTodo.addEventListener('click', () => {
            const i = currentTodo;
            const title = document.getElementById('edit-todo-name').value.trim();
            const date = document.getElementById('edit-due-date').value.trim();
            const prio = document.getElementById('edit-priority').value.trim();
            const note = document.getElementById('edit-notes').value.trim();
            currentProject.updateTodo(title, date, prio, note, i)
            dialogEditTodo.close('submitted edited Todo')
            editTodoForm.reset();
            displayTodos(currentProject.todoArray);
        });
    })();

    return { BtnAddProject: btnAddProject, addBtnListeners: addSumbmitProjListener };
};

export default domHandler;

