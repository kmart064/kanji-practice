const ngrok = require("ngrok");
const fs = require("fs");
const path = require("path");
const qrcode = require("qrcode-terminal");
const crypto = require("crypto");

const SERVER_PORT = 3001;
const CLIENT_PORT = 3000;
const ENV_PATH = path.resolve(__dirname, "../client/.env");

function genCreds() {
  return {
    username: "u" + crypto.randomBytes(2).toString("hex"),
    password: crypto.randomBytes(8).toString("base64url"),
  };
}

(async () => {
  try {
    const serverCreds = genCreds();
    const clientCreds = genCreds();

    // Start ngrok tunnels
    const serverUrl = await ngrok.connect({
      addr: SERVER_PORT,
      auth: `${serverCreds.username}:${serverCreds.password}`,
    });

    const clientUrl = await ngrok.connect({
      addr: CLIENT_PORT,
      auth: `${clientCreds.username}:${clientCreds.password}`,
    });

    // Build embedded client URL for QR code
    const clientAuthUrl = clientUrl.replace(
      "https://",
      `https://${clientCreds.username}:${clientCreds.password}@`
    );

    // Write backend env vars to React .env
    const envContent = `REACT_APP_API_URL=${serverUrl}
REACT_APP_API_USER=${serverCreds.username}
REACT_APP_API_PASS=${serverCreds.password}
`;

    fs.writeFileSync(ENV_PATH, envContent);
    console.log(`Updated .env file at: ${ENV_PATH}`);

    // Output credentials
    console.log("\nngrok tunnels started:\n");

    console.log("Server (backend):");
    console.log(`   URL: ${serverUrl}`);
    console.log(`   Username: ${serverCreds.username}`);
    console.log(`   Password: ${serverCreds.password}\n`);

    console.log("Client (frontend):");
    console.log(`   URL: ${clientUrl}`);
    console.log(`   Username: ${clientCreds.username}`);
    console.log(`   Password: ${clientCreds.password}`);

    console.log("\nScan this QR code to open the frontend from your phone:\n");
    qrcode.generate(clientAuthUrl, { small: true });
  } catch (err) {
    console.error("Failed to start ngrok:", err);
  }
})();
