const {
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
  updateMetaData,
} = require("./api");
const { WebSocket } = require("ws");
const BACKEND_URL = "http://localhost:8000/api/v1";
const WS_URL = "ws://localhost:8001";

// describe("Authentication", () => {
//   test("user is able to signup only once", async () => {
//     const username = `bibek-${Math.random()}`;
//     const password = "1234567";
// //     const response = await signup(`${BACKEND_URL}/users/signup`, {
// //       method: "POST",
// //       headers: { "Content-Type": "application/json" },
// //       body: JSON.stringify({ username, password, role: "Admin" }),
// //     });
// //     console.log(response);
// //     expect(response.statusCode).toBe(200);
// //     const checkReponse = await signup(`${BACKEND_URL}/users/signup`, {
// //       method: "POST",
// //       headers: { "Content-Type": "application/json" },
// //       body: JSON.stringify({ username, password }),
// //     });
// //     expect(checkReponse.statusCode).toBe(400);
// //   });

// //   test("signup reqest fails if the username is empty", async () => {
// //     const username = "bibek";
// //     const password = "123456";
// //     const response = await signup(`${BACKEND_URL}/users/signup`, {
// //       method: "POST",
// //       headers: { "Content-Type": "application/json" },
// //       body: JSON.stringify({ password }),
// //     });
// //     expect(response.statusCode).toBe(403);
// //   });

// //   test("signin succeeds if the username and password are correct", async () => {
// //     const username = "bibek-1234";
// //     const password = "1234567";
// //     const response = await login(`${BACKEND_URL}/users/signin`, {
// //       method: "POST",
// //       headers: { "Content-Type": "application/json" },
// //       body: JSON.stringify({ username, password }),
// //     });
// //     expect(response.statusCode).toBe(200);
// //     expect(response.data.token).toBeDefined();
// //   });

// //   test("signin fails if the username and password are incorrect", async () => {
// //     const username = "bibek-2131";
// //     const password = "1234567";

// //     const response = await login(`${BACKEND_URL}/users/signin`, {
// //       method: "POST",
// //       headers: {
// //         "Content-Type": "application/json",
// //       },
// //       body: JSON.stringify({ username, password }),
// //     });
// //     console.log(response);
// //     expect(response.statusCode).toBe(400);
// //     expect(response.data.message).toBe("User not found");
// //   });
// // });

// // describe("User metadata endpoint", () => {
// //   let token;
// //   let avatarId;
// //   beforeAll(async () => {
// //     const username = `bibek-${Math.random()}`;
// //     const password = "1234567";

// //     const signupResponse = await signup(`${BACKEND_URL}/users/signup`, {
// //       method: "POST",
// //       headers: {
// //         "Content-type": "application/json",
// //       },
// //       body: JSON.stringify({ username, password, role: "Admin" }),
// //     });

// //     const response = await login(`${BACKEND_URL}/users/signin`, {
// //       method: "POST",
// //       body: JSON.stringify({ username, password }),
// //       headers: {
// //         "Content-type": "application/json",
// //       },
// //     });
// //     token = response.data.token;
// //     console.log(token);
// //     const avatarResponse = await createAvatar(`${BACKEND_URL}/admin/avatar`, {
// //       method: "POST",
// //       headers: {
// //         "Content-Type": "application/json",
// //         authorization: `Bearer ${token}`,
// //       },
// //       body: JSON.stringify({
// //         imageUrl:
// //           "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm3RFDZM21teuCMFYx_AROjt-AzUwDBROFww&s",
// //         name: `hey-${Math.random()}`,
// //       }),
// //     });
// //     console.log("Avatar", avatarResponse);
// //     avatarId = avatarResponse.data.avatarId;
// //   });
// //   test("user cannot update their metadata with the wrong avatar id", async () => {
// //     const response = await updateMetaData(`${BACKEND_URL}/users/metadata`, {
// //       method: "POST",
// //       headers: {
// //         "Content-type": "application/json",
// //         authorization: `Bearer ${token}`,
// //       },
// //       body: JSON.stringify({ avatarId: "64b1f3f894d2fbdaf763f25a" }),
// //     });

// //     expect(response.statusCode).toBe(400);
// //     expect(response.data.message).toBe("Avatar not found");
// //   });

// //   test("user can update their metadata with the right avatar id", async () => {
// //     console.log("this is avatar Id", avatarId);
// //     const response = await updateMetaData(`${BACKEND_URL}/users/metadata`, {
// //       method: "POST",
// //       body: JSON.stringify({ avatarId }),
// //       headers: {
// //         "Content-type": "application/json",
// //         authorization: `Bearer ${token}`,
// //       },
// //     });
// //     console.log(response);
// //     expect(response.statusCode).toBe(200);
// //   });

// //   test("User is not able to update their metadata if the auth header is not present", async () => {
// //     const response = await updateMetaData(`${BACKEND_URL}/users/metadata`, {
// //       method: "POST",
// //       headers: {
// //         "Content-type": "application/json",
// //       },
// //       body: JSON.stringify({ avatarId }),
// //     });
// //     console.log(response);
// //     expect(response.statusCode).toBe(403);
// //   });
// // });

// describe("User avatar information", () => {
//   let avatarId;
//   let userId;
//   let token;
//   beforeAll(async () => {
//     const username = `bibek-${Math.random()}`;
//     const password = "1234567";

//     const signupResponse = await signup(`${BACKEND_URL}/users/signup`, {
//       method: "POST",
//       headers: {
//         "Content-type": "application/json",
//       },
//       body: JSON.stringify({ username, password, role: "Admin" }),
//     });
//     userId = signupResponse.data.userId;
//     const response = await login(`${BACKEND_URL}/users/signin`, {
//       method: "POST",
//       body: JSON.stringify({ username, password }),
//       headers: {
//         "Content-type": "application/json",
//       },
//     });
//     token = response.data.token;
//     console.log(token);
//     const avatarResponse = await createAvatar(`${BACKEND_URL}/admin/avatar`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({
//         imageUrl:
//           "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm3RFDZM21teuCMFYx_AROjt-AzUwDBROFww&s",
//         name: `hey-${Math.random()}`,
//       }),
//     });
//     avatarId = avatarResponse.data.avatarId;
//   });
//   // test("Get back avatar information for a user", async () => {

//   // });
//   test("Available avatars lists the recently created avatar", async () => {
//     const response = await getAvatars();
//     expect(response.data.avatars.length).not.toBe(0);
//      const currentAvatar = response.data.avatars.find(x => x._id == avatarId);
//     expect(currentAvatar).toBeDefined();
//   });
// });

// describe("Space Dashboard endpoints", () => {
//   let userId;
//   let userToken;
//   let adminId;
//   let adminToken;
//   let mapId;
//   let elementOneId;
//   let elementTwoId;

//   beforeAll(async () => {
//     const username = `bibek-${Math.random()}`;
//     const password = "1234567";

//     const signUpResponse = await signup(`${BACKEND_URL}/users/signup`, {
//       method: "POST",
//       headers: {
//         "Content-type": "application/json",
//       },
//       body: JSON.stringify({ username, password, role: "Admin" }),
//     });
//     adminId = signUpResponse.data.userId;

//     const adminLoginResonse = await login(`${BACKEND_URL}/users/signin`, {
//       method: "POST",
//       headers: {
//         "Content-type": "application/json",
//       },
//       body: JSON.stringify({ username, password }),
//     });

//     adminToken = adminLoginResonse.data.token;

//     const userSignUpResponse = await signup(`${BACKEND_URL}/users/signup`, {
//       method: "POST",
//       headers: {
//         "Content-type": "application/json",
//       },
//       body: JSON.stringify({ username: username + "-userhere", password }),
//     });
//     userId = userSignUpResponse.data.userId;

//     const userLoginToken = await login(`${BACKEND_URL}/users/signin`, {
//       method: "POST",
//       headers: {
//         "Content-type": "application/json",
//       },
//       body: JSON.stringify({ username: username + "-userhere", password }),
//     });
//     userToken = userLoginToken.data.token;
//     const elementOneResponse = await createElement(
//       `${BACKEND_URL}/admin/element`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           authorization: `Bearer ${adminToken}`,
//         },
//         body: JSON.stringify({
//           imageUrl:
//             "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRCRca3wAR4zjPPTzeIY9rSwbbqB6bB2hVkoTXN4eerXOIkJTG1GpZ9ZqSGYafQPToWy_JTcmV5RHXsAsWQC3tKnMlH_CsibsSZ5oJtbakq&usqp=CAE",
//           width: 1,
//           height: 1,
//           static: true,
//         }),
//       }
//     );

//     const elementTwoResponse = await createElement(
//       `${BACKEND_URL}/admin/element`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           authorization: `Bearer ${adminToken}`,
//         },
//         body: JSON.stringify({
//           imageUrl:
//             "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRCRca3wAR4zjPPTzeIY9rSwbbqB6bB2hVkoTXN4eerXOIkJTG1GpZ9ZqSGYafQPToWy_JTcmV5RHXsAsWQC3tKnMlH_CsibsSZ5oJtbakq&usqp=CAE",
//           width: 1,
//           height: 1,
//           static: true,
//         }),
//       }
//     );
//     elementOneId = elementOneResponse.data.id;
//     elementTwoId = elementTwoResponse.data.id;
//     const mapResponse = await createMap(`${BACKEND_URL}/admin/map`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         authorization: `Bearer ${adminToken}`,
//       },
//       body: JSON.stringify({
//         thumbnail: "https://thumbnail.com/a.png",
//         dimensions: "100x200",
//         name: "Test space",
//         defaultElements: [
//           {
//             elementId: elementOneId,
//             x: 20,
//             y: 20,
//           },
//           {
//             elementId: elementOneId,
//             x: 18,
//             y: 20,
//           },
//           {
//             elementId: elementTwoId,
//             x: 19,
//             y: 20,
//           },
//         ],
//       }),
//     });
//     mapId = mapResponse.data.id;
//   });

//   test("User is able to create space", async () => {
//     const response = await createSpace(`${BACKEND_URL}/spaces`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         authorization: `Bearer ${userToken}`,
//       },
//       body: JSON.stringify({ name: "Test", dimensions: "100x200", mapId }),
//     });
//     expect(response.statusCode).toBe(200);
//   });
//   test("User is able to create space without mapId (empty space)", async () => {
//     const response = await createSpace(`${BACKEND_URL}/spaces`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         authorization: `Bearer ${userToken}`,
//       },
//       body: JSON.stringify({ name: "Test", dimensions: "100x200" }),
//     });
//     expect(response.statusCode).toBe(200);
//   });
//   test("User is not able to create space without mapId and dimensions", async () => {
//     const response = await createSpace(`${BACKEND_URL}/spaces`, {
//       method: "POST",
//       headers: {
//         "Content-type": "application/json",
//         authorization: `Bearer ${userToken}`,
//       },
//       body: JSON.stringify({ name: "Hello" }),
//     });
//     expect(response.statusCode).toBe(403);
//   });
//   test("User is not able to delete a space that doesn't exist", async () => {
//     const response = await deleteSpace("64b1f3f894d2fbdaf763f25a", userToken);

//     expect(response.statusCode).toBe(400);
//     expect(response.data.message).toBe("Space not found");
//   });
//   test("User is able to delete a space that does exist", async () => {
//     const spaceResponse = await createSpace(`${BACKEND_URL}/spaces`, {
//       method: "POST",
//       headers: {
//         "Content-type": "application/json",
//         authorization: `Bearer ${userToken}`,
//       },
//       body: JSON.stringify({ name: "Office", dimensions: "100x200", mapId }),
//     });
//     const response = await deleteSpace(spaceResponse.data.spaceId, userToken);
//     expect(response.statusCode).toBe(200);
//   });
//   test("User should not be able to delete a space created by another user", async () => {
//     const spaceResponse = await createSpace(`${BACKEND_URL}/spaces`, {
//       method: "POST",
//       headers: {
//         "Content-type": "application/json",
//         authorization: `Bearer ${userToken}`,
//       },
//       body: JSON.stringify({ name: "Office", dimensions: "100x100", mapId }),
//     });
//     const response = await deleteSpace(spaceResponse.data.spaceId, adminToken);
//     expect(response.statusCode).toBe(403);

//     expect(response.data.message).toBe("Unauthorized, Unable to delete space");
//   });
//   test("Admin has no space initially", async () => {
//     const response = await getAllSpaces(adminToken);
//     expect(response.data.spaces.length).toBe(0);
//   });
//   test("Admin has one space after created", async () => {
//     const spaceResponse = await createSpace(`${BACKEND_URL}/spaces/`, {
//       method: "POST",
//       headers: {
//         "Content-type": "application/json",
//         authorization: `Bearer ${adminToken}`,
//       },
//       body: JSON.stringify({
//         name: "AdminSpace",
//         dimensions: "100x200",
//       }),
//     });
//     const spaces = await getAllSpaces(adminToken);
//     const filteredSpace = spaces.data.spaces.find(
//       (space) => space._id === spaceResponse.data.spaceId
//     );

//     expect(spaces.data.spaces.length).toBe(1);
//     expect(filteredSpace).toBeDefined();
//   });
// });

// describe("Arena endpoints", () => {
//   let userId;
//   let userToken;
//   let adminId;
//   let adminToken;
//   let spaceId;
//   let elementOneId;
//   let elementTwoId;
//   beforeAll(async () => {
//     const username = `bibek-${Math.random()}`;
//     const password = "1234567";

//     const signUpResponse = await signup(`${BACKEND_URL}/users/signup`, {
//       method: "POST",
//       headers: {
//         "Content-type": "application/json",
//       },
//       body: JSON.stringify({ username, password, role: "Admin" }),
//     });
//     console.log(signUpResponse);
//     adminId = signUpResponse.data.userId;

//     const adminLoginResonse = await login(`${BACKEND_URL}/users/signin`, {
//       method: "POST",
//       headers: {
//         "Content-type": "application/json",
//       },
//       body: JSON.stringify({ username, password }),
//     });
//     console.log(adminLoginResonse);

//     adminToken = adminLoginResonse.data.token;

//     const userSignUpResponse = await signup(`${BACKEND_URL}/users/signup`, {
//       method: "POST",
//       headers: {
//         "Content-type": "application/json",
//       },
//       body: JSON.stringify({ username: username + "-userhere", password }),
//     });
//     console.log(userSignUpResponse);

//     userId = userSignUpResponse.data.userId;

//     const userLoginToken = await login(`${BACKEND_URL}/users/signin`, {
//       method: "POST",
//       headers: {
//         "Content-type": "application/json",
//       },
//       body: JSON.stringify({ username: username + "-userhere", password }),
//     });

//     console.log(userLoginToken);
//     userToken = userLoginToken.data.token;
//     const elementOneResponse = await createElement(
//       `${BACKEND_URL}/admin/element`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           authorization: `Bearer ${adminToken}`,
//         },
//         body: JSON.stringify({
//           imageUrl:
//             "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRCRca3wAR4zjPPTzeIY9rSwbbqB6bB2hVkoTXN4eerXOIkJTG1GpZ9ZqSGYafQPToWy_JTcmV5RHXsAsWQC3tKnMlH_CsibsSZ5oJtbakq&usqp=CAE",
//           width: 1,
//           height: 1,
//           static: true,
//         }),
//       }
//     );

//     console.log(elementOneResponse);
//     const elementTwoResponse = await createElement(
//       `${BACKEND_URL}/admin/element`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           authorization: `Bearer ${adminToken}`,
//         },
//         body: JSON.stringify({
//           imageUrl:
//             "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRCRca3wAR4zjPPTzeIY9rSwbbqB6bB2hVkoTXN4eerXOIkJTG1GpZ9ZqSGYafQPToWy_JTcmV5RHXsAsWQC3tKnMlH_CsibsSZ5oJtbakq&usqp=CAE",
//           width: 1,
//           height: 1,
//           static: true,
//         }),
//       }
//     );

//     console.log(elementTwoResponse);
//     elementOneId = elementOneResponse.data.id;
//     elementTwoId = elementTwoResponse.data.id;

//     const mapResponse = await createMap(`${BACKEND_URL}/admin/map`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         authorization: `Bearer ${adminToken}`,
//       },
//       body: JSON.stringify({
//         thumbnail: "https://thumbnail.com/a.png",
//         dimensions: "100x200",
//         name: "Test space",
//         defaultElements: [
//           {
//             elementId: elementOneId,
//             x: 20,
//             y: 20,
//           },
//           {
//             elementId: elementOneId,
//             x: 18,
//             y: 20,
//           },
//           {
//             elementId: elementTwoId,
//             x: 19,
//             y: 20,
//           },
//         ],
//       }),
//     });

//     console.log(mapResponse);
//     mapId = mapResponse.data.id;
//     const spaceResponse = await createSpace(`${BACKEND_URL}/spaces/`, {
//       method: "POST",
//       headers: {
//         "Content-type": "application/json",
//         authorization: `Bearer ${userToken}`,
//       },
//       body: JSON.stringify({
//         name: "Hello World",
//         dimensions: "100x200",
//         mapId,
//       }),
//     });
//     console.log(spaceResponse);
//     spaceId = spaceResponse.data.spaceId;
//   });
//   test("Incorrect spaceId returns a 400", async () => {
//     const response = await getSpace("64b1f3f894d2fbdaf763f25a", userToken);
//     expect(response.statusCode).toBe(400);
//   });
//   test("Correct spaceId returns all the elements", async () => {
//     console.log("This is where get space", spaceId);
//     const response = await getSpace(spaceId, userToken);
//     console.log(response);
//     expect(response.data.dimensions).toBe("100x200");
//     expect(response.data.elements.length).toBe(3);
//   });
//   test("Delete endpoint is able to delete an element", async () => {
//     const response = await getSpace(spaceId, userToken);
//     const newResponse = await deleteElementFromSpace(
//       {
//         elementId: response.data.elements[0]._id,
//         spaceId: response.data._id,
//       },
//       userToken
//     );
//     console.log(newResponse);
//     expect(newResponse.statusCode).toBe(200);
//     const res = await getSpace(spaceId, userToken);
//     expect(res.data.elements.length).toBe(2);
//   });
//   test("Adding an element fails if the element lies outside the dimensions", async () => {
//     const response = await addElementInSpace(
//       {
//         elementId: elementOneId,
//         spaceId: spaceId,
//         x: "200",
//         y: "200",
//       },
//       userToken
//     );
//     expect(response.statusCode).toBe(400);
//     expect(response.data.message).toBe("Cannot add element outside boundary");
//   });
//   test("Adding an element works as expected", async () => {
//     const response = await addElementInSpace(
//       {
//         elementId: elementOneId,
//         spaceId: spaceId,
//         x: "50",
//         y: "60",
//       },
//       userToken
//     );
//     expect(response.statusCode).toBe(200);
//     const newResponse = await getSpace(spaceId, userToken);
//     expect(newResponse.data.elements.length).toBe(3);
//   });
// });

// describe("Admin endpoints", () => {
//   let userId;
//   let userToken;
//   let adminId;
//   let adminToken;
//   let elementId;
//   beforeAll(async () => {
//     const username = `bibek-${Math.random()}`;
//     const password = "1234567";

//     const signUpResponse = await signup(`${BACKEND_URL}/users/signup`, {
//       method: "POST",
//       headers: {
//         "Content-type": "application/json",
//       },
//       body: JSON.stringify({ username, password, role: "Admin" }),
//     });

//     adminId = signUpResponse.data.userId;

//     const adminLoginResonse = await login(`${BACKEND_URL}/users/signin`, {
//       method: "POST",
//       headers: {
//         "Content-type": "application/json",
//       },
//       body: JSON.stringify({ username, password }),
//     });

//     adminToken = adminLoginResonse.data.token;

//     const userSignUpResponse = await signup(`${BACKEND_URL}/users/signup`, {
//       method: "POST",
//       headers: {
//         "Content-type": "application/json",
//       },
//       body: JSON.stringify({ username: username + "-userhere", password }),
//     });

//     userId = userSignUpResponse.data.userId;

//     const userLoginToken = await login(`${BACKEND_URL}/users/signin`, {
//       method: "POST",
//       headers: {
//         "Content-type": "application/json",
//       },
//       body: JSON.stringify({ username: username + "-userhere", password }),
//     });

//     userToken = userLoginToken.data.token;
//     const elementResponse = await createElement(
//       `${BACKEND_URL}/admin/element`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           authorization: `Bearer ${adminToken}`,
//         },
//         body: JSON.stringify({
//           imageUrl:
//             "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRCRca3wAR4zjPPTzeIY9rSwbbqB6bB2hVkoTXN4eerXOIkJTG1GpZ9ZqSGYafQPToWy_JTcmV5RHXsAsWQC3tKnMlH_CsibsSZ5oJtbakq&usqp=CAE",
//           width: 1,
//           height: 1,
//           static: true,
//         }),
//       }
//     );
//     console.log(elementResponse);
//     elementId = elementResponse.data.id;
//   });
//   test("User is not able to hit admin Endpoints", async () => {
//     const elmentResponse = await createElement(`${BACKEND_URL}/admin/element`, {
//       method: "POST",
//       headers: {
//         "Content-type": "application/json",
//         authorization: `Bearer ${userToken}`,
//       },
//       body: JSON.stringify({
//         imageUrl:
//           "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRCRca3wAR4zjPPTzeIY9rSwbbqB6bB2hVkoTXN4eerXOIkJTG1GpZ9ZqSGYafQPToWy_JTcmV5RHXsAsWQC3tKnMlH_CsibsSZ5oJtbakq&usqp=CAE",
//         width: 1,
//         height: 1,
//         static: true,
//       }),
//     });
//     const updateElementResponse = await updateElement(
//       {
//         imageUrl:
//           "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRCRca3wAR4zjPPTzeIY9rSwbbqB6bB2hVkoTXN4eerXOIkJTG1GpZ9ZqSGYafQPToWy_JTcmV5RHXsAsWQC3tKnMlH_CsibsSZ5oJtbakq&usqp=CAE",
//       },
//       elementId,
//       userToken
//     );

//     const mapResponse = await createMap(`${BACKEND_URL}/admin/map`, {
//       method: "POST",
//       headers: {
//         "Content-type": "application/json",
//         authorization: `Bearer ${userToken}`,
//       },
//       body: JSON.stringify({
//         thumbnail: "https://thumbnail.com/a.png",
//         dimensions: "100x200",
//         name: "100 person interview room",
//         defaultElements: [],
//       }),
//     });

//     const avatarResponse = await createAvatar(`${BACKEND_URL}/admin/avatar`, {
//       method: "POST",
//       headers: {
//         "Content-type": "application/json",
//         authorization: `Bearer ${userToken}`,
//       },
//       body: JSON.stringify({
//         imageUrl:
//           "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm3RFDZM21teuCMFYx_AROjt-AzUwDBROFww&s",
//         name: `Timmy-${Math.random()}`,
//       }),
//     });

//     expect(elmentResponse.statusCode).toBe(403);
//     expect(updateElementResponse.statusCode).toBe(403);
//     expect(mapResponse.statusCode).toBe(403);
//     expect(avatarResponse.statusCode).toBe(403);
//   });
//   test("Admin is able to hit admin Endpoints", async () => {
//     const elmentResponse = await createElement(`${BACKEND_URL}/admin/element`, {
//       method: "POST",
//       headers: {
//         "Content-type": "application/json",
//         authorization: `Bearer ${adminToken}`,
//       },
//       body: JSON.stringify({
//         imageUrl:
//           "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRCRca3wAR4zjPPTzeIY9rSwbbqB6bB2hVkoTXN4eerXOIkJTG1GpZ9ZqSGYafQPToWy_JTcmV5RHXsAsWQC3tKnMlH_CsibsSZ5oJtbakq&usqp=CAE",
//         width: 1,
//         height: 1,
//         static: true,
//       }),
//     });

//     const mapResponse = await createMap(`${BACKEND_URL}/admin/map`, {
//       method: "POST",
//       headers: {
//         "Content-type": "application/json",
//         authorization: `Bearer ${adminToken}`,
//       },
//       body: JSON.stringify({
//         thumbnail: "https://thumbnail.com/a.png",
//         dimensions: "100x200",
//         name: "100 person interview room",
//         defaultElements: [],
//       }),
//     });

//     const avatarResponse = await createAvatar(`${BACKEND_URL}/admin/avatar`, {
//       method: "POST",
//       headers: {
//         "Content-type": "application/json",
//         authorization: `Bearer ${adminToken}`,
//       },
//       body: JSON.stringify({
//         imageUrl:
//           "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm3RFDZM21teuCMFYx_AROjt-AzUwDBROFww&s",
//         name: `Timmy-${Math.random()}`,
//       }),
//     });
//     expect(elmentResponse.statusCode).toBe(200);
//     expect(mapResponse.statusCode).toBe(200);
//     expect(avatarResponse.statusCode).toBe(200);
//   });

//   test("Admin is able to update the imageUrl for an element", async () => {
//     console.log(elementId);
//     const updateElementResponse = await updateElement(
//       {
//         imageUrl:
//           "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRCRca3wAR4zjPPTzeIY9rSwbbqB6bB2hVkoTXN4eerXOIkJTG1GpZ9ZqSGYafQPToWy_JTcmV5RHXsAsWQC3tKnMlH_CsibsSZ5oJtbakq&usqp=CAE",
//       },
//       elementId,
//       adminToken
//     );
//     console.log(updateElementResponse);
//     expect(updateElementResponse.statusCode).toBe(200);
//   });
// });

describe("Websocket endpoints", () => {
  let userToken;
  let userId;
  let adminToken;
  let adminId;
  let mapId;
  let elementOneId;
  let elementTwoId;
  let spaceId;
  let ws1;
  let ws2;
  let ws1Messages = [];
  let ws2Messages = [];
  let userX;
  let userY;
  let adminX;
  let adminY;

  function waitForAndPopLatestMessage(messageArray) {
    return new Promise((resolve) => {
      if (messageArray.length > 0) {
        resolve(messageArray.shift());
      } else {
        let interval = setInterval(() => {
          if (messageArray.length > 0) {
            resolve(messageArray.shift());
            clearInterval(interval);
          }
        }, 100);
      }
    });
  }

  async function setUpWebSockets() {
    ws1 = new WebSocket(WS_URL);
  
    ws1.onmessage = (event) => {
      ws1Messages.push(JSON.parse(event.data));
    };
    await new Promise((r) => {
      ws1.onopen = r;
    });

    ws2 = new WebSocket(WS_URL);
    ws2.onmessage = (event) => {
      ws2Messages.push(JSON.parse(event.data));
    };

    await new Promise((r) => {
      ws2.onopen = r;
    });
  }
  async function setUpHTTP() {
    const username = `bibek-${Math.random()}`;
    const password = "1234567";

    const signUpResponse = await signup(`${BACKEND_URL}/users/signup`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ username, password, role: "Admin" }),
    });
    adminId = signUpResponse.data.userId;

    const adminLoginResonse = await login(`${BACKEND_URL}/users/signin`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    adminToken = adminLoginResonse.data.token;

    const userSignUpResponse = await signup(`${BACKEND_URL}/users/signup`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ username: username + "-userhere", password }),
    });
    userId = userSignUpResponse.data.userId;

    const userLoginToken = await login(`${BACKEND_URL}/users/signin`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ username: username + "-userhere", password }),
    });
    userToken = userLoginToken.data.token;
    const elementOneResponse = await createElement(
      `${BACKEND_URL}/admin/element`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify({
          imageUrl:
            "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRCRca3wAR4zjPPTzeIY9rSwbbqB6bB2hVkoTXN4eerXOIkJTG1GpZ9ZqSGYafQPToWy_JTcmV5RHXsAsWQC3tKnMlH_CsibsSZ5oJtbakq&usqp=CAE",
          width: 1,
          height: 1,
          static: true,
        }),
      }
    );

    const elementTwoResponse = await createElement(
      `${BACKEND_URL}/admin/element`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify({
          imageUrl:
            "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRCRca3wAR4zjPPTzeIY9rSwbbqB6bB2hVkoTXN4eerXOIkJTG1GpZ9ZqSGYafQPToWy_JTcmV5RHXsAsWQC3tKnMlH_CsibsSZ5oJtbakq&usqp=CAE",
          width: 1,
          height: 1,
          static: true,
        }),
      }
    );
    elementOneId = elementOneResponse.data.id;
    elementTwoId = elementTwoResponse.data.id;
    const mapResponse = await createMap(`${BACKEND_URL}/admin/map`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${adminToken}`,
      },
      body: JSON.stringify({
        thumbnail: "https://thumbnail.com/a.png",
        dimensions: "100x200",
        name: "Test space",
        defaultElements: [
          {
            elementId: elementOneId,
            x: 20,
            y: 20,
          },
          {
            elementId: elementOneId,
            x: 18,
            y: 20,
          },
          {
            elementId: elementTwoId,
            x: 19,
            y: 20,
          },
        ],
      }),
    });
    mapId = mapResponse.data.id;

    const spaceResponse = await createSpace(`${BACKEND_URL}/spaces/`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify({
        name: "Hello World",
        dimensions: "100x200",
        mapId,
      }),
    });
    console.log(spaceResponse);
    spaceId = spaceResponse.data.spaceId;
  }
  beforeAll(async () => {
    await setUpHTTP();
    await setUpWebSockets();
  });
  test("Get back ack for joining the space", async () => {
    ws1.send(
      JSON.stringify({
        type: "join",
        payload: {
          userId: adminId,
          spaceId: spaceId,
          token: adminToken,
        },
      })
    );
    const message1 = await waitForAndPopLatestMessage(ws1Messages);
    ws2.send(
      JSON.stringify({
        type: "join",
        payload: {
          userId: userId,
          spaceId: spaceId,
          token: userToken,
        },
      })
    );

    const message2 = await waitForAndPopLatestMessage(ws2Messages);
    const message3 = await waitForAndPopLatestMessage(ws1Messages);

    expect(message1.type).toBe("space-joined");
    expect(message2.type).toBe("space-joined");
    expect(message1.payload.users.length).toBe(0);
    expect(message2.payload.users.length).toBe(1);
    expect(message3.type).toBe("user-joined");
    expect(message3.payload.x).toBe(message2.payload.spawn.x);
    expect(message3.payload.y).toBe(message2.payload.spawn.y);
    expect(message3.payload.userId).toBe(userId);

    adminX = message1.payload.spawn.x;
    adminY = message1.payload.spawn.y;

    userX = message2.payload.spawn.x;
    userY = message2.payload.spawn.y;
  });

  test("User should not be able to move across the boundary of the wall", async () => {
    ws1.send(
      JSON.stringify({
        type: "move",
        payload: {
          x: 1000000,
          y: 10000,
        },
      })
    );

    const message = await waitForAndPopLatestMessage(ws1Messages);
    expect(message.type).toBe("movement-rejected");
    expect(message.payload.x).toBe(adminX);
    expect(message.payload.y).toBe(adminY);
  });

  test("User should not be able to move two blocks at the same time", async () => {
    ws1.send(
      JSON.stringify({
        type: "move",
        payload: {
          x: adminX + 2,
          y: adminY,
        },
      })
    );

    const message = await waitForAndPopLatestMessage(ws1Messages);
    expect(message.type).toBe("movement-rejected");
    expect(message.payload.x).toBe(adminX);
    expect(message.payload.y).toBe(adminY);
  });

  test("Correct movement should be broadcasted to the other sockets in the room", async () => {
    ws1.send(
      JSON.stringify({
        type: "move",
        payload: {
          x: adminX + 1,
          y: adminY,
          userId: adminId,
        },
      })
    );

    const message = await waitForAndPopLatestMessage(ws2Messages);
    expect(message.type).toBe("movement");
    expect(message.payload.x).toBe(adminX + 1);
    expect(message.payload.y).toBe(adminY);
  });

  test("If a user leaves, the other user receives a leave event", async () => {
    ws1.close();
    const message = await waitForAndPopLatestMessage(ws2Messages);
    expect(message.type).toBe("user-left");
    expect(message.payload.userId).toBe(adminId);
  });
  afterAll(() => {
    if (ws1 && ws1.readyState === WebSocket.OPEN) {
      ws1.close();
    }
    if (ws2 && ws2.readyState === WebSocket.OPEN) {
      ws2.close();
    }
  })
});
