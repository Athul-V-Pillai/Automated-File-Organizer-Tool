# 🗂️ Automated File Organizer Tool

A desktop application that automatically organizes files into categorized subdirectories based on file extensions — with real-time folder monitoring, duplicate handling, and an intuitive Electron-powered GUI.

---

## 📌 Overview

Managing cluttered folders manually is tedious. This tool watches a selected folder continuously and sorts every file into the right subdirectory the moment it appears — no manual intervention needed. Built with a **Python backend** for file logic and an **Electron frontend** for a clean, cross-platform desktop UI.

---

## ✨ Features

- **Automatic Categorization** — Files are sorted into subdirectories based on their extensions
- **Real-Time Monitoring** — Continuously watches the target folder (polling every 3 seconds)
- **Duplicate Handling** — Renamed with an incremental counter so no file is ever overwritten
- **Intuitive GUI** — Select a folder, start/stop the organizer with a click
- **Catch-All Folder** — Uncategorized file types are moved to `Other/` instead of being ignored

---

## 📁 File Categories

| Folder      | Extensions                                          |
|-------------|-----------------------------------------------------|
| Images      | `.jpg`, `.jpeg`, `.png`, `.gif`, `.webp`            |
| Videos      | `.webm`, `.mov`, `.mp4`, `.m4p`, `.m4v`             |
| Documents   | `.doc`, `.docx`, `.pdf`, `.key`                     |
| Code        | `.py`, `.java`, `.html`, `.css`, `.js`, `.sql`, `.cpp`, `.c` |
| Text        | `.txt`, `.md`, `.xml`                               |
| Other       | Everything else                                     |

---

## 🛠️ Tech Stack

| Layer    | Technology         |
|----------|--------------------|
| Backend  | Python 3           |
| Frontend | Electron (v26+)    |
| UI       | HTML, CSS, JS      |
| Bridge   | Electron IPC (preload.js / renderer.js) |

---

## 📂 Project Structure

```
Automated-File-Organizer-Tool/
├── backend.py          # Python file watcher & organizer logic
├── main.js             # Electron main process
├── preload.js          # Electron preload / context bridge
├── renderer.js         # Frontend logic (IPC calls)
├── index.html          # App UI layout
├── ui.css              # Styling
├── package.json        # Node/Electron config
└── package-lock.json
```

---

## ⚙️ Prerequisites

- [Node.js](https://nodejs.org/) (v16+)
- [Python 3](https://www.python.org/)
- npm

---

## 🚀 Getting Started

**1. Clone the repository**

```bash
git clone https://github.com/Athul-V-Pillai/Automated-File-Organizer-Tool.git
cd Automated-File-Organizer-Tool
```

**2. Install Electron dependencies**

```bash
npm install
```

**3. Launch the application**

```bash
npm start
```

The Electron window will open. Use the UI to select a folder and start the organizer.

---

## 🖥️ Usage

1. Open the app with `npm start`
2. Click **Select Folder** and choose the directory you want to organize
3. Click **Start** — the Python backend begins monitoring the folder
4. Files dropped into (or already present in) the folder are automatically sorted
5. Click **Stop** at any time to pause monitoring

---

## 🔧 How It Works

The Python script (`backend.py`) is spawned as a child process by Electron. It loops every 3 seconds, scans the target folder for loose files, and moves each one into the appropriate subdirectory. If a file with the same name already exists at the destination, it appends a numeric suffix (e.g. `report_1.pdf`, `report_2.pdf`) to avoid collisions.

---

## 🤝 Contributing

Contributions are welcome! To get started:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## 📄 License

This project does not currently specify a license. Please contact the author before using it in commercial projects.

---

## 👤 Author

**Athul V Pillai**
GitHub: [@Athul-V-Pillai](https://github.com/Athul-V-Pillai)
