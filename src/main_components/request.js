import Cookies from 'js-cookie';

const tokenName = "token";
const isLoggedInCookieName = "isLoggedIn";

export function getIsLoggedIn() {
  return Cookies.get(isLoggedInCookieName);
}

export function getToken() {
  const token = localStorage.getItem(tokenName);
  if (token === "undefined" || token === "null" || token === "") {
    return null;
  }
  return JSON.parse(token);
}

export function setIsLoggedIn(value) {
  Cookies.set(isLoggedInCookieName, value);
}

export function removeIsLoggedIn() {
  Cookies.remove(isLoggedInCookieName);
}

export async function login(username, password) {
    const response = await fetch('/api/login/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
        setIsLoggedIn('true');
    }

    return response;
}

export async function createUserAndSendPassword() {
    const response = await fetch('/api/create_user_and_send_password/');
    const data = await response.json();

    if (response.ok) {
        alert('User created and password sent');
    }

    return { response, data };
}

function checkStatus(response) {
  if (response.status === 401) {
    // Remove isLoggedIn cookie as server is rejecting it
    removeIsLoggedIn();
    alert("User not authenticated");
    window.location = "/login";
  }

  if (response.status >= 200 && response.status < 300) {
    return response.json();
  }

  if (response.status < 404) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

export async function request(url, options) {
  const response = await fetch(url, options);
  return checkStatus(response);
}

export function buildBackUrl() {
  let base = window.location.hostname.split(".");
  if (base.includes("localhost")) {
    base = ["localhost:8008"];
  } else {
    base.unshift("api");
  }
  base = `${window.location.protocol}//${base.join(".")}`;
  return base;
}

export function removeToken() {
  localStorage.removeItem(tokenName);
}

export async function requestForm(
  url,
  verb,
  formData
) {

  let options = {
    method: verb,
    mode: "cors",
    cache: "no-cache",
    body: formData,
    headers: {
      "Authorization": `Bearer ${getToken()}`,
    }
  };

  const baseUrl = buildBackUrl();
  url = url instanceof URL ? url : baseUrl + url;
  const response = await fetch(url, options);
  const content = await checkStatus(response);
  return content;
}