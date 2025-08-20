# Japanese Reader

**Japanese Reader** is a web app that lets you extract Japanese text from images and display it with **furigana** (hiragana readings above kanji). It works entirely in your browser—no installation needed.

---

## Features

- Upload an image containing Japanese text.
- Choose OCR type: horizontal, vertical, or Japanese + English.
- See the recognized text.
- See the text with furigana.
- Adjust font size for better readability.
- Progress bar shows OCR progress.

---

## How It Works

This app uses several JavaScript libraries:

- **Tesseract.js** – Performs OCR to recognize text from images.
- **Kuromoji.js** – Analyzes Japanese text to get readings for kanji.
- **Wanakana.js** – Converts readings to hiragana for furigana display.
- **Bootstrap 5** – Provides the responsive layout and UI components.

---

## Usage

1. Open `index.html` in a modern browser.
2. Upload your image.
3. Select OCR type.
4. Click **Run OCR**.
5. View the text and furigana.

---

## License

MIT License
