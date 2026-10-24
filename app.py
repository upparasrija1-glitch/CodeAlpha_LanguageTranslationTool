import os

import requests
from dotenv import load_dotenv
from flask import Flask, jsonify, render_template, request

load_dotenv()

app = Flask(__name__)

DEEPL_API_KEY = os.getenv("DEEPL_API_KEY")
DEEPL_API_URL = "https://api-free.deepl.com/v2/translate"

# DeepL language codes
LANGUAGES = {
    "en": "English",
    "es": "Spanish",
    "fr": "French",
    "de": "German",
    "hi": "Hindi",
    "ta": "Tamil",
    "te": "Telugu",
}


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/translate", methods=["POST"])
def translate():
    data = request.get_json(silent=True) or {}

    text = data.get("text", "").strip()
    source = data.get("source_language", "").lower()
    target = data.get("target_language", "").lower()

    if not text:
        return jsonify({"error": "Please enter some text."}), 400

    if len(text) > 5000:
        return jsonify({"error": "Text cannot exceed 5000 characters."}), 400

    if source not in LANGUAGES or target not in LANGUAGES:
        return jsonify({"error": "Please select supported languages."}), 400

    if source == target:
        return jsonify({"error": "Please select different languages."}), 400

    if not DEEPL_API_KEY:
        return jsonify({
            "error": "DeepL API key is missing. Check your .env file."
        }), 500

    try:
        response = requests.post(
            DEEPL_API_URL,
            headers={
                "Authorization": f"DeepL-Auth-Key {DEEPL_API_KEY}",
                "Content-Type": "application/json",
            },
            json={
                "text": [text],
                "source_lang": source.upper(),
                "target_lang": target.upper(),
            },
            timeout=30,
        )

        if not response.ok:
            print("DeepL status:", response.status_code)
            print("DeepL response:", response.text)

            return jsonify({
                "error": (
                    "DeepL could not translate this request. "
                    "Check the Flask terminal for details."
                )
            }), 502

        result = response.json()
        translations = result.get("translations", [])

        if not translations or not translations[0].get("text"):
            return jsonify({
                "error": "DeepL returned no translation."
            }), 502

        return jsonify({
            "translated_text": translations[0]["text"]
        })

    except requests.Timeout:
        return jsonify({
            "error": "Translation timed out. Please try again."
        }), 504

    except requests.RequestException as error:
        print("DeepL connection error:", error)
        return jsonify({
            "error": "Could not connect to DeepL. Please try again."
        }), 502

    except (ValueError, TypeError, KeyError) as error:
        print("DeepL response error:", error)
        return jsonify({
            "error": "DeepL returned an invalid response."
        }), 502


if __name__ == "__main__":
    app.run(debug=True)