import { fakeFetch, mockData } from "./mock";

/**
 * @typedef {{id: number, name: string}} Project
 * @typedef {{id: string, start: string, end: string, project: string, summary: string}} Entry
 */

/**
 * Get all entries
 * @returns {Promise<{success: boolean, message: string, data: Entry[]}>}
 */
export function getEntries() {
  return fakeFetch([
    { message: "successfully fetched entries", data: mockData.entries },
    { message: "successfully fetched entries", data: [] },
  ])
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return { success: false, message: error };
    });
}

/**
 * Get all projects
 * @returns {Promise<{success: boolean, message: string, data: Project[]}>}
 */
export function getProjects() {
  return fakeFetch([
    { message: "successfully fetched projects", data: mockData.projects },
  ])
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return { success: false, message: error };
    });
}

/**
 * Add entry
 * @param {Entry} entry
 * @returns {Promise<{success: boolean, message: string}>}
 */
export function createEntry(entry) {
  return fakeFetch([
    { message: "successfully added entry" },
    { message: "successfully added entry" },
  ])
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return { success: false, message: error };
    });
}

/**
 * Sends new project to server for creation
 * @param {{name: string}} project
 * @returns {Promise<{success: boolean, message: string}>}
 */
export function createProject(project) {
  return fakeFetch([{ message: "successfully created project" }])
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return { success: false, message: error };
    });
}
