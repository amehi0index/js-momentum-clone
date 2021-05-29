//Selectors
const todoInput = document.querySelector('.todo-input'),
 todoBtn = document.querySelector('.todo-btn'),
 todoList = document.querySelector('.todo-list'),
 todoCardContainer = document.querySelector('.todo-card-container'),
 todoCardToggle = document.querySelector('.todo-card-toggle'),
 todoCardCenter = document.querySelector('.todo-card-center'),
 todoBtnCenter = document.querySelector('.todo-btn-center'),
 todoListContainer = document.querySelector('.todo-container'),
 todoForm = document.querySelector('.todo-form')

document.addEventListener('DOMContentLoaded', getLocalTodos)
todoBtn.addEventListener('click', addTodo)
todoList.addEventListener('click', deleteCheck) 
todoList.addEventListener('click', showCheck) 
todoBtnCenter.addEventListener('click', showInput)
todoCardToggle.addEventListener('click', showTodoCard)

container.addEventListener('click', (event) => {
        
    const withinTodoCard = event.composedPath().includes(todoCardContainer)
    const withinTodoToggle = event.composedPath().includes(todoCardToggle)
    
    if(withinTodoCard){
        todoCardContainer.classList.add('todo-card-container-show')
    }
    else if(withinTodoToggle){
        todoCardToggle.classList.toggle('todo-card-container-show')
    }
    else{
        todoCardContainer.classList.remove('todo-card-container-show')
    }
})

function showTodoCard (){
    todoCardContainer.classList.toggle('todo-card-container-show')
    todoInput.focus()
}

function showInput(){
    todoCardCenter.classList.add('todo-card-center-hide')
    todoListContainer.classList.add('todo-container-show')
    todoCardContainer.classList.add('todo-card-container-height')
    todoForm.classList.add('todo-form-show')
    todoInput.focus()
}

function hideInput(){
    todoCardCenter.classList.remove('todo-card-center-hide')
    todoList.classList.remove('todo-list-show')
    todoForm.classList.remove('todo-form-show')
}

function showCheck (event){
    const item = event.target
  
    if(item.classList[0]=== 'complete-btn'){
        item.classList.toggle('complete-btn-show')
    }
}

function addTodo(event){
    event.preventDefault()

    const todoDiv = document.createElement('div')
    todoDiv.classList.add('todo-div')

    const newTodo = document.createElement('li')
    newTodo.innerText = todoInput.value  
    newTodo.classList.add('todo-item')
    todoDiv.appendChild(newTodo)

    saveTodos(todoInput.value)

    const completeBtn = document.createElement('button')
    completeBtn.innerHTML= `<i class="fas fa-check"></i>`
    completeBtn.classList.add('complete-btn')
    todoDiv.appendChild(completeBtn)

    const deleteBtn = document.createElement('button')
    deleteBtn.innerHTML= `<i class="fas fa-trash"></i>`
    deleteBtn.classList.add('delete-btn')
    todoDiv.appendChild(deleteBtn)

    todoList.appendChild(todoDiv)

    todoInput.value =""
}

function deleteCheck(event){
    const item = event.target

    if(item.classList[0] === 'delete-btn'){
        const todo = item.parentElement  
        removeLocalTodos(todo) 
        todo.remove() //delete li parent from ui
    }
    if(item.classList[0]=== 'complete-btn'){
        const todo = item.parentElement
        todo.classList.toggle('completed')  
    }
    todoInput.focus()
}

function saveTodos(todo){
    let todos

    if(localStorage.getItem('todos') === null){
        todos = []
    }else{
        todos = JSON.parse(localStorage.getItem('todos')) 
    }

    todos.push(todo) 
    localStorage.setItem('todos', JSON.stringify(todos))  
}

function getLocalTodos(){
    let todos

    if(localStorage.getItem('todos') === null){
        todos = []
    }else{
        todos = JSON.parse(localStorage.getItem('todos'))  
        if(todos.length > 0){
            showInput()
        }
    }

    todos.forEach(todo=>{
        const todoDiv = document.createElement('div')
        todoDiv.classList.add('todo-div')

        const newTodo = document.createElement('li')
        newTodo.innerText = todo 
        newTodo.classList.add('todo-item')
        todoDiv.appendChild(newTodo)

        const completeBtn = document.createElement('button')
        completeBtn.innerHTML= `<i class="fas fa-check"></i>`
        completeBtn.classList.add('complete-btn')
        todoDiv.appendChild(completeBtn)

        const deleteBtn = document.createElement('button')
        deleteBtn.innerHTML= `<i class="fas fa-trash"></i>`
        deleteBtn.classList.add('delete-btn')
        todoDiv.appendChild(deleteBtn)

        todoList.appendChild(todoDiv)
    })
}

function removeLocalTodos(todo){
    let todos

    if(localStorage.getItem('todos') === null){
        todos = []
    }else{
        todos = JSON.parse(localStorage.getItem('todos')) 
    }

    const todoIndex = todo.children[0].innerText
    const itemToFilter = todos.indexOf(todoIndex)

    todos.splice(itemToFilter, 1)

    localStorage.setItem('todos', JSON.stringify(todos))
}