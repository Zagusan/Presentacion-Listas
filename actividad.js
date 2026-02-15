const currentScript = document.currentScript;

const parent = currentScript.parentElement;

const palabra1 = document.getElementById("palabra-1");
const palabra2 = document.getElementById("palabra-2");
const palabra3 = document.getElementById("palabra-3");

const resultDiv = document.getElementById("act-res")

function updateWordWidget(words)
{
    palabra1.textContent = words.at(-3);
    palabra2.textContent = words.at(-2);
    palabra3.textContent = words.at(-1) + "...";
}

function updateResultDiv(words)
{
    resultDiv.textContent = words.join(" ");
}

function onClick()
{
    var palabra = input.value.split(" ")[0];

    if(typeof palabra === 'string' && palabra.trim().length > 0)
    {
        words.push(palabra);
        input.value = "";
        updateWordWidget(words);
        updateResultDiv(words);
    }
}

const input = document.getElementById("act-input");
const button = document.getElementById("act-button");

var words = ["Había", "una", "vez"];

button.addEventListener("click", onClick);
input.addEventListener("keydown", (event) =>
{
    if (event.key == "Enter")
    {
        onClick()
    }
})