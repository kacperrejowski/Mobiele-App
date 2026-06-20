const textElement = document.getElementById('verdict-para');
const dialectSelect = document.getElementById('dialect-select');
const rerollBtn = document.getElementById('reroll-btn');

const originalText = textElement.innerText;

const translationPool = {
    yoda: [
        "A kingly feast, this is! From ancient China, it comes. Eat it, you shall!",
        "Strong with the Mayo, this one is. Begun, the Cow Tongue wars have.",
        "Mmm, taste like royalty, you will. Safe for your tummy? Think so, I do not."
    ],
    pirate: [
        "Avast ye! A feast fit for the Captain! Straight from the Far East, down the hatch!",
        "Blimey! A whole kilo of mayo and rum?! This be the curse of the black pearl on a plate!",
        "Yo-ho-ho! Eat this and you'll be talkin' to Davy Jones by sunrise!"
    ],
    shakespeare: [
        "Hark! A feast fit for royalty! From the grand Orient it hails, partake in its glory, gentle friends.",
        "Alas, poor stomach! A pound of mayonnaise and fermented fish? 'Tis madness, yet there is method in't!",
        "To eat, or not to eat, that is the question. A dish of such foul majesty demands thy courage!"
    ]
};

async function fetchLiveTranslation(dialect) {
    textElement.innerText = "Translating live via API...";

    try {
        const response = await fetch(`https://api.funtranslations.com/translate/${dialect}.json?text=${encodeURIComponent(originalText)}`);

        if (response.status === 429) {
            throw new Error("API rate limit reached");
        }

        const data = await response.json();
        if (data.contents && data.contents.translated) {
            textElement.innerText = data.contents.translated;
        } else {
            throw new Error("Bad data structure");
        }
    } catch (error) {
        console.warn("API limit hit or error. Using local database fallback instead.");
        pickLocalTranslation(dialect);
    }

    rerollBtn.style.display = 'inline-block';
}

function pickLocalTranslation(dialect) {
    const options = translationPool[dialect];
    if (!options || options.length === 0) {
        console.warn(`No local translations found for dialect: ${dialect}`);
        return;
    }
    const randomIndex = Math.floor(Math.random() * options.length);
    textElement.innerText = options[randomIndex];
}

dialectSelect.addEventListener('change', function () {
    const dialect = this.value;
    if (dialect === 'original') {
        textElement.innerText = originalText;
        rerollBtn.style.display = 'none';
    } else {
        fetchLiveTranslation(dialect);
    }
});

rerollBtn.addEventListener('click', function () {
    pickLocalTranslation(dialectSelect.value);
});