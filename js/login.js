document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    // fake login token
    localStorage.setItem("token", "taskflow-demo-token");

    alert("Login successful");

    window.location.href = "dashboard.html";
  });
});