document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registerForm");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    // fake user storage
    localStorage.setItem("user", JSON.stringify({ name, email }));

    alert("Registration successful");

    window.location.href = "index.html";
  });
});