/**
 * auth.js - remember who is logged in (localStorage) and protect pages.
 */

var STOREAGE_KEY = "simplesql_logged_in_user";

function setLoggedInUser(user) {
  localStorage.setItem(STOREAGE_KEY, JSON.stringify(user));
}

function getLoggedInUser() {
    var raw = localStorage.getItem(STOREAGE_KEY);
    if (!raw) { 
        return null; 
    }
    try {
        return JSON.parse(raw);
    } catch (ignored) {
        return null;
    }
}

/** Clear login (logout) */
function clearLoggedInUser() {
    localStorage.removeItem(STOREAGE_KEY);
}

function requireLogin() {
    if (!getLoggedInUser()) {
        window.location.href = "/index.html";
    }
}

function redirectIfALreadyLoggedIn() {
    if (getLoggedInUser()) {
        window.location.href = "/index.html";
    }
}
