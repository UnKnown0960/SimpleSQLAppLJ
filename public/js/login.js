
var loginForm = document.getElementById("loginForm");
var loginEmail = document.getElementById("loginEmail");
var loginPassword = document.getElementById("loginPassword");
var loginError = document.getElementById("loginErr");


loginForm.addEventListener("submit", async function (evt) {
    evt.preventDefault();
    loginErr.hidden = true;

    var payload = {
        email: loginEmail.value.trim(),
        password: loginPassword.value,
    };

    var response = await fetch("/api/login", {
        method: "POST",
        headers: {"Content-type": "application/json" },
        body: JSON.stringify(payload),
    });

    var bodyText = await response.text();

    if (!response.ok) {
    try {
        var bad = JSON.parse(bodyText);
        loginErr.textContent = bad.error || "Login failed.";
    } catch (ignored) {
        loginErr.textContent = "Login failed.";
    }
    loginErr.hidden = false;
    return;
    }   

 var user = JSON.parse(bodyText);
 setLoggedInUser(user);
 window.location.href = "/explore.html";
});
