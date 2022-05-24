//selectors
const todoList = document.querySelector('.todo-list');
const newTaskText = document.querySelector('.new-task-text');
const addTodoTask = document.querySelector('.add-task');
const tabs = document.querySelector('#tabs');
const allTasksButton = document.querySelector('#all-tasks'); 
const doneButton = document.querySelector('#done'); 
const notDoneButton = document.querySelector('#not-done'); 
const clearAllButton = document.querySelector('#clear-all');
const pending = document.querySelector('#pending');

//event listeners
addTodoTask.addEventListener('click', addTask);
todoList.addEventListener('click', (e) => {
    deleteTask(e);
    checkTask(e);
    const taskTextDiv = e.target.childNodes[0];
    if(taskTextDiv){
        window.alert( taskText.nodeValue + " was chosen");
    } else{
        window.alert( "Empty task was chosen");
    }
});
tabs.addEventListener('click', handleTabs);
clearAllButton.addEventListener('click', clearAll);

calculatePending();

function addTask (e){
    // prevents refreshing of the page
    e.preventDefault(); 
    // create task div
    const taskDiv = document.createElement('div');
    taskDiv.classList.add('task');
    taskDiv.setAttribute('done', 'no');
    // add checkbox to task
    const check = document.createElement('button');
    check.classList.add('checkbox');
    check.innerHTML = '<i class="fa-solid fa-square"></i>';
    taskDiv.appendChild(check);
    // add task's text
    const todoTask = document.createElement('div');
    todoTask.classList.add('todo-text');
    todoTask.innerText = newTaskText.value;
    taskDiv.appendChild(todoTask);
    // add delete button
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-btn');
    deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
    taskDiv.appendChild(deleteButton);
    // add the todo div to the list
    todoList.appendChild(taskDiv);
    // erases text input
    newTaskText.value = "";
    calculatePending();
}

function checkTask(e){
    // function that contains the logic of checking tasks
    const checkbox = e.target;
    const task = checkbox.parentElement.parentElement;
    
    if (checkbox.classList[1] === 'fa-square' || checkbox.classList[1] === 'fa-square-check'){
        if (task.getAttribute('done') === 'no'){
            checkbox.parentElement.innerHTML = '<i class="fa-solid fa-square-check"></i>';
            task.style.color = "grey";
            task.style.textDecoration = "line-through";
            task.setAttribute("done", "yes");
        } else if (task.getAttribute('done') === 'yes'){
            checkbox.parentElement.innerHTML = '<i class="fa-solid fa-square"></i>';;
            task.style.color = "#FFF";
            task.style.textDecoration = "none";
            task.setAttribute("done", "no");
        }
        calculatePending();
    }
}

function deleteTask (e){
    // function that deletes a task
    const task = e.target.parentElement;
    if (task.classList[0] === "delete-btn"){
        task.parentElement.remove();
    }
    calculatePending();
}

function handleTabs(e){
    const button = e.target.id;
    const tasks = todoList.childNodes;
    switch(button){
        case 'all-tasks':
            notDoneButton.style.opacity = '0.5';
            allTasksButton.style.opacity ='1';
            doneButton.style.opacity = '0.5';
            tasks.forEach(task => {
                task.style.display = 'flex';
            });
            break;
        case 'done':
            notDoneButton.style.opacity = '0.5';
            allTasksButton.style.opacity ='0.5';
            doneButton.style.opacity = '1';
            tasks.forEach(task => {
                if (task.getAttribute('done') === 'yes'){
                    task.style.display = 'flex';
                } else {
                    task.style.display = 'none';
                }
            });
            break;
        case 'not-done':
            notDoneButton.style.opacity = '1';
            allTasksButton.style.opacity ='0.5';
            doneButton.style.opacity = '0.5';
            tasks.forEach(task => {
                if (task.getAttribute('done') === 'no'){
                    task.style.display = 'flex';
                } else {
                    task.style.display = 'none';
                }
            });
            break;
    }
}

function calculatePending (){
    // function that calculates how many pending tasks there are
    const tasks = todoList.childNodes;
    const total = tasks.length;
    let numberOfPending = 0;
    tasks.forEach( task => {
        if(task.getAttribute('done') === 'no'){
            numberOfPending++;
        }
    })
    pending.innerText = "There are " + numberOfPending + "/" + total + " pending tasks";

}

function clearAll (){
    // function that clears all the tasks
    while (todoList.hasChildNodes()){
        todoList.removeChild(todoList.lastChild);
    }
    calculatePending();
}