import { StatusCodes } from "http-status-codes";

const url = import.meta.env.VITE_SERVER_ORIGIN;

export function login({ email, password }) {
  return fetch(url + "/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => res.json())
    .then((json) => {
      if (json.statusCode === StatusCodes.OK && json.token) {
        localStorage.setItem("time_tracker:token", json.token);
      }
      return json;
    });
}

export function register({ email, password }) {
  return fakeFetch(
    [{ message: "account created" }],
    [{ message: "Email already in use" }]
  )
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return { success: false, message: error };
    });
}

export function requestPasswordChange({ email }) {
  return fakeFetch(
    [{ message: "email has been sent" }],
    [{ message: "No account with this email exists" }]
  )
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return { success: false, message: error };
    });
}

function fakeFetch(pass, fail) {
  return new Promise((resolve, reject) => {
    setInterval(() => {
      if (Math.random() >= 0.5) {
        resolve({
          success: true,
          ...pass[Math.floor(Math.random() * pass.length)],
        });
      } else {
        resolve({
          success: false,
          ...fail[Math.floor(Math.random() * fail.length)],
        });
      }
    }, Math.floor(Math.random() * 1000) + 1);
  });
}
