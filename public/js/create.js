
var creatForm = document.getElementById("createForm"); // "Add a user" <form>
var formErr = document.getElementById("formErr"); // Message under form if POST failed
var nameInput = document.getElementById("name");
var emailInput = document.getElementById("email");
var passwordInput = document.getElementById("password");
var rankInput = document.getElementById("rank");

/**
 * Escape text so putting it inside HTML strings does not become real tags/scripts.
 * Example: if someone's name contained "<script>", we'd turn it into safe text in the page source.
 */
function escapeHtml(text) {
  text = String(text);
  text = text.replace(/&/g, "&amp;");
  text = text.replace(/</g, "&lt;");
  text = text.replace(/>/g, "&gt;");
  text = text.replace(/"/g, "&quot;");
  return text;
}

async function saveRow(saveButton) {
  var td = saveButton.parentElement;
  var tr = td.parentElement;
  var nameBox = tr.querySelector(".row-name");
  var emailBox = tr.querySelector(".row-email");
  var passwordBox = tr.querySelector(".row-password");
  var rankBox = tr.querySelector(".row-rank");
  var id = saveButton.getAttribute("data-id");

  var payload = {
    name: nameBox.value.trim(),
    email: emailBox.value.trim(),
    password: passwordBox.value.trim(),
    rank: rankBox.value.trim(),
  };

  var response = await fetch("/api/users/" + id, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload), // Turns the object into ONE string matching application/json
  });

  if (response.ok) {
    await loadUsers(); // Repaint so "Saved at" matches what the DB stored
    return;
  }
}