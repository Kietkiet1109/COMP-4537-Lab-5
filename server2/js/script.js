// Class representing a note
class Note {
    constructor(text, id) {
        this.text = text;
        this.id = id;
    }
}

// Class representing a group of notes
class NoteGroup {
    constructor() {
        this.list = []; // list of notes
    }

    // Delete a note from the list
    delete(note) {
        let index = this.list.indexOf(note);
        if (index > -1) {
            this.list.splice(index, 1);
        }

        // Update local storage and redraw
        localStorage.setItem('notes', JSON.stringify(this.list));
        draw();
    }

    // Add a note to the list
    add(note) {
        this.list.push(note);
        // Redraw
        draw();
    }

    // Update a note in the list
    update(note) {
        let textarea = document.getElementById(`textarea-${note.id}`); // Get the textarea element corresponding to the note
        note.text = textarea.value; // Update the note's text property with the content of the textarea

        // Add an event listener to the textarea for continuous auto-saving
        if (note.text != messages.EMPTY) {
            textarea.addEventListener("input", () => {
                localStorage.setItem('notes', JSON.stringify(this.list));
                last_saved();
            });
        }
    }
}

// ChatGPT use as a reference for this function
// Function to display the last saved time
function last_saved() {
    let time = document.getElementById('time');
    let currentdate = new Date();
    let datetime = `${messages.LAST_SAVED}`
        + currentdate.getHours() + ":"
        + currentdate.getMinutes() + ":"
        + currentdate.getSeconds();
    time.innerHTML = datetime;
}

// Initialize the application
function init() {
    notegroup = new NoteGroup(); // Create a new note group
    // Retrieve stored notes from localStorage or initialize an empty array
    let storedNotes = JSON.parse(localStorage.getItem('notes')) || []; 
    notegroup.list = storedNotes; // Assign the stored notes to the note group

    last_saved(); // Display the last saved time
    
    draw(); // Draw the notes
}
