const quoteText = document.getElementById("quote-text");
const authorName = document.getElementById("author");
const newQuoteBtn = document.getElementById("new-quote-btn");
const speakBtn = document.getElementById("speak-btn");
const copyBtn = document.getElementById("copy-btn");

// list of quotes
const quotesArray = [
    { text: "Your time is limited, so don't waste it living someone else's life.", author: "Steve Jobs" },
    { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
    { text: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius" },
    { text: "Everything you've ever wanted is on the other side of fear.", author: "George Addair" },
    { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
    { text: "Hardships often prepare ordinary people for an extraordinary destiny.", author: "C.S. Lewis" },
    { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
    { text: "Do what you can, with what you have, where you are.", author: "Theodore Roosevelt" },
    { text: "Happiness is not something readymade. It comes from your own actions.", author: "Dalai Lama" }
];

// get random quote
function randomQuote() {
    newQuoteBtn.classList.add("loading");
    newQuoteBtn.innerText = "Loading...";

    setTimeout(() => {
        const index = Math.floor(Math.random() * quotesArray.length);
        const quote = quotesArray[index];

        quoteText.innerText = quote.text;
        authorName.innerText = quote.author;

        newQuoteBtn.innerText = "New Quote";
        newQuoteBtn.classList.remove("loading");
    }, 400);
}

// Speak Functionality section 
speakBtn.addEventListener("click", () => {
    if (!window.speechSynthesis.speaking) {
        let utterance = new SpeechSynthesisUtterance(`${quoteText.innerText} by ${authorName.innerText}`);
        utterance.rate = 0.9;
        window.speechSynthesis.speak(utterance);
    }
});

// Copy Functionality section
copyBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(quoteText.innerText).then(() => {
        const originalIcon = copyBtn.innerHTML;
        copyBtn.innerHTML = '<i class="fas fa-check"></i>';
        setTimeout(() => {
            copyBtn.innerHTML = originalIcon;
        }, 1500);
    });
});

newQuoteBtn.addEventListener("click", randomQuote);

window.onload = randomQuote;
