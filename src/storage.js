import { Project } from "./project";


function storageAvailable(type) {
    let storage;
    try {
        storage = window[type];
        const x = "__storage_test__";
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    } catch (e) {
        return (
            e instanceof DOMException &&
            e.name === "QuotaExceededError" &&
            // acknowledge QuotaExceededError only if there's something already stored
            storage &&
            storage.length !== 0
        );
    }
}

if (storageAvailable("localStorage")) {
    // Yippee! We can use localStorage awesomeness
} else {
    alert("Oops! Something went wrong with the storage.")
}

let storedData = [
    {
        projectID: '1',
        title: 'Your First Project',
        description: 'I got things to do.',
        todoArray: [
            {
                title: 'Feed the cat',
                dueDate: '2024-12-31',
                priority: 'High',
                notes: 'Meow',
                completed: false
            },
            {
                title: 'See the Dentist',
                dueDate: '2024-07-31',
                priority: 'High',
                notes: 'Ouchie!',
                completed: false
            }
        ]
    }
];

export const saveToLocalStorage = (key, data) => {
    const jsonData = JSON.stringify(data);
    localStorage.setItem(key, jsonData);
};

saveToLocalStorage('storedDataArray', storedData);

const loadStorage = (key) => {
    const jsonData = localStorage.getItem(key);
    return jsonData ? JSON.parse(jsonData) : alert("Failed to load Storage Data");
}

export let projectArray = loadStorage('storedDataArray');

const loadStorageData = (projectArray) => {
    projectArray.forEach(element => {
        Object.setPrototypeOf(element, Project.prototype)
    });
};

/* Proxy handler Versuch: Problem Verschachtelung des Objektes. 
const handler = {
    set(target, prop, value, receiver) {
        target[prop] = value;
        saveToLocalStorage('storedDataArray', target);
        return true;
    },
};

const proxySaveChanges = new Proxy(projectArray, handler);
*/

loadStorageData(projectArray);



//[{"projectID":"1","title":"Your First Project","description":"I got things to do.","todoArray":[{"title":"Feed the cat","dueDate":"2024-12-31","priority":"High","notes":"Meow","completed":false},{"title":"See the Dentist","dueDate":"2024-07-31","priority":"High","notes":"Ouchie!","completed":false}]}]