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

const words = ["Había", "una", "vez"];

async function onSubmit(event)
{
    event.preventDefault();

    const palabra = input.value.trim();

    if (palabra === "")
    {
        confirm("No se escribió ninguna palabra.");
        return;
    }
    if (palabra.includes(" "))
    {
        confirm("Solo puede haber una palabra.");
        return;
    }

    try
    {
        // Elimina cualquier cantidad de puntuación al principio y al final
        const palabra_sin_puntuacion = palabra.replaceAll(/^[.,;:?!¿¡]+|[.,;:?!¿¡]+$/g, ""); 
        const respuesta = await fetch(
            `https://freedictionaryapi.com/api/v1/entries/es/${encodeURIComponent(palabra_sin_puntuacion)}`
        );

        const datos = await respuesta.json();

        if (!respuesta.ok)
        {
            confirm(`Error ${respuesta.status} al conectarse al diccionario.`);
            return;
        }

        if (datos.entries.length === 0)
        {
            confirm("Esa palabra no existe.");
            return;
        }

        words.push(palabra);
        updateWordWidget(words);
        updateResultDiv(words);

        input.value = "";
    }
    catch
    {
        confirm("No se pudo conectar con el diccionario.");
    }
}


form.addEventListener("submit", onSubmit)