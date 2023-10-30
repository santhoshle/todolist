const listTasks = () => {
    let tasks = [];
    if(localStorage.getItem("tasks"))
        tasks = JSON.parse(localStorage.getItem("tasks"));
    let taskListEle = document.getElementById("tasklist");
    taskListEle.innerHTML = '';
    tasks.forEach((task, index) => {
        taskListEle.appendChild(formTask(task.name, task.checked, index));
    })
}

const formTask = (taskName, isChecked = false, index) => {
    let newTaskElement = document.createElement('div');
    newTaskElement.id = index;
    
    let checkBox = document.createElement("input");
    checkBox.type = 'checkbox';
    checkBox.id ="checkbox"+index;
    checkBox.checked = isChecked;
    checkBox.addEventListener('change', function handleClick(event) {
        markTask(event);
    });
    newTaskElement.appendChild(checkBox);
    
    let spanEle = document.createElement("span");
    spanEle.id = `span${index}`;
    spanEle.innerText= taskName;
    if(isChecked)
        spanEle.classList.add('done');
    newTaskElement.appendChild(spanEle);

    let buttonEle = document.createElement("button");
    buttonEle.id = 'button'+index;
    buttonEle.classList.add('input');
    buttonEle.innerText = 'Delete';
    buttonEle.addEventListener('click', function handleClick(event) {
        deleteTask(event);
    });
    newTaskElement.appendChild(buttonEle);
    return newTaskElement;
}

const deleteTask = (event) => {
    let buttonId = event.target.id;
    buttonId = buttonId.replace("button", "");
    let taskEle = document.getElementById(`span${buttonId}`);
    let taskname = taskEle.innerText;
    let tasks = [];
    if(localStorage.getItem("tasks"))
        tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks = tasks.filter((task) => task.name !== taskname);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    listTasks();
}

const markTask = (event) => {
    let checkId = event.target.id;
    checkId = checkId.replace("checkbox", "");
    let taskEle = document.getElementById(`span${checkId}`);
    let taskname = taskEle.innerText;
    let tasks = [];
    if(localStorage.getItem("tasks"))
        tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks.forEach((task) => {
        if(task.name === taskname)
            task.checked = !task.checked;
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    listTasks();
}

const addTask = () => {
    let newTask = document.getElementById('newTask').value;
    if(newTask.trim().length > 0)
    {
        let index = 0;
        let tasks = [];
        if(localStorage.getItem("tasks"))
            tasks = JSON.parse(localStorage.getItem("tasks"));
        index = tasks.length;
        tasks.push({ name: newTask, checked: false});
        localStorage.setItem("tasks", JSON.stringify(tasks));

        let taskListEle = document.getElementById("tasklist");
        taskListEle.appendChild(formTask(newTask, false, index));
    }
    document.getElementById('newTask').value = '';
}

listTasks();