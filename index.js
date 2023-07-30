const { validate } = require("email-validator");
const dns = require("dns");
const { promisify } = require("util");
const fs = require("fs");
require("colors");

const resolveMx = promisify(dns.resolveMx);

async function checkEmailExistence(email) {
  if (!email) {
    return false;
  }

  const isValid = validate(email.trim());
  if (isValid) {
    const domain = email.split("@")[1];
    if (!domain) return false;
    try {
      const mxRecords = await resolveMx(domain);
      const smtpServer = mxRecords[0].exchange;
      return true;
    } catch (error) {
      return false;
    }
  } else {
    return false;
  }
}

async function checkEmails(emailsToCheck) {
  for (const email of emailsToCheck) {
    const result = await checkEmailExistence(email.replace("\r", ""));

    if (result) return console.log("[ VALIDE ]".green, email);
  }
}

const emailsToCheck = fs.readFileSync("./emails.txt", "utf-8").split("\n");

checkEmails(emailsToCheck);
