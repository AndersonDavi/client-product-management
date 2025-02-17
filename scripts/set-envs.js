const { writeFileSync, mkdirSync } = require("fs");
require("dotenv").config();

const targetPath = "./src/environments/environments.ts";

const envFileContent = `export const environment = {
  CLIENT_URL: '${process.env["CLIENT_URL"]}',
  API_URL: '${process.env["API_URL"]}',
};`;

mkdirSync("./src/environments", { recursive: true });
writeFileSync(targetPath, envFileContent);
