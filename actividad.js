const currentScript = document.currentScript;

const parent = currentScript.parentElement;

const palabra1 = document.getElementById("palabra-1");
const palabra2 = document.getElementById("palabra-2");
const palabra3 = document.getElementById("palabra-3");

const resultDiv = document.getElementById("act-res")

const form = document.getElementById("act-form")
const input = document.getElementById("act-input")

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

function onSubmit(event)
{
    event.preventDefault()

    let palabras = input.value.trimEnd().split(" ");
    if (palabras.length > 1)
    {
        confirm("¡No se vale hacer trampa! Solo puede haber una palabra.");
        return;
    }

    let palabra = palabras[0];

    if(typeof palabra === 'string' && palabra.trim().length > 0)
    {
        words.push(palabra);
        updateWordWidget(words);
        updateResultDiv(words);
    }
    input.value = "";
}

var words = ["Había", "una", "vez"];

form.addEventListener("submit", onSubmit)