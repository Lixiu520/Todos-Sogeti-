class Todo {
    constructor(title, description,status) {
      this.title = title;
      this.description = description;
      this.status = status; 
    }
   
    toggleCompleted() {
      this.status = !this.status;
    }
  
  }


const  todos = JSON.parse(localStorage.getItem('todos')) ;//pour recuperer les donné sur localstorage
console.log(todos);
const todo1 = new Todo("How to use the application TODOS","click the plus to add a new task, once the task is created, it goes to the top of the todo list. ",false)
const todo2 = new Todo("If the task is marked as completed","When the task is completed, it will be crossed and moved to the bottom of the list.",false);

const  detail = document.querySelector(".detail");

function displayDetails(){
    if(detail){
        detail.innerHTML = "";
       
            if (window.location.hash) {
                // get the fragment identifier
                var fragment = window.location.hash.substring(1); // remove the leading #
                //le window.location.hash montre pas celui de deux taches que j'ai initialisé, j'ai du le faire endure
                if(fragment === "How%20to%20use%20the%20application%20TODOS"){
                    const item =` 
                  
                    <label for="title">Title * : </label>
                    <label id="title">How to use the application TODOS</label>
                    <label for="description">Description : </label>	
                    <label id ="description"> click the plus to add a new task, once the task is created, it goes to the top of the todo list.</label>
                    <label > Status : Going to do
                     </label>   
                    
                  `;
                    detail.innerHTML = item;

                } else if (fragment === "If%20the%20task%20is%20marked%20as%20completed"){
                    const item =` 
                  
                    <label for="title">Title * : </label>
                    <label id="title">${todo2.title}</label>	 
                    
                    <label for="description">Description : </label>	
                    <label id ="description"> ${todo2.description}</label>
                    <label > Status :
                      ${todo2.status? 'Done': 'Going to do'}</label>   
                    
                  `;
                    detail.innerHTML = item;
                }
                // mais les autres que j'ai ajouté à partir de formulaire, ils affichent bien dans le page detail 
                for(var i = 0; i<todos.length; i++){
                    console.log("looping through todos");
                // do something with the fragment identifier
                if (fragment === todos[i].title) {
                  // do something specific for the "i" fragment identifier
                    console.log(todos[0]);
                    console.log(todos[todos.length-1]);
                  console.log(todos[i]);
                  const item =` 
                  
                    <label for="title">Title * : </label>
                    <label id="title" >${todos[i].title}</label>	 
                    
                    <label for="description">Description : </label>	
                    <label id ="description" > ${todos[i].description}</label>
                    <label > Status :
                      ${todos[i].status? 'Done': 'Going to do'}</label>   
                    
                  `;
                    detail.innerHTML = item;
                }
        }
    }

}
}
displayDetails();
