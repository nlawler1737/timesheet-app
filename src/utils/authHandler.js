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
