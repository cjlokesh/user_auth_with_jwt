/* Login button press */
const loginButton = document.querySelector("#loginButton");
const showPassword = document.querySelector("#showPwdChkbox");

loginButton.addEventListener("click", async (event) => {
  event.preventDefault();
  const username = document.querySelector("#username").value;
  const password = document.querySelector("#password").value;
  try {
    const res = await fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    console.log(data);
    if (data.token === undefined) {
      throw new Error(data.message);
    }
    alert(`login successful JWT token: ${data.token}`);
  } catch (error) {
    alert(`Error: ${error.message}`);
  }
});

showPassword.addEventListener("click", async (event) => {
  let dataType = document.querySelector("#password").type;
  if (dataType === "password") {
    document.querySelector("#password").type = "text";
  } else {
    document.querySelector("#password").type = "password";
  }
});
