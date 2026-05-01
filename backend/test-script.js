async function test() {
  try {
    const res = await fetch('http://localhost:5000/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: "Test",
        email: "test5@example.com",
        password: "password123"
      })
    });
    console.log("Register:", res.status);
    if (!res.ok) {
      const text = await res.text();
      console.log("Register Body:", text);
    }
  } catch (error) {
    console.error("Register Error:", error.message);
  }
  
  try {
    const res = await fetch('http://localhost:5000/api/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: "admin@example.com",
        password: "password"
      })
    });
    console.log("Login:", res.status);
    if (!res.ok) {
      const text = await res.text();
      console.log("Login Body:", text);
    }
  } catch (error) {
    console.error("Login Error:", error.message);
  }
}

test();
