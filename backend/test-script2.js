async function test() {
  try {
    const res = await fetch('http://localhost:5000/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: "Test"
        // missing email and password
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
}

test();
