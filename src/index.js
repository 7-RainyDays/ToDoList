import './style.css';
import domHandler from './changeDom.js';

document.addEventListener("DOMContentLoaded", () => {
    const handler = domHandler();
    handler.BtnAddProject();
    handler.addBtnListeners();
});