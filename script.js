document.addEventListener('DOMContentLoaded', () => {
  const todoForm = document.querySelector('#todo-form');
  const taskInput = document.querySelector('#task-input');
  const dueDateInput = document.querySelector('#due-date');
  const emailInput = document.querySelector('#email');
  const passwordInput = document.querySelector('#password');
  const todoList = document.querySelector('#todo-list');
  const errorMessage = document.querySelector('#error-message');
  const toggleCompletedButton = document.querySelector('#toggle-completed');
  const taskImages = document.querySelectorAll('.task-image');
  
  let showCompleted = true;

  // Event listener to toggle visibility of completed tasks
  toggleCompletedButton.addEventListener('click', () => {
      showCompleted = !showCompleted;
      const tasks = todoList.querySelectorAll('li');
      tasks.forEach(task => {
          if (task.classList.contains('completed') && !showCompleted) {
              task.style.display = 'none';
          } else {
              task.style.display = 'block';
          }
      });
  });

  // Image hover effect for the gallery
  taskImages.forEach(image => {
      image.addEventListener('mouseover', () => {
          image.style.transform = 'scale(1.1)';
      });
      image.addEventListener('mouseout', () => {
          image.style.transform = 'scale(1)';
      });
  });

  // Event Listener for form submission (adding tasks)
  todoForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Validate required fields
      if (!taskInput.value.trim() || !dueDateInput.value.trim() || !emailInput.value.trim() || !passwordInput.value.trim()) {
          errorMessage.textContent = "Please fill out all fields.";
          return;
      }

      // Validate email format
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailPattern.test(emailInput.value)) {
          errorMessage.textContent = "Please enter a valid email address.";
          return;
      }

      // Validate password length
      if (passwordInput.value.length < 8) {
          errorMessage.textContent = "Password must be at least 8 characters.";
          return;
      }

      // Create a new task
      const newTask = document.createElement('li');
      newTask.innerHTML = `
          <span>${taskInput.value} (Due: ${dueDateInput.value})</span>
          <button class="delete-btn">Delete</button>
      `;

      // Add event listener to delete button
      newTask.querySelector('.delete-btn').addEventListener('click', () => {
          newTask.remove();
      });

      // Add keypress detection on task (mark as completed)
      newTask.querySelector('span').addEventListener('keypress', (e) => {
          if (e.key === 'Enter') {
              newTask.classList.add('completed');
              newTask.style.textDecoration = 'line-through';
          }
      });

      // Add long press or double click (secret action)
      let pressTimer;
      newTask.addEventListener('dblclick', () => {
          alert('Secret Double Click Action! 😲');
      });

      newTask.addEventListener('mousedown', () => {
          pressTimer = setTimeout(() => {
              alert('Secret Long Press Action! 🤫');
          }, 1000); // 1-second long press detection
      });

      newTask.addEventListener('mouseup', () => {
          clearTimeout(pressTimer);
      });

      // Append the new task to the list
      todoList.appendChild(newTask);

      // Clear the form inputs after adding the task
      taskInput.value = '';
      dueDateInput.value = '';
      emailInput.value = '';
      passwordInput.value = '';
      errorMessage.textContent = ''; // Clear error message
  });
});

