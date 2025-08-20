export class OcrEngine {
    constructor(progressBar, progressContainer) {
        this.progressBar = progressBar;
        this.progressContainer = progressContainer;
    }

    async recognize(file, lang = "jpn") {
        this.progressContainer.classList.remove("d-none");
        this.updateProgress(0, "Starting...");

        const result = await Tesseract.recognize(file, lang, {
            logger: info => {
                if (info.status === "recognizing text") {
                    const p = Math.round(info.progress * 100);
                    this.updateProgress(p, `${p}%`);
                } else {
                    this.updateProgress(null, info.status);
                }
            }
        });

        this.updateProgress(100, "Done!", true);
        return result.data.text.trim();
    }

    updateProgress(value, text, done = false) {
        if (value !== null) {
            this.progressBar.style.width = value + "%";
            this.progressBar.setAttribute("aria-valuenow", value);
        }
        this.progressBar.textContent = text;
        if (done) this.progressBar.classList.add("bg-success");
    }
}
