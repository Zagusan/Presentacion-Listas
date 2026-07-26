const currentScript = document.currentScript;

const parent = currentScript.parentElement;

const palabra1 = document.getElementById("palabra-1");
const palabra2 = document.getElementById("palabra-2");
const palabra3 = document.getElementById("palabra-3");

const resultDiv = document.getElementById("act-res");

const form = document.getElementById("act-form");
const input = document.getElementById("act-input");

const usarDiccionario = document.getElementById("usar-diccionario");
usarDiccionario.checked = true;

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

const words = ["Había", "una", "vez"];

async function checkAgainstDictionary(word)
{
    try
    {
        // Elimina cualquier cantidad de puntuación al principio y al final
        const word_no_punctuation = word.replaceAll(/^[.,;:?!¿¡]+|[.,;:?!¿¡]+$/g, ""); 
        const respuesta = await fetch(
            `https://freedictionaryapi.com/api/v1/entries/es/${encodeURIComponent(word_no_punctuation)}`
        );

        const datos = await respuesta.json();

        if (!respuesta.ok)
        {
            confirm(`Error ${respuesta.status} al conectarse al diccionario.`);
            return false;
        }

        if (datos.entries.length === 0)
        {
            confirm("Esa palabra no existe.");
            return false;
        }
        return true;
    }
    catch
    {
        confirm("No se pudo conectar con el diccionario.");
        return false;
    }
}

async function onSubmit(event)
{
    event.preventDefault();

    const word = input.value.trim();

    if (word === "")
    {
        confirm("No se escribió ninguna palabra.");
        return;
    }
    if (word.includes(" "))
    {
        confirm("Solo puede haber una palabra.");
        return;
    }

    if (!usarDiccionario.checked || await checkAgainstDictionary(word))
    {
        words.push(word);
        updateWordWidget(words);
        updateResultDiv(words);

        input.value = "";
    }
}


form.addEventListener("submit", onSubmit)