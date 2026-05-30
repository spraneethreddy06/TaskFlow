
/* AUTH CHECK */
const token = localStorage.getItem("token");

if (!token) {
  window.location.href = "index.html";
}

/* ELEMENTS */
const taskForm = document.getElementById("taskForm");
const taskList = document.getElementById("taskList");

const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const pendingTasks = document.getElementById("pendingTasks");

const logoutBtn = document.getElementById("logoutBtn");

/* LOAD TASKS FROM LOCAL STORAGE */
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

/* SAVE TASKS */
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

/* LOGOUT */
logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("token");
  window.location.href = "index.html";
});

/* ADD TASK */
taskForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;

  const newTask = {
    id: Date.now(),
    title,
    description,
    status: "Pending",
  };

  tasks.push(newTask);

  saveTasks();
  renderTasks();

  taskForm.reset();
});

/* COMPLETE TASK */
function completeTask(id) {
  tasks = tasks.map((task) =>
    task.id === id ? { ...task, status: "Completed" } : task
  );

  saveTasks();
  renderTasks();
}

/* DELETE TASK */
function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);

  saveTasks();
  renderTasks();
}

/* RENDER TASKS */
function renderTasks() {
  taskList.innerHTML = "";

  totalTasks.innerText = tasks.length;

  completedTasks.innerText = tasks.filter(
    (t) => t.status === "Completed"
  ).length;

  pendingTasks.innerText = tasks.filter(
    (t) => t.status !== "Completed"
  ).length;

  tasks.forEach((task) => {
    const div = document.createElement("div");
    div.classList.add("task-card");

    div.innerHTML = `
      <h3>${task.title}</h3>
      <p>${task.description || "No Description"}</p>

      <span class="status ${
        task.status === "Completed" ? "completed" : "pending"
      }">
        ${task.status}
      </span>

      <div class="task-actions">
        <button onclick="completeTask(${task.id})">Complete</button>
        <button onclick="deleteTask(${task.id})">Delete</button>
      </div>
    `;

    taskList.appendChild(div);
  });
}

/* SIDEBAR NAVIGATION */
const navItems = document.querySelectorAll(".nav-item");
const sections = document.querySelectorAll(".section");

navItems.forEach((item) => {
  item.addEventListener("click", () => {
    navItems.forEach((n) => n.classList.remove("active"));

    sections.forEach((s) => (s.style.display = "none"));

    item.classList.add("active");

    const target = document.getElementById(item.dataset.section);

    if (target) {
      target.style.display = "block";
    }
  });
});

/* INIT */
renderTasks();

/* SHOW DASHBOARD FIRST */
document.getElementById("dashboardSection").style.display = "block";
document.getElementById("tasksSection").style.display = "none";