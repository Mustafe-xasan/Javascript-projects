var notes = [];

function init() {
    var savedNotes = localStorage.getItem("hageNotes");
    if (savedNotes) {
        notes = JSON.parse(savedNotes);
    }
    renderNotes();
}

function renderNotes() {
    var list = document.getElementById("notesList");
    list.innerHTML = "";

    notes.forEach(function (note, index) {
        var card = document.createElement("div");
        card.className = "note-card";

        card.innerHTML = `
            <p class="note-text">${note.text}</p>
            <p class="note-date">${note.date}</p>
            <button class="del-btn" onclick="deleteNote(${index})">
                <i class="fa fa-trash"></i>
            </button>
        `;

        list.appendChild(card);
    });
}

// add a new note
function addNote() {
    var input = document.getElementById("noteInput");
    var text = input.value;

    if (text === "") {
        alert("Please write something first!");
        return;
    }

    var newNote = {
        text: text,
        date: new Date().toLocaleString()
    };

    notes.push(newNote); 
    saveToLocal(); 
    renderNotes();

    input.value = "";
}

// remove a note
function deleteNote(index) {
    if (confirm("Are you sure?")) {
        notes.splice(index, 1); // remove from array
        saveToLocal();
        renderNotes();
    }
}

function saveToLocal() {
    localStorage.setItem("hageNotes", JSON.stringify(notes));
}

window.onload = init;
