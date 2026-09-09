const userAgent = process.env.npm_config_user_agent ?? "";

if (userAgent && !userAgent.startsWith("npm/")) {
  console.error("Use npm for Revision Bee: run `npm install` and `npm run dev`.");
  process.exit(1);
}
