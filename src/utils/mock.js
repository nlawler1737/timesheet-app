/**
 * @type {{projects: Project[], entries: Entry[]}}
 */
export const mockData = {
  projects: [
    {
      id: 1,
      name: "project_1",
      totalTime: "10:00:00",
    },
    {
      id: 2,
      name: "project_2",
      totalTime: "24:00:00",
    },
    {
      id: 3,
      name: "project_3",
      totalTime: "30:23:00",
    },
    {
      id: 4,
      name: "project_4",
      totalTime: "40:03:00",
    },
    {
      id: 5,
      name: "project_5",
      totalTime: "30:56:00",
    },
  ],
  entries: [
    {
      id: 1,
      start: "2022-01-01T00:00:00.000Z",
      end: "2022-01-01T01:30:00.000Z",
      project: "Project 1",
      summary: "Summary 1",
    },
    {
      id: 2,
      start: "2022-01-01T01:00:00.000Z",
      end: "2022-01-01T02:30:00.000Z",
      project: "Project 1",
      summary: "Summary 2",
    },
    {
      id: 3,
      start: "2022-01-01T02:00:00.000Z",
      end: "2022-01-01T04:03:00.000Z",
      project: "Project 1",
      summary: "Summary 3",
    },
    {
      id: 4,
      start: "2022-01-01T03:00:00.000Z",
      end: "2022-01-01T07:24:00.000Z",
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
