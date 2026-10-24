# 🌐 LinguaAI — Language Translation Tool

**Language without boundaries.**

LinguaAI is a web-based language translation application developed as part of the CodeAlpha AI Internship project. It provides a simple interface for entering text, selecting languages, and viewing translated results.

## ✨ Features

* 🌍 Translate text between supported languages.
* 🔄 Select source and target languages.
* 📝 Enter text using a clean, simple interface.
* 📋 Copy translated text.
* 🧹 Clear the input text.
* 🔁 Swap source and target languages.
* 🔢 Track the input character count.
* 📱 Responsive design for desktop and mobile screens.

## 🛠️ Technologies Used

* **Python** — Backend programming
* **Flask** — Web application framework
* **HTML5** — Page structure
* **CSS3** — Styling and responsive layout
* **JavaScript** — Interactive features
* **DeepL API** — Machine translation
* **python-dotenv** — Environment variable management

## 📁 Project Structure

```text
CodeAlpha_LanguageTranslationTool/
├── app.py
├── requirements.txt
├── .env
├── .gitignore
├── templates/
│   └── index.html
└── static/
    ├── css/
    │   └── style.css
    └── js/
        └── script.js
```

**Security note:** The `.env` file stores the private API key and must not be uploaded to GitHub.

## ⚙️ Installation and Setup

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd CodeAlpha_LanguageTranslationTool
```

Replace `YOUR_GITHUB_REPOSITORY_URL` with your repository's HTTPS URL.

### 2. Install dependencies

```bash
python -m pip install -r requirements.txt
```

Ensure `requirements.txt` includes:

```text
Flask
requests
python-dotenv
```

### 3. Configure your API key

Create a `.env` file in the project root:

```text
DEEPL_API_KEY=your_deepl_api_key_here
```

Replace the placeholder with your own API key. Never share or commit this file.

### 4. Run the application

```bash
python app.py
```

Open the following address in your browser:

```text
http://127.0.0.1:5000
```

## 🔐 API Key Security

* Store your API key in `.env`.
* Exclude `.env` through `.gitignore`.
* Never hard-code API keys in source files.
* Never publish API keys in screenshots, videos, or repository files.

## 🎯 Project Objective

The objective of LinguaAI is to demonstrate how a Python web application can integrate a machine translation API with a user-friendly frontend.

## 👩‍💻 Project Information

**Project:** Language Translation Tool
**Internship:** CodeAlpha AI Internship
**Developer:** Project contributor

---

*Built to make multilingual communication simpler.*