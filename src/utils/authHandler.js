import { fakeFetch } from "./mock";

/**
 * Logs in a user, saves token in local storage
 * @param {{email: string, password: string}} param0
 * @returns {Promise<{success: boolean, message: string}>}
 */
export function login({ email, password }) {
  return fakeFetch(
    [{ message: "user logged in" }],
    [
      { message: "Email or password are incorrect" },
      { message: "No account with this email was found" },
    ]
  )
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return { success: false, message: error };
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
