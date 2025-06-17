const database = require("../../../../../infra/database.js");

test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch(
    "https://potential-space-fiesta-75qgrvgwgvvcrxr7-3000.app.github.dev/api/v1/status",
  );
  console.log(response.status);
  expect(response.status).toBe(200);
});
