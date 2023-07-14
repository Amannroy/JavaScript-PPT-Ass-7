const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');
    const editModal = document.getElementById('edit-modal');
    const editForm = document.getElementById('edit-form');
    const editText = document.getElementById('edit-text');

    let editingTodoId = '';

    todoForm.addEventListener('submit', e => {
      e.preventDefault();

      const todoText = todoInput.value.trim();

      if (todoText !== '') {
        addTodoItem(todoText);
        todoInput.value = '';
        todoInput.focus();
      }
    });

    todoList.addEventListener('click', e => {
      const target = e.target;

      if (target.classList.contains('todo-status')) {
        const todoItem = target.closest('.todo-item');
        todoItem.classList.toggle('completed');
      }

      if (target.classList.contains('todo-edit')) {
        const todoItem = target.closest('.todo-item');
        const todoText = todoItem.querySelector('.todo-text').textContent;
        editingTodoId = todoItem.dataset.todoId;
        editText.value = todoText;
        openEditModal();
      }

      if (target.classList.contains('todo-delete')) {
        const todoItem = target.closest('.todo-item');
        todoItem.remove();
      }
    });

    editForm.addEventListener('submit', e => {
      e.preventDefault();

      const updatedText = editText.value.trim();

      if (updatedText !== '') {
        updateTodoItem(editingTodoId, updatedText);
        closeEditModal();
      }
    });

    function addTodoItem(text) {
      const todoItem = document.createElement('li');
      const todoId = generateTodoId();
      todoItem.dataset.todoId = todoId;
      todoItem.classList.add('todo-item');

      const todoText = document.createElement('p');
      todoText.classList.add('todo-text');
      todoText.textContent = text;

      const todoDelete = document.createElement('button');
      todoDelete.classList.add('todo-delete');
      todoDelete.textContent = 'Delete';

      const todoStatus = document.createElement('button');
      todoStatus.classList.add('todo-status');
      todoStatus.textContent = 'Update Status';

      const todoEdit = document.createElement('button');
      todoEdit.classList.add('todo-edit');
      todoEdit.textContent = 'Edit';

      todoItem.appendChild(todoText);
      todoItem.appendChild(todoDelete);
      todoItem.appendChild(todoStatus);
      todoItem.appendChild(todoEdit);
      todoList.appendChild(todoItem);
    }

    function updateTodoItem(todoId, updatedText) {
      const todoItem = todoList.querySelector(`[data-todo-id="${todoId}"]`);
      const todoText = todoItem.querySelector('.todo-text');
      todoText.textContent = updatedText;
    }

    function generateTodoId() {
      return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    function openEditModal() {
      editModal.style.display = 'block';
    }

    function closeEditModal() {
      editModal.style.display = 'none';
    }

    window.addEventListener('click', e => {
      if (e.target === editModal) {
        closeEditModal();
      }
    });

    const modalClose = editModal.querySelector('.modal-close');
    modalClose.addEventListener('click', closeEditModal);