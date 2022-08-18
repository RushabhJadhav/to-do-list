let taskList = [];
let noTask = document.getElementById("no-task-container");
taskList = JSON.parse(localStorage.getItem("tasks"))
if(taskList == undefined) {
    taskList = [];
    let listContainer = document.getElementById("task-container");
    listContainer.style.display = "none";
    noTask.style.display = "flex";
}

for(let i = 0; i < taskList.length; i++) {
    let listItem = document.createElement("li");
    listItem.className = "task-items";
    listItem.id = "list-" + i;
    listItem.style.userSelect = "none";
    let text = document.createTextNode(taskList[i]);
    listItem.appendChild(text);
    document.getElementById("task-container").appendChild(listItem);
}

let button = document.getElementById("btn");
button.onclick = function() {
    let input = document.getElementById("task-input").value;
    input.trim();
    if(input === "") {
        alert("Please enter something");
    } else if (taskList.includes(input)) {
        alert("The task already exists");
    } else {
        taskList.push(input);
        localStorage.setItem("tasks", JSON.stringify(taskList));
        location.reload();
    }
    document.getElementById("task-input").value = "";
};

let closeButton = document.getElementsByTagName("li");
for(let i = 0; i < closeButton.length; i++) {
    let span = document.createElement("span");
    let txt = document.createTextNode("\u00D7");
    let input = document.createElement("input");
    input.setAttribute("type", "checkbox");
    input.id = "checkbox";
    span.className = "close";
    span.appendChild(txt);
    span.id = "span-" + i;
    closeButton[i].appendChild(span);
    closeButton[i].appendChild(input);
}

let popUpIndex;

let deleteButton = document.getElementsByClassName("close");
for(let i = 0; i < deleteButton.length; i++) {
    deleteButton[i].onclick = function() {
        const popUpBox = document.getElementById("delete-pop-up-box");
        popUpIndex = i;
        popUpBox.style.display = "flex";
    }
}

function displayNone() {
    const popUpBox = document.getElementById("delete-pop-up-box");
    popUpBox.style.display = "none";
}

function deleteYes() {
    let div = document.getElementsByClassName("task-items");
    div.innerHTML;
    const list = [];
    for(let i = 0;i < taskList.length; i++) {
        if(i !== popUpIndex) {
            list.push(taskList[i])
        }
    }
    localStorage.setItem("tasks", JSON.stringify(list));
    location.reload();
}

let clearAllButton = document.getElementById("delete-btn");
clearAllButton.addEventListener("click", function() {
    localStorage.clear()
    location.reload()
});