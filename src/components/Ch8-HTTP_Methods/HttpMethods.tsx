// fetch call usinng URL and apiKey parameters
// in header Get method
// use cros as mode
// add X-API-KEY in header

// 1. Take URL and data as parameters
// 2. call fetch 
// 2.1 use Post method (Create)
// 2.2 use cros as mode
// 2.3 add X-API-KEY in header, with apiKey parameter
// 2.4 add Content-Type application/json in header as its value
// 2.5 add body as JSON.stringify(data)
// 3. return response as json

// status code practice
// 1. use example like find a user by id
// 2. if user found return 200 with user data
// 3. if user not found return 404 with message user not found
// 4. if server error return 500 with message server error

// PUT request to update user data
// since it is update, it should be able to send requests safely multiple times
// 1. use PUT request to update user data, content-type application/json
// 1.1 retrieve that with GET request, use apiKey in both requests
// both return a promise that resolves to the response body
// use fullURL for url built with baseURL and id.

// DELETE request to delete user by id



