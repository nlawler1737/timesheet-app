/**
 * @type {{projects: Project[], entries: Entry[]}}
 */
export const mockData = {
  projects: [
    {
      name: "project_1",
      id: 1,
    },
    {
      name: "project_2",
      id: 2,
    },
    {
      name: "project_3",
      id: 3,
    },
    {
      name: "project_4",
      id: 4,
    },
    {
      name: "project_5",
      id: 5,
    },
  ],
  entries: [
    {
      start: "2022-01-01T00:00:00.000Z",
      end: "2022-01-01T01:00:00.000Z",
      project: "Project 1",
      summary: "Summary 1",
    },
    {
      start: "2022-01-01T01:00:00.000Z",
      end: "2022-01-01T02:00:00.000Z",
      project: "Project 1",
      summary: "Summary 2",
    },
    {
      start: "2022-01-01T02:00:00.000Z",
      end: "2022-01-01T03:00:00.000Z",
      project: "Project 1",
      summary: "Summary 3",
    },
    {
      start: "2022-01-01T03:00:00.000Z",
      end: "2022-01-01T04:00:00.000Z",
      project: "Project 1",
      summary: "Summary 4",
    },
  ],
};

/**
 *
 * @param {any[]} pass
 * @param {any[]} fail
 * @returns {Promise<any>}
 */
export function fakeFetch(pass, fail = []) {
  return new Promise((resolve, reject) => {
    setInterval(() => {
      if (!fail.length || Math.random() >= 0.5) {
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
