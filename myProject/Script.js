const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const errorMsg = document.getElementById("errorMsg");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Load on refresh
renderTasks();

// Add task event
addBtn.addEventListener("click", addTask);

// ================= FUNCTIONS =================

function addTask() {
  const text = taskInput.value.trim();

  if (text === "") {
    errorMsg.classList.remove("hidden");
    return;
  }

  errorMsg.classList.add("hidden");

  tasks.push({
    name: text,
    completed: false
  });

  save();
  renderTasks();
  taskInput.value = "";
}

function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className =
      "flex justify-between items-center bg-gray-100 px-4 py-2 rounded-lg";

    li.innerHTML = `
      <div class="flex items-center gap-3 cursor-pointer task-toggle" data-index="${index}">
        <span class="w-5 h-5 border-2 rounded-full flex items-center justify-center
          ${task.completed ? "bg-orange-500 text-white" : ""}">
          ${task.completed ? "✓" : ""}
        </span>

        <span class="${task.completed ? "line-through text-gray-400" : ""}">
          ${task.name}
        </span>
      </div>

      <button class="delete-btn text-gray-400 hover:text-red-500" data-index="${index}">
        ✕
      </button>
    `;

    taskList.appendChild(li);
  });
}

// ================= EVENT DELEGATION =================

taskList.addEventListener("click", function (e) {
  // Toggle task
  if (e.target.closest(".task-toggle")) {
    const index = e.target.closest(".task-toggle").dataset.index;
    toggleTask(index);
  }

  // Delete task
  if (e.target.classList.contains("delete-btn")) {
    const index = e.target.dataset.index;
    deleteTask(index);
  }
});

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  save();
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  save();
  renderTasks();
}

function save() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}