document.addEventListener("DOMContentLoaded", function () {
    // Get HTML elements
    const sourceLanguage = document.getElementById("source-language");
    const targetLanguage = document.getElementById("target-language");
    const inputText = document.getElementById("input-text");
    const outputText = document.getElementById("output-text");

    const translateButton = document.getElementById("translate-button");
    const swapButton = document.getElementById("swap-button");
    const clearButton = document.getElementById("clear-button");
    const copyButton = document.getElementById("copy-button");

    const characterCount = document.getElementById("character-count");
    const translationStatus = document.getElementById("translation-status");

    const placeholder = "Your translation will appear here...";

    // Check that essential HTML elements exist
    if (
        !sourceLanguage ||
        !targetLanguage ||
        !inputText ||
        !outputText ||
        !translateButton ||
        !swapButton ||
        !clearButton ||
        !copyButton ||
        !characterCount ||
        !translationStatus
    ) {
        console.error(
            "LinguaAI error: One or more HTML elements are missing. Check the IDs in index.html."
        );
        return;
    }

    console.log("LinguaAI JavaScript loaded successfully.");

    // Update character count
    inputText.addEventListener("input", function () {
        characterCount.textContent = inputText.value.length + " / 5000";
    });

    // Clear input and output
    clearButton.addEventListener("click", function () {
        inputText.value = "";
        outputText.textContent = placeholder;
        characterCount.textContent = "0 / 5000";
        translationStatus.textContent = "Ready to translate";
    });

    // Swap languages and text
    swapButton.addEventListener("click", function () {
        const previousSource = sourceLanguage.value;
        const previousTarget = targetLanguage.value;

        sourceLanguage.value = previousTarget;
        targetLanguage.value = previousSource;

        const previousInput = inputText.value;
        const previousOutput = outputText.textContent;

        if (previousOutput !== placeholder) {
            inputText.value = previousOutput;
            outputText.textContent = previousInput || placeholder;
            characterCount.textContent = inputText.value.length + " / 5000";
        }

        translationStatus.textContent = "Languages swapped";
    });

    // Copy translated text
    copyButton.addEventListener("click", async function () {
        const translatedText = outputText.textContent;

        if (!translatedText || translatedText === placeholder) {
            translationStatus.textContent = "Nothing to copy yet.";
            return;
        }

        try {
            await navigator.clipboard.writeText(translatedText);
            translationStatus.textContent = "Copied successfully!";
        } catch (error) {
            translationStatus.textContent =
                "Copy failed. Please select and copy the text manually.";
        }
    });

    // Translate text
    translateButton.addEventListener("click", async function () {
        const text = inputText.value.trim();
        const source = sourceLanguage.value;
        const target = targetLanguage.value;

        if (!text) {
            translationStatus.textContent = "Please enter some text.";
            inputText.focus();
            return;
        }

        if (text.length > 5000) {
            translationStatus.textContent =
                "Text cannot exceed 5000 characters.";
            return;
        }

        if (source === target) {
            translationStatus.textContent =
                "Please select two different languages.";
            return;
        }

        translateButton.disabled = true;
        translateButton.textContent = "Translating...";
        translationStatus.textContent = "Connecting to translation service...";

        try {
const response = await fetch("/translate", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        text: text,
        source_language: source,
        target_language: target
    })
});

console.log("HTTP status:", response.status);

const responseText = await response.text();
console.log("Raw server response:", responseText);

let data;

try {
    data = JSON.parse(responseText);
} catch (error) {
    throw new Error("The server returned an invalid JSON response.");
}

console.log("Parsed response:", data);

if (!response.ok) {
    throw new Error(data.error || "Translation failed.");
}

if (!data.translated_text) {
    throw new Error("No translated text was returned.");
}
outputText.textContent = data.translated_text;
outputText.style.display = "block";
outputText.style.visibility = "visible";
outputText.style.opacity = "1";
outputText.style.color = "#222222";

translationStatus.textContent = "Translation complete!";



                 } catch (error) {
            console.error("Translation error:", error);

            outputText.textContent = placeholder;
            translationStatus.textContent =
                error.message || "Translation failed. Please try again.";

        } finally {
            translateButton.disabled = false;
            translateButton.textContent = "Translate text →";
        }
    });
});