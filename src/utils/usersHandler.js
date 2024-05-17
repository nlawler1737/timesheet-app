import { fakeFetch, mockData } from "./mock";

/**
 * @typedef {{id: number, name: string, email: string}} User
 */

/**
 * 
 * @returns {Promise<{success: boolean, message: string, data: User[]}>}
 */
export function getUsers() {
  return fakeFetch([
    { message: "successfully retrieved users", data: mockData.users },
  ])
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return { success: false, message: error };
    });
}

/**
 * 
 * @param {{name: string, email: string}} param0
 * @returns {Promise<{success: boolean, message: string}>}
 */
export function createUser({ name, email }) {
  return fakeFetch([{ message: "successfully created user" }])
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return { success: false, message: error };
    });
}

export function deleteUser(userId) {
  return fakeFetch([{ message: "successfully deleted user" }])
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return { success: false, message: error };
    });
}