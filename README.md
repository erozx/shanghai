<p align="center">
  <a href="" rel="noopener">
 <img height=200px src="https://i.imgur.com/hiRIpy2.png" alt="Shanghai"></a>
</p>

---

<p align="center"> 
Shanghai is a simple but useful bot designed to automate the process of adding contacts to a WhatsApp group. Its name, "Shanghai," reflects its function of 'kidnapping' contacts into the group.
    </br> </br> 
    <img src="https://img.shields.io/badge/NODEJS-18.x-ebcb8b?style=flat-square"/>  <img src="https://img.shields.io/badge/LICENSE-MIT-blue?style=flat-square"/> <img src="https://img.shields.io/badge/VERSION-1.0.0-a3be8c?style=flat-square"/><br/>
</p>

<p align='center'>
<a href="#features"><img src="https://img.shields.io/badge/features-2e3440?style=for-the-badge"/></a> <a href="#getting_started"><img src="https://img.shields.io/badge/Getting Started-2e3440?style=for-the-badge"/></a> <a href="#prerequisites"><img src="https://img.shields.io/badge/Prerequisites-2e3440?style=for-the-badge"/></a> <a href="#installation"><img src="https://img.shields.io/badge/Installation-2e3440?style=for-the-badge"/></a> <a href="#usage"><img src="https://img.shields.io/badge/Usage-2e3440?style=for-the-badge"/></a> <a href="#authors"><img src="https://img.shields.io/badge/Authors-2e3440?style=for-the-badge"/></a> <a href="#license"><img src="https://img.shields.io/badge/License-2e3440?style=for-the-badge"/></a>
</p>  

# TODO - v1.1.1
## Minor
- [ ] Add english version
- [ ] Choice to load welcome message from text file
- [ ] Check each number before adding into group
- [ ] Can add multiple contact at once
- [ ] Can add into multiple group at once
## Patch
- [ ] Fix auth & cache folder
      
## 🔍 Features <a name = "features"></a>
- **Automatic Contact Addition**: Add a list of contacts to a WhatsApp group effortlessly.
- **Customizable Delays**: Set delay intervals between adding each contact to avoid bans.
- **Welcome Messages**: Send welcome messages to the group at specified intervals.
- **Error Handling**: Logs errors and retries on failure, ensuring robust performance.
- **Real-Time Logging**: Provides real-time logs for monitoring the bot's actions.

## 🚀 Getting Started <a name = "getting_started"></a>
First of all, nodejs must be installed on the device that will be used.
[Download Here from official website](https://nodejs.org/en/download/package-manager)

### Prerequisites <a name = "prerequisites"></a>
```bash
- Node.js (v18 or higher)
- WhatsApp account for authentication that has group admin permissions
- The number to be added to the group must first be saved to contacts in order to be added to the group.
```

### Installation <a name = "installation"></a>
1. Clone the repository:
```bash
$ git clone https://github.com/sansxpl/shanghai.git
$ cd shanghai
```

2. Install dependencies:
```bash
$ npm install
```

3. Prepare the contact list:
   - Create a file named `contact.txt` or edit the existing one in the root directory.
   - Add phone numbers in the format `+countrycode number`, one per line.

4. Run the bot:
```bash
$ npm start
```

## 🎈 Usage <a name="usage"></a>
1. **Scan QR Code**: On the first run, scan the QR code with your WhatsApp account.
2. **Input Prompts**: Provide the required inputs such as group name, welcome message, delay interval, and message frequency.
3. **Monitoring**: Monitor the real-time logs to track the bot's progress and actions.

### Example
Here’s an example of what the input process looks like:

```bash
Masukkan nama grup (lengkap): My Group
Masukkan pesan selamat datang: Welcome to My Group!
Masukkan delay setiap memasukkan kontak (detik): 5
Kirim pesan selamat datang setiap berapa kontak: 10
```

## ✍️ Authors <a name = "authors"></a>

- [@sansxpl](https://github.com/sansxpl) - Just Coding

## 📃 License <a name = "license"></a>
This project is licensed under the MIT License.
