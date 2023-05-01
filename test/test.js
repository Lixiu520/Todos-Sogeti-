// class Todo {
//   constructor(title, description,status) {
//     this.title = title;
//     this.description = description;
//     this.status = status; 
//   }

// }

import { strictEqual } from 'assert';
import Todo from './todo';

describe('Todo', function() {
  it('should create a new Todo object', function() {
    const todo = new Todo('Example Title', 'Example Description', false);
    strictEqual(todo.title, 'Example Title');
    strictEqual(todo.description, 'Example Description');
    strictEqual(todo.status, false);
  });
});
  
  test('form submission', () => {
    document.body.innerHTML = `
      <form>
        <input type="text" id="title" value="Example Title" />
        <textarea id="description">Example Description</textarea>
        <input type="checkbox" id="status" />
        <button type="submit">Submit</button>
      </form>
    `;
  
    const form = document.querySelector('form');
    const titleInput = document.getElementById('title');
    const descriptionInput = document.getElementById('description');
    const statusInput = document.getElementById('status');
  
    titleInput.value = 'New Title';
    descriptionInput.value = 'New Description';
    statusInput.checked = true;
  
    form.dispatchEvent(new Event('submit'));
  
    const storedTodos = JSON.parse(localStorage.getItem('todos'));
    const createdTodo = storedTodos[storedTodos.length - 1];
  
    expect(createdTodo.title).toBe('New Title');
    expect(createdTodo.description).toBe('New Description');
    expect(createdTodo.status).toBe(true);
  });

  test('delete todo', () => {
    const storedTodos = [
      new Todo('Todo 1', 'Description 1', false),
      new Todo('Todo 2', 'Description 2', false),
    ];
    localStorage.setItem('todos', JSON.stringify(storedTodos));
  
    document.body.innerHTML = `
      <ul class="todoList">
        <li id="Todo 1"><button class="delete"></button></li>
        <li id="Todo 2"><button class="delete"></button></li>
      </ul>
    `;
  
    const deleteButtons = document.querySelectorAll('.delete');
    deleteButtons[0].dispatchEvent(new Event('click'));
  
    const updatedTodos = JSON.parse(localStorage.getItem('todos'));
  
    expect(updatedTodos.length).toBe(1);
    expect(updatedTodos[0].title).toBe('Todo 2');
  });