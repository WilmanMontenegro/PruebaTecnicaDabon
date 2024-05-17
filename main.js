// main.js

// Variable para almacenar el timer
let timer;
console.log("los colores que ya estan son"+usedColors);
// Función para mostrar un nuevo color en un elemento
function showColor(elemento, i, j) {
    // Obtenemos el color actual del elemento
    let oldColor = elemento.style.backgroundColor;
    oldColor = rgbToHex(oldColor);
    // Generamos un nuevo color que no sea igual al anterior ni a los ya usados
    const newColor = generateNewColor(oldColor);

    // Actualizamos la interfaz de usuario con el nuevo color y la información de la celda
    uiUpdate(elemento, i, j, oldColor, newColor);
    // Mostramos una alerta
    showAlert();
}

// Función para generar un nuevo color que no sea igual al anterior ni a los ya usados
function generateNewColor(oldColor) {
    let newColor;
    do {
        // Generamos un color aleatorio
        newColor = generateRandomColor();
        // Repetimos hasta que el color generado no sea igual al anterior ni a los ya usados
    } while (newColor === oldColor || usedColors.includes(newColor));
    // Añadimos el nuevo color a la lista de colores usados
    usedColors.push(newColor);
    console.log("los colores que ya estan son"+usedColors);
    // Devolvemos el nuevo color
    return newColor;
}

// Función para actualizar la interfaz de usuario
function uiUpdate(elemento, i, j, oldColor, newColor) {
    // Actualizamos el color antiguo de la alerta
    document.getElementById("oldColorAlert").style.backgroundColor = oldColor;
    // Actualizamos la información de la fila y la columna
    document.getElementById("infoRow").innerHTML = i;
    document.getElementById("infoColumn").innerHTML = j;

    document.getElementById("alertHexaColorOld").innerHTML = oldColor;
    document.getElementById("alertHexaColorNew").innerHTML = newColor;

    // Actualizamos el color del elemento
    elemento.style.backgroundColor = newColor;
    // Actualizamos el color de la alerta de nuevo color
    document.getElementById("newColorAlert").style.backgroundColor = newColor;
}

// Función para mostrar una alerta
function showAlert() {
    // Mostramos la alerta
    document.querySelector('.alert').style.display = 'flex';
    // Limpiamos el timer anterior si existe
    clearTimeout(timer);
    // Establecemos un nuevo timer para ocultar la alerta después de 55 segundos
    timer = setTimeout(() => {
        document.querySelector('.alert').style.display = 'none';
    }, 5000);
}

// Función para generar un color aleatorio
function generateRandomColor() {
    // Generamos tres números aleatorios para los componentes rojo, verde y azul
    const rojo = Math.floor(Math.random() * 256);
    const verde = Math.floor(Math.random() * 256);
    const azul = Math.floor(Math.random() * 256);
    // Devolvemos el color en formato hexadecimal
    return "#" + ((1 << 24) + (rojo << 16) + (verde << 8) + azul).toString(16).slice(1);
}

// Añadimos un evento de click al botón de aceptar para ocultar la alerta
document.getElementById('acceptButton').addEventListener('click', () => {
    document.querySelector('.alert').style.display = 'none';
});

// Cuando la página se carga
window.onload = function () {
    // Obtenemos todas las celdas
    const celdas = document.querySelectorAll('td');
    // Actualizamos el color inicial de cada celda
    celdas.forEach(updateColorInitial);
    // Observamos los cambios de color de cada celda
    celdas.forEach(observeColorChanges);
}

// Función para actualizar el color inicial de una celda
function updateColorInitial(celda) {
    // Obtenemos el color actual de la celda en formato hexadecimal
    const colorActual = rgbToHex(celda.style.backgroundColor);
    // Actualizamos el texto del elemento .hexaColor dentro de la celda
    celda.querySelector('.hexaColor').innerText = colorActual;
}

// Función para observar los cambios de color de una celda
function observeColorChanges(celda) {
    // Creamos un observador de mutaciones
    const observer = new MutationObserver(mutations => {
        // Para cada mutación
        mutations.forEach(mutation => {
            // Si la mutación es en el atributo de estilo
            if (mutation.attributeName === "style") {
                // Obtenemos el color actual de la celda en formato hexadecimal
                const colorActual = rgbToHex(mutation.target.style.backgroundColor);
                // Actualizamos el texto del elemento .hexaColor dentro de la celda
                mutation.target.querySelector('.hexaColor').innerText = colorActual;
            }
        });
    });
    // Iniciamos la observación de las mutaciones en los atributos de la celda
    observer.observe(celda, { attributes: true });
}

// Función para convertir un color de formato RGB a formato hexadecimal
function rgbToHex(rgb) {
    // Separamos los componentes rojo, verde y azul
    const a = rgb.split("(")[1].split(")")[0].split(",");
    // Convertimos cada componente a hexadecimal y lo devolvemos en formato de color hexadecimal
    return "#" + a.map(x => ("0" + parseInt(x).toString(16)).slice(-2)).join("");
}
