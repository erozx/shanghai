import pkg from 'whatsapp-web.js';
const { Client, LocalAuth } = pkg;
import qrcode from 'qrcode-terminal';
import readline from 'readline';
import fs from 'fs/promises';
import chalk from 'chalk';

const CONTACT_LIST = './contact.txt';

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function logs(message, type = null) {
  switch (type) {
    case "info":
      message = `[INFO] ${message}\n`;
      break;
    case "ok":
      message = `[+] ${message}`;
      break;
    case "fail":
      message = `[!] ${message}`;
      break;
    case "loading":
      message = `[%] ${message}`;
      break;
  }
  const now = new Date();
  const timestamp = now.toISOString().replace(/T/, " ").replace(/\..+/, "");
  if (type != null) {
    if (type == "fail") {
      console.log(chalk.red(`[${timestamp}] ${message}`));
    } else {
        if(type == 'info'){
            console.log(chalk.blue(`\n[${timestamp}] ${message}`));
        } else if(type == 'loading'){
          console.log(chalk.yellow(`\n[${timestamp}] ${message}`));
        } else {
            console.log(chalk.green(`[${timestamp}] ${message}`));
        }
    }
  } else {
    console.log(chalk.white(`[${timestamp}] ${message}`));
  }
}

// Function to prompt user for input
function askQuestion(query) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) =>
    rl.question(query, (ans) => {
      rl.close();
      resolve(ans);
    })
  );
}

logs("Sedang memulai bot, harap tunggu...", "loading");

// Initialize the client with LocalAuth
const client = new Client({
  authStrategy: new LocalAuth(), // Use LocalAuth for session management
});

client.on("qr", (qr) => {
  logs(
    `Tolong scan qrcode berikut di akun yang akan di gunakan untuk memasukkan kontak ke grup`,
    "info"
  );
  qrcode.generate(qr, { small: true });
});

client.on("authenticated", () => {
  logs("User terverifikasi!", "ok");
});

client.on("disconnected", (reason) => {
  if (reason === "BANNED") {
    console.log(chalk.red("[WARNING] Akun telah terbanned oleh WhatsApp , menghentikan proses."));
    process.exit(1);
  }
});

client.on("ready", async () => {
  console.log(chalk.magenta(`
        ┓       ┓   •
       ┏┣┓┏┓┏┓┏┓┣┓┏┓┓
       ┛┛┗┗┻┛┗┗┫┛┗┗┻┗
        v1.0.0 ┛
        By ./SansXpl
 `));

  let myGroupName;
  let myGroup;

  // Loop to prompt for group name until a valid group is found
  while (true) {
    myGroupName = await askQuestion("Masukkan nama grup (lengkap): ");
    myGroup = (await client.getChats()).find(
      (chat) => chat.name === myGroupName
    );

    if (myGroup) {
      logs(`Bot telah disetting ke grup ${myGroupName}`, "info");
      break;
    } else {
      logs(`Grup ${myGroupName} tidak ditemukan, tolong coba lagi.`, "fail");
    }
  }

  // Prompt for welcome message, delay, and message frequency
  const welcomeMessage = await askQuestion("Masukkan pesan selamat datang: ");
  let delay = await askQuestion(
    "Masukkan delay setiap memasukkan kontak (detik): "
  );
  const messageAfter = await askQuestion(
    "Kirim pesan selamat datang setiap berapa kontak: "
  );

  const delaySeconds = parseFloat(delay);
  const messageAfterCount = parseInt(messageAfter, 10);

  if (
    isNaN(delaySeconds) ||
    delaySeconds <= 0 ||
    isNaN(messageAfterCount) ||
    messageAfterCount <= 0
  ) {
    logs("Delay invalid, otomatis di ubah ke 10 detik.", "fail");
    delay = '10';
  }

  const delayMs = delaySeconds * 1000; // Convert seconds to milliseconds

  // Read contacts from file
  try {
    const data = await fs.readFile(CONTACT_LIST, "utf8");
    logs(`Memulai menambahkan kontak`, "info");

    const contactNumbers = data
      .split("\n")
      .map((line) => {
        // Clean and format phone number
        return line
          .trim()
          .replace(/[\s+()-]/g, "") // Remove spaces, plus signs, parentheses, and dashes
          .replace(/^0/, ""); // Remove leading zero if present
      })
      .filter((line) => line); // Filter out any empty lines

    // Create a mapping from original phone numbers to WhatsApp contact IDs
    const contactMapping = contactNumbers.reduce((map, number) => {
      const contactID = `${number}@c.us`;
      map[contactID] = number;
      return map;
    }, {});

    // Convert to WhatsApp contact IDs
    const contactIDs = Object.keys(contactMapping);

    let count = 0;
    for (const contactID of contactIDs) {
      try {
        await myGroup.addParticipants([contactID]);
        logs(
          `Nomor ${contactMapping[contactID]} berhasil dimasukkan kedalam grup ${myGroupName}`,
          "ok"
        );

        count++;
        // Send welcome message after the specified number of contacts
        if (count % messageAfterCount === 0) {
          await client.sendMessage(myGroup.id._serialized, welcomeMessage);
          logs(
            `Pesan selamat datang berhasil di kirim ke grup ${myGroupName}`,
            "info"
          );
        }

        // Delay between adding participants
        await sleep(delayMs);
      } catch (error) {
        logs(
          `Gagal menambahkan nomor ${contactMapping[contactID]}: ${error}`,
          "fail"
        );
      }
    }

    // Send final welcome message if any contacts were added but not yet triggered a message
    if (count % messageAfterCount !== 0) {
      await client.sendMessage(myGroup.id._serialized, welcomeMessage);
      logs(
        `Pesan selamat datang terakhir berhasil dikirim ke grup ${myGroupName}`,
        "info"
      );
    }

    // Log and exit
    logs("\n[DONE] Semua kontak telah berhasil di tambahkan\n");
    process.exit(0);
  } catch (err) {
    logs(`Error ketika membuka file ${CONTACT_LIST}: ${err}`, 'fail');
  }
});

client.initialize();
