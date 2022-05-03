// HTMLElement Definitionen
const enterbutton = document.getElementById("enter-button");
const interpretInput = document.getElementById("interpret-input");
const priceInput = document.getElementById("price-input");
const dateInput = document.getElementById("datetime-input");
const tableBody = document.getElementById("table-body");

enterbutton.addEventListener("click", enterEvent);

/**
* Eventlistener für die Lösch-Buttons der Tabellen-Einträge
* @param {Event} evt
* @param {HTMLElement} parentElement
*/
function handleDelete(evt, parentElement) {
    tableBody.removeChild(parentElement);
}

/**
 * Funktion erstellt die Lösch-Button-Zelle
 * @param {HTMLElement} parentElement
 * @return {HTMLElement} Gibt die Zelle mit dem Lösch-Button zurück
 */
function createDeleteButtonCell(parentElement) {
    // lege eine neue Tabellenzelle und einen neuen Button an
    const tablecell = document.createElement("td");
    const deleteButton = document.createElement("button");
    // Füllen des Buttons mit Inhalt
    deleteButton.textContent = "Delete Event";
    // gib dem Button die passenden HTML-Klassen
    deleteButton.classList.add("delete-button", "ui", "button", "negative");
    // Füge einen Eventlistener dem Löschbutton hinzu
    deleteButton.addEventListener("click", function(evt) {
        handleDelete(evt, parentElement);
    });
    // füge in die Tabellenzelle den Löschbutton ein
    tablecell.appendChild(deleteButton);
    // gebe die Tabellenzelle zurück
    return tablecell;
}

/**
 * Funktion erstellt eine neuen Event-Eintrag und fügt sie in die Tabelle ein
 */
function createNewEventEntry() {
    // Element für Tabellenreihe anlegen
    const tableEntry = document.createElement("tr");
    // Addressierung durch eine entsprechende Klasse
    tableEntry.classList.add("table-entry");
    // Auslesen der Input-Werte
    const interpret = interpretInput.value;
    const price = Number(priceInput.value);
    const datetime = dateInput.value;
    // Validierung der Input-Werte
    if (!validierung(interpret, price, datetime)) {
        return;
    }
    // lege die einzelnen Tabellenzellen an
    const cells = [
        createTableCell(interpret, "data-interpret"),
        createTableCell(price.toString(), "data-price"),
        createTableCell(datetime, "data-date"),
        createDeleteButtonCell(tableEntry)
    ];
    // füge die einzelnen Tabellenzellen der Tabellenreihe hinzu
    for (const cell of cells) {
        tableEntry.appendChild(cell);
    }
    // pflege die gesamte Tabellenreihe in die Tabellenstruktur ein
    tableBody.appendChild(tableEntry);
};

/**
 * Funktion erstellt eine einzelnen Tabellenzelle mit der entsprechenden Werten
 * @param {String} value
 * @param {String} name
 * @return {HTMLElement} Gibt die Tabellenzelle zurück
 */
function createTableCell(value, name) {
    const tablecell = document.createElement("td");
    tablecell.setAttribute(name, value);
    tablecell.textContent = value;
    return tablecell;
}

/**
 * Funktion validiert die Eingabefelder "Interpret", "Preis" und "Datum"
 * @param {String} interpret Der Wert im Interpret-Eingabefeld
 * @param {Number} price Der Wert im Preis-Eingabefeld
 * @param {String} datetime Der Wert im Datum-Eingabefeld
 * @return {Boolean} Gibt true zurück, wenn die Eingaben valide sind
 */
function validierung(interpret, price, datetime) {
    if (!interpret || !price || !datetime) {
        alert("Please fill out all input fields!");
        return false;
    }
    if (isNaN(price)) {
        alert("Price Input is not a Number");
        return false;
    }
    return true;
}

/**
 * Eventlistener für den Enter-Button
 * @param {Event} evt
 */
function enterEvent(evt) {
    evt.preventDefault();
    createNewEventEntry();
}