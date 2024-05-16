import { StatusCodes } from "http-status-codes";
import { fakeFetch } from "./mock";

const url = import.meta.env.VITE_SERVER_ORIGIN;

/**
 * Logs in a user, saves token in local storage
 * @param {{email: string, password: string}} param0
 * @returns {Promise<{success: boolean, message: string}>}
 */
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

/**
 * Registers a new user, saves token in local storage
 * @param {{email: string, password: string}} param0
 * @returns {Promise<{success: boolean, message: string}>}
 */
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

/**
 * Requests a password change
 * @param {{email: string}} param0
 * @returns {Promise<{success: boolean, message: string}>}
 */
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
