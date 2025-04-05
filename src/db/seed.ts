import "dotenv/config";

import { eq } from "drizzle-orm";

import { auth } from "../lib/auth.js";

import { db } from "./index.js";
import { user } from "./schema.js";

async function main() {
	const adminUser = await auth.api.signUpEmail({
		body: {
			email: "admin@kolm.start",
			name: "Admin",
			password: "password1234",
		},
	});

	await db
		.update(user)
		.set({ role: "admin" })
		.where(eq(user.id, adminUser.user.id));
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
