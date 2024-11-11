const BACKEND_URL = "http://localhost:8000/api/v1";

// //authentication
// const login = async (username, password) => {
//   try {
//     const response = await fetch(`${BACKEND_URL}/signin`, {
//       method: "POST",
//       body: JSON.stringify({username, password}),
//     });
//     if (!response) {
//     }
//     const res = await response.json();
//     return res;
//   } catch (error) {}
// };
// const signup = async (username, passowrd) => {
//   try {
//     const response = await fetch(`${BACKEND_URL}/signin`, {
//       method: "POST",
//         body: JSON.stringify({username, password}),
//     });
//     if (!response) {
//     }
//     const res = await response.json();
//     return res;
//   } catch (error) {}
// };

// const getAvatars = async () => {
//   try {
//     const response = await fetch(`${BACKEND_URL}/users/get-avatars`);
//     if (!response) {
//     }
//     const res = await response.json();
//     return res;
//   } catch (error) {}
// };

// //space API Endpoints

// const createSpace = async (data, token) => {
//   try {
//     const response = await fetch(`${BACKEND_URL}/spaces`, {
//       method: "POST",
//         body: JSON.stringify(data),
//       headers: {
//         authorization: `Bearer ${token}`,
//       },
//     });
//     if (!response) {
//     }
//     const res = await response.json();
//     return res;
//   } catch (error) {}
// };
// const deleteSpace = async (spaceId, token) => {
//   try {
//     const response = await fetch(`${BACKEND_URL}/spaces/${spaceId}`, {
//       method: "DELETE",
//       headers: {
//         authorization: `Bearer ${token}`,
//       },
//     });
//     if (!response) {
//     }
//     const res = await response.jsonj();
//     return res;
//   } catch (error) {}
// };
// const getAllSpaces = async (token) => {
//   try {
//     const response = await fetch(`${BACKEND_URL}/spaces/get-existing-spaces`, {
//       method: "GET",
//       headers: {
//         authorization: `Bearer ${token}`,
//       },
//     });
//     if (!response) {
//     }
//     const res = await response.json();
//     return res;
//   } catch (error) {}
// };

// //arena API Endpoints

// const getSpace = async (spaceId) => {
//   try {
//     const response = await fetch(`${BACKEND_URL}/spaces/${spaceId}`, {
//       method: "GET",
//         headers: {
//             authorization: `Bearer ${token}`,

//         }
//     });
//     if (!response) {
//     }
//     const res = await response.json();
//     return res;
//   } catch (error) {}
// };
// const addElementInSpace = async (element) => {
//   try {
//     const response = await fetch(`${BACKEND_URL}/spaces/element`, {
//       method: "POST",
//       body: JSON.stringify(element),
//       headers: {
//         authorization: `Bearer ${token}`,
//       },
//     });
//     if (!response) {
//     }
//     const res = await response.json();
//     return res;
//   } catch (error) {}
// };
// const deleteElementFromSpace = async (element) => {
//   try {
//     const response = await fetch(`${BACKEND_URL}/spaces/element`, {
//       method: "DELETE",
//       body: JSON.stringify(element),
//       headers: {
//         authorization: `Bearer ${token}`,
//       },
//     });
//     if (!response) {
//     }
//     const res = await response.json();
//     return res;
//   } catch (error) {}
// };
// const getAllElements = async (token) => {
//   try {
//     const response = await fetch(`${BACKEND_URL}/get-all-elements`, {
//         method: "GET",
//         headers: {
//             "authorization": `Bearer ${token}`
//         }
//     });
//     if (!response) {
//     }
//     const res = await response.json();
//     return res;
//   } catch (error) {}
// };

// //admin API Endpoints

// const createElement = async (data,token) => {
//   try {
//     const response = await fetch(`${BACKEND_URL}/admin/element`, {
//       method: "POST",
//       body: JSON.stringify(data),
//       headers: {
//         authorization: `Bearer ${token}`,
//       },
//     });
//     if (!response) {
//     }
//     const res = await response.json();
//     return res;
//   } catch (error) {}
// };
// const updateElement = async (data,elementId) => {
//   try {
//     const response = await fetch(`${BACKEND_URL}/admin/element/${elementId}`, {
//       method: "PUT",
//       body: JSON.stringify(data),
//       headers: {
//         authorization: `Bearer ${token}`,
//       },
//     });
//     if (!response) {
//     }
//     const res = await response.json();
//     return res;
//   } catch (error) {}
// };
// const createAvatar = async (data) => {
//   try {
//     const response = await fetch(`${BACKEND_URL}/admin/avatar`, {
//       method: "POST",
//       body: JSON.stringify(data),
//       headers: {
//         authorization: `Bearer ${token}`,
//       },
//     });
//     if (!response) {
//     }
//     const res = await response.json();
//     return res;
//   } catch (error) {}
// };
// const createMap = async (data) => {
//   try {
//     const response = await fetch(`${BACKEND_URL}/admin/map`, {
//       method: "POST",
//       body: JSON.stringify(data),
//       headers: {
//         authorization: `Bearer ${token}`,
//       },
//     });
//     if (!response) {
//     }
//     const res = await response.json();
//     return res;
//   } catch (error) {}
// };

// Authentication
const login = async (...args) => {
  try {
    const response = await fetch(...args);
    const res = await response.json();
    return { statusCode: response.status, data: res };
  } catch (error) {
    return { statusCode: 500, message: error.message };
  }
};

const signup = async (...args) => {
  try {
    const response = await fetch(...args);
    const res = await response.json();
    return { statusCode: response.status, data: res };
  } catch (error) {
    return { statusCode: 500, message: error.message };
  }
};

// User
const getAvatars = async () => {
  try {
    const response = await fetch(`${BACKEND_URL}/users/get-avatars`);
    const res = await response.json();
    return { statusCode: response.status, data: res };
  } catch (error) {
    return { statusCode: 500, message: error.message };
  }
};

// Spaces API
const createSpace = async (...args) => {
  try {
    const response = await fetch(...args);
    const res = await response.json();
    return { statusCode: response.status, data: res };
  } catch (error) {
    return { statusCode: 500, message: error.message };
  }
};

const deleteSpace = async (spaceId, token) => {
  try {
    const response = await fetch(`${BACKEND_URL}/spaces/space/${spaceId}`, {
      method: "DELETE",
      headers: { "authorization": `Bearer ${token}` },
    });
    const res = await response.json();
    return { statusCode: response.status, data: res };
  } catch (error) {
    return { statusCode: 500, message: error.message };
  }
};

const getAllSpaces = async (token) => {
  try {
    const response = await fetch(`${BACKEND_URL}/spaces/get-existing-spaces`, {
      method: "GET",
      headers: { "authorization": `Bearer ${token}` },
    });
    const res = await response.json();
    return { statusCode: response.status, data: res };
  } catch (error) {
    return { statusCode: 500, message: error.message };
  }
};

// Arena API
const getSpace = async (spaceId, token) => {
  try {
    const response = await fetch(`${BACKEND_URL}/spaces/space/${spaceId}`, {
      method: "GET",
      headers: { "authorization": `Bearer ${token}` },
    });
    const res = await response.json();
    return { statusCode: response.status, data: res };
  } catch (error) {
    return { statusCode: 500, message: error.message };
  }
};

const addElementInSpace = async (element, token) => {
  try {
    const response = await fetch(`${BACKEND_URL}/spaces/element`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(element),
    });
    const res = await response.json();
    return { statusCode: response.status, data: res };
  } catch (error) {
    return { statusCode: 500, message: error.message };
  }
};

const deleteElementFromSpace = async (element, token) => {
  try {
    const response = await fetch(`${BACKEND_URL}/spaces/element`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(element),
    });
    const res = await response.json();
    return { statusCode: response.status, data: res };
  } catch (error) {
    return { statusCode: 500, message: error.message };
  }
};

const getAllElements = async (token) => {
  try {
    const response = await fetch(`${BACKEND_URL}/get-all-elements`, {
      method: "GET",
      headers: { "authorization": `Bearer ${token}` },
    });
    const res = await response.json();
    return { statusCode: response.status, data: res };
  } catch (error) {
    return { statusCode: 500, message: error.message };
  }
};

// Admin API
const createElement = async (...args) => {
  try {
    const response = await fetch(...args);
    const res = await response.json();
    return { statusCode: response.status, data: res };
  } catch (error) {
    return { statusCode: 500, message: error.message };
  }
};

const updateElement = async (data, elementId, token) => {
  try {
    const response = await fetch(`${BACKEND_URL}/admin/element/${elementId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    const res = await response.json();
    return { statusCode: response.status, data: res };
  } catch (error) {
    return { statusCode: 500, message: error.message };
  }
};

const createAvatar = async (...args) => {
  try {
    const response = await fetch(...args);
    const res = await response.json();
    return { statusCode: response.status, data: res };
  } catch (error) {
    return { statusCode: 500, message: error.message };
  }
};

const createMap = async (...args) => {
  try {
    const response = await fetch(...args);
    const res = await response.json();
    return { statusCode: response.status, data: res };
  } catch (error) {
    return { statusCodes: 500, message: error.message };
  }
};

const updateMetaData = async (...args) => {
  try {
    const response = await fetch(...args);
    const res = await response.json();
    return { statusCode: response.status, data: res };
  } catch (error) {
    return { statusCode: 500, message: error.message };
  }
};
module.exports = {
  updateMetaData,
  createElement,
  createMap,
  createSpace,
  createAvatar,
  getAllElements,
  getAllSpaces,
  getAvatars,
  getSpace,
  deleteElementFromSpace,
  deleteSpace,
  login,
  signup,
  updateElement,
  addElementInSpace,
}
