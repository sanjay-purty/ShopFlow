import bcrypt from 'bcryptjs';

async function test() {
  try {
    const res = await bcrypt.compare("password", "password");
    console.log("Result:", res);
  } catch (error) {
    console.error("Bcrypt Error:", error.message);
  }
}
test();
