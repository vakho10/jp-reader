export class FuriganaGenerator {
    constructor(dicPath = "./lib/kuromoji/dict/") {
        this.tokenizer = null;
        this.ready = false;
        this.initKuromoji(dicPath);
    }

    initKuromoji(dicPath) {
        kuromoji.builder({dicPath}).build((err, tok) => {
            if (err) {
                console.error("Kuromoji failed to load:", err);
                return;
            }
            this.tokenizer = tok;
            this.ready = true;
            console.log("FuriganaGenerator: Kuromoji loaded ✅");
        });
    }

    addFurigana(text) {
        if (!this.ready || !this.tokenizer) return text;

        return this.tokenizer.tokenize(text).map(tok => {
            const surface = tok.surface_form;
            const reading = tok.reading || "";
            return (reading && /[\u4e00-\u9faf]/.test(surface))
                ? `<ruby>${surface}<rp>(</rp><rt>${wanakana.toHiragana(reading)}</rt><rp>)</rp></ruby>`
                : surface;
        }).join('');
    }
}
