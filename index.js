
// Tout d'abord, je cree une class Todo représente un todo : avec sont titre, description et status(dans la constructeur)
class Todo {
    constructor(title, description,status) {
      this.title = title;
      this.description = description;
      this.status = status; 
    }
  
  }
//  L'événement DOMContentLoaded se produit lorsque le document HTML initial a été complètement chargé et analysé
//  Le code qui suit sera exécuté uniquement lorsque cet événement se produit
  document.addEventListener("DOMContentLoaded", function(){
    // pour collecter les infos puis les stocker dans localstorage
  const form = document.querySelector('form');
  const todoList = document.querySelector(".todoList");
 
  let todos = JSON.parse(localStorage.getItem('todos')) ;
  if(!todos){
    todos = [];
    const todo1 = new Todo("How to use the application TODOS","click the plus to add a new task, once the task is created, it goes to the top of the todo list. ",false)
    const todo2 = new Todo("If the task is marked as completed","When the task is completed, it will be crossed and moved to the bottom of the list.",false);
    todos.push(todo1);
    todos.push(todo2);
    localStorage.setItem('todos', JSON.stringify(todos));
} 

 
  console.log(todos)
// pour recuperer les infos à partir d'un formulaire: create
  form.addEventListener('submit', function(event) {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const status = document.getElementById('status').checked;
    const todo = new Todo(title, description, status);
    
    todos.push(todo);

 localStorage.setItem('todos', JSON.stringify(todos));
    
    displayTodoList();

    window.location.href = window.location.href;

    form.reset();
   
  });

 
// pour afficher la list de todos

function displayTodoList(){
    if (todoList) {
        todos.sort(function(a, b) {
            return b.status - a.status || b.index - a.index;
            // pour que les taches effectué soient restés bas de la list  
        });
        for(var i = todos.length-1; i>=0; i--){
          // pour afficher le nouveau tache en haut de la list
            const item = `
               <li class="seperation " id="${todos[i].title}">
                
                     <div class="container containerRow">    
                     <a href="detail.html#${todos[i].title}" class="alink" data-title = "${todos[i].title}">  
                         <input type="checkbox" name="validation" ${todos[i].status ? 'checked':''}>
                         <label class="flexItem2 todoTitle"for="validation">${todos[i].title}</label>	
                     </a>   
                         <img class="flexItem3 delete" src="img/delete.png" alt="Delete" >
                     </div>   
                            
               </li>
            `;
            todoList.innerHTML += item;
        };
    }
 }
displayTodoList();
// modifier le statut de tache afin de lui faire descendre en bas de la list
todoList.addEventListener('change', (event) => {
  const listItem = event.target.closest('li');
    const listItemId = listItem.id;
    todos.forEach((todo, index) =>{
        if (todo.title === listItemId){
            todo.status = event.target.checked;
            localStorage.setItem('todos', JSON.stringify(todos));
        }
  if (event.target.checked) {  
    todoList.appendChild(listItem);
  } else {
    todoList.insertBefore(listItem, todoList.firstChild);
  }
});
})

// pour supprimer les taches qu'on ne veux pas afficher au lieu d'utiliser toujours localStorage.clear();
  const removeTodos = document.querySelectorAll('.delete');
 removeTodos.forEach(item => {
        item.addEventListener('click', (event) => {
            const listItem = event.target.closest('li');
            const todoId = listItem.id;
            for(var i = 0; i<todos.length;i++){
                if(todos[i].title === todoId){
                    todos.splice(i, 1);
                    localStorage.setItem('todos',JSON.stringify(todos)); 
                    listItem.remove();
                }
            }
        })
});
  
localStorage.clear();

  });
