import { ToDoList } from "./project";

const domHandler = () => {

    const dialog = document.getElementById('add-project');
    const allProjects = document.querySelector('.overwiev');

    //buttons
    const newProjectBtn = document.querySelector('.add-project-btn');
    const submitBtn = document.getElementsByClassName('confirm')
    const cancelBtn = document.querySelector('.overwiev');

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
            dialog.showModal();
        });
    };

    const addBtnListeners = () => {
        Array.from(cancelBtn).forEach(btn => {
            btn.addEventListener("click", () => {
                dialog.close("cancel action");
            })
        });

        Array.from(submitBtn).forEach(btn => {
            btn.addEventListener("click", () => {
                const projectTitle = document.getElementById('project-title').value;
                const projectDescription = document.getElementById('description').value;
                displayProjects(projectTitle, projectDescription);
                dialog.close("confirmed entry");
            })
        });
    }
    return { addProject, addBtnListeners };
};


export default domHandler;