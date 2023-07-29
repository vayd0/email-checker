const MailChecker = require("mailchecker");
const fs = require("fs");
require("colors");

console.log("Si vous n'avez aucune réponse pensez à remplir emails.txt".yellow);
const emails = fs.readFileSync("./emails.txt", "utf-8").split("\n");

emails.forEach((data) => {
  const res = MailChecker.isValid(data);
  if (res == false) return;
  console.warn("[ VALIDE ] ".green + data);
});