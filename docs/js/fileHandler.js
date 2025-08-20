export class FileHandler {
    constructor(inputEl, previewImg, previewCard, clearBtn, dropZone) {
        this.input = inputEl;
        this.previewImg = previewImg;
        this.previewCard = previewCard;
        this.clearBtn = clearBtn;
        this.dropZone = dropZone;
    }

    init(onFileSelected) {
        // File input
        this.input.addEventListener('change', () => {
            if (this.input.files && this.input.files[0]) {
                this.handleFile(this.input.files[0], onFileSelected);
            }
        });

        // Drag + Drop
        this.dropZone.addEventListener('click', () => this.input.click());
        this.dropZone.addEventListener('dragover', e => {
            e.preventDefault();
            this.dropZone.classList.add('dragover');
        });
        this.dropZone.addEventListener('dragleave', () => this.dropZone.classList.remove('dragover'));
        this.dropZone.addEventListener('drop', e => {
            e.preventDefault();
            this.dropZone.classList.remove('dragover');
            if (e.dataTransfer.files.length) {
                this.handleFile(e.dataTransfer.files[0], onFileSelected);
            }
        });

        // Clear
        this.clearBtn.addEventListener('click', () => this.clear());
    }

    handleFile(file, callback) {
        const reader = new FileReader();
        reader.onload = e => {
            this.previewImg.src = e.target.result;
            this.previewCard.classList.remove('d-none');
        };
        reader.readAsDataURL(file);

        // Keep file input in sync
        const dt = new DataTransfer();
        dt.items.add(file);
        this.input.files = dt.files;

        if (callback) callback(file);
    }

    clear() {
        this.previewImg.src = "";
        this.previewCard.classList.add('d-none');
        this.input.value = "";
    }
}
