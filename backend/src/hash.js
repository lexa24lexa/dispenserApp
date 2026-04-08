const bcrypt = require("bcryptjs");

async function run() {
  const student = await bcrypt.hash("student123", 10);
  const teacher = await bcrypt.hash("teacher123", 10);

  console.log("Student hash:", student);
  console.log("Teacher hash:", teacher);
}

run();