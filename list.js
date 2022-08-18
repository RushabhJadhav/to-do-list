let taskList = [];
taskList = JSON.parse(localStorage.getItem("tasks"))
if(taskList == undefined) {
    taskList = [];
    let listContainer = document.getElementById("task-container");
    listContainer.style.display = "none";
}
// for(let i = 0; i < taskList.length; i++) {
//     let listItem = document.createElement("li");
//     listItem.id = "task-items";
//     listItem.style.userSelect = "none"
//     let text = document.createTextNode(taskList[i]);
//     listItem.appendChild(text);
//     document.getElementById("task-container").appendChild(listItem);
// }
for(let i = 0; i < taskList.length; i++) {
    let listItem = document.createElement("li");
    listItem.className = "task-items";
    listItem.id = "list-" + i;
    // listItem.style.userSelect = "none";
    let text = document.createTextNode(taskList[i]);
    listItem.appendChild(text);
    document.getElementById("task-container").appendChild(listItem);
}

let button = document.getElementById("btn");
button.onclick = function() {
    let input = document.getElementById("task-input").value;
    input.trim();
    if(input === "") {
        alert("Enter something please");
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
    span.className = "close";
    span.appendChild(txt);
    span.id = "span-" + i;
    closeButton[i].appendChild(span);
}

let popUpIndex;

let deleteButton = document.getElementsByClassName("close");
for(let i = 0; i < deleteButton.length; i++) {
    deleteButton[i].onclick = function() {
        const popUpBox = document.getElementById("delete-pop-up-box");
        // popUpBox.id = "pop-up-" + i;
        popUpIndex = i;
        popUpBox.style.display = "flex";
    }
}

function displayNone() {
    const popUpBox = document.getElementById("delete-pop-up-box");
    popUpBox.style.display = "none";
}

function deleteYes() {
    // let div = document.getElementById("task-items");
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