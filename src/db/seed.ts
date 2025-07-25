import "dotenv/config";

import { auth } from "../lib/auth.js";

async function main() {
  await auth.api.signUpEmail({
    body: {
      email: "admin@kolm.start",
      name: "Admin",
      password: "password1234",
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    console.log("Done seeding admin user.");
    process.exit(0);
  });
