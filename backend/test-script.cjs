const axios = require('axios');

async function test() {
  try {
    const res = await axios.post('http://localhost:5000/api/users', {
      name: "Test",
      email: "test@example.com",
      password: "password123"
    });
    console.log("Register:", res.status);
  } catch (error) {
    console.error("Register Error:", error.response ? error.response.status : error.message);
    if(error.response) console.error(error.response.data);
  }
  
  try {
    const res = await axios.post('http://localhost:5000/api/users/login', {
      email: "admin@example.com",
      password: "password"
    });
    console.log("Login:", res.status);
  } catch (error) {
    console.error("Login Error:", error.response ? error.response.status : error.message);
    if(error.response) console.error(error.response.data);
  }
}

test();
