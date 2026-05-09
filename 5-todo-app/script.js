let tasks = [];

window.onload = function () {
    let saved = localStorage.getItem("myTasks");
    if (saved) {
        tasks = JSON.parse(saved);
        renderTasks();
    }
};

function renderTasks() {
    let list = document.getElementById("todoList");
    let counter = document.getElementById("statusCounter");
    list.innerHTML = "";

    let doneCount = 0;

    for (let i = 0; i < tasks.length; i++) {
        let item = tasks[i];
        if (item.completed) doneCount++;

        let li = document.createElement("li");

        let checkIcon = "";
        if (item.completed) {
            checkIcon = '<i class="fa-solid fa-circle-check check-i"></i>';
            li.className = "done";
        } else {
            checkIcon = '<i class="fa-regular fa-circle check-i"></i>';
        }

        li.innerHTML = `
            <div onclick="toggleTask(${i})" style="flex:1">
                ${checkIcon}
                <span class="task-text">${item.text}</span>
            </div>
            <div class="action-btns">
                <button class="icon-btn edit-i" onclick="editTask(${i})">
                    <i class="fa-solid fa-pen-to-square"></i>
                </button>
                <button class="icon-btn del-i" onclick="deleteTask(event, ${i})">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        `;

        list.appendChild(li);
    }

    counter.innerHTML = doneCount + "/" + tasks.length + " completed";
}

function addBtnClick() {
    let input = document.getElementById("taskInput");
    let val = input.value;

    if (val === "") {
        alert("Please enter a task!");
        return;
    }

    tasks.push({
        text: val,
        completed: false
    });

    input.value = "";
    saveAndShow();
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    saveAndShow();
}

function editTask(index) {
    let oldText = tasks[index].text;
    let newText = prompt("Edit your task:", oldText);

    if (newText !== null && newText !== "") {
        tasks[index].text = newText;
        saveAndShow();
    }
}

function deleteTask(event, index) {
    event.stopPropagation();
    tasks.splice(index, 1);
    saveAndShow();
}

function saveAndShow() {
    localStorage.setItem("myTasks", JSON.stringify(tasks));
    renderTasks();
}
