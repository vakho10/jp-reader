import {FileHandler} from './fileHandler.js';
import {OcrEngine} from './ocrEngine.js';
import {FuriganaGenerator} from './furiganaGenerator.js';

class App {
    constructor() {
        // UI Elements
        this.input = document.getElementById('imageInput');
        this.dropZone = document.getElementById('dropZone');
        this.imagePreview = document.getElementById('imagePreview');
        this.previewCard = document.getElementById('previewCard');
        this.clearPreviewBtn = document.getElementById('clearPreview');
        this.runBtn = document.getElementById('runOcr');
        this.fontSizeRange = document.getElementById('fontSizeRange');
        this.fontSizeValue = document.getElementById('fontSizeValue');
        this.output = document.getElementById('output');
        this.furiganaOutput = document.getElementById('furiganaOutput');
        this.ocrTypeSelect = document.getElementById('ocrType');
        this.progressBar = document.getElementById('progressBar');
        this.progressBarContainer = document.getElementById('progressBarContainer');
        this.resultsContainer = document.getElementById('resultsContainer');

        // Modules
        this.fileHandler = new FileHandler(
            this.input, this.imagePreview, this.previewCard, this.clearPreviewBtn, this.dropZone
        );
        this.ocr = new OcrEngine(this.progressBar, this.progressBarContainer);
        this.furigana = new FuriganaGenerator();

        this.bindEvents();
        this.fileHandler.init(file => this.lastFile = file);

        this.updateFontSize(this.fontSizeRange.value);
    }

    bindEvents() {
        this.runBtn.addEventListener('click', () => this.runOcr());
        this.fontSizeRange.addEventListener('input', () => this.updateFontSize(this.fontSizeRange.value));

        document.querySelectorAll('.copy-btn').forEach(btn => {
            btn.addEventListener('click', () => this.copyToClipboard(btn.dataset.target, btn));
        });
    }

    async runOcr() {
        if (!this.lastFile) {
            alert("Please select an image first!");
            return;
        }

        this.resultsContainer.classList.add('d-none');
        this.output.textContent = "";
        this.furiganaOutput.innerHTML = "";

        const lang = this.ocrTypeSelect.value;
        const text = await this.ocr.recognize(this.lastFile, lang);

        this.output.textContent = text;
        this.furiganaOutput.innerHTML = this.furigana.addFurigana(text);

        if (text.length > 0) {
            this.showResults();
        }
    }

    showResults() {
        document.querySelectorAll('.copy-btn').forEach(btn => btn.classList.remove('d-none'));

        this.resultsContainer.classList.remove('d-none');
        this.resultsContainer.classList.add('fade');
        setTimeout(() => this.resultsContainer.classList.add('show'), 10);
        this.resultsContainer.scrollIntoView({behavior: 'smooth', block: 'start'});
    }

    updateFontSize(size) {
        this.output.style.fontSize = size + "px";
        this.furiganaOutput.style.fontSize = size + "px";
        this.fontSizeValue.textContent = size;
    }

    copyToClipboard(targetId, btn) {
        const target = document.getElementById(targetId);
        navigator.clipboard.writeText(target.innerText || target.textContent).then(() => {
            btn.textContent = "Copied!";
            setTimeout(() => btn.textContent = "Copy", 1000);
        });
    }
}

// Init
document.addEventListener("DOMContentLoaded", () => {
    window.app = new App();
});
