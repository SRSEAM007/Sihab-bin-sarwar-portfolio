const fs = require("node:fs");

const userAgent = process.env.npm_config_user_agent || "";

for (const file of ["package-lock.json", "yarn.lock"]) {
  fs.rmSync(file, { force: true });
}

if (!userAgent.startsWith("pnpm/")) {
  console.error("Use pnpm to install dependencies: pnpm install");
  process.exit(1);
}