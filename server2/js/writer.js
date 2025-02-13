let notegroup;

// Fuction to draw the notes
function draw() {
    // Get the note container element by ID
    let noteContainer = document.getElementById('noteContainer');
    noteContainer.innerHTML = messages.EMPTY; // Clear the note container content

    // ChatGPT use as a reference for this function
    // Loop through the list of notes
    notegroup.list.forEach(note => {
        // Create a div element for the note
        let note_el = document.createElement('div');
        note_el.classList.add('note');

        // Create a textarea for the note's text
        let textarea = document.createElement('textarea');
        textarea.value = note.text;
        textarea.className = 'text-area';
        textarea.id = `textarea-${note.id}`; // appending note id to each textarea was chatgpts idea
        note_el.appendChild(textarea);

        // Create a remove button for the note
        let remove_button = document.createElement('button');
        remove_button.id = 'remove-button'
        remove_button.innerText = messages.REMOVE;

        // Add click event listener to the remove button to delete the note
        remove_button.addEventListener("click", () => notegroup.delete(note));
        note_el.appendChild(remove_button);

        // Append the note element to the note container
        noteContainer.appendChild(note_el);

        // Add input event listener to the textarea to update the note on input
        textarea.addEventListener("input", () => notegroup.update(note));
    });
}


// Function to create a new note and add it to the notegroup
function form() {
    let note = new Note('', notegroup.list.length);
    notegroup.add(note);
}

// Event listener for when the DOM content is loaded
document.addEventListener('DOMContentLoaded', function () {
    // Create an element for displaying time and add it to the body
    let time = document.createElement('h6');
    time.id = 'time';
    document.body.appendChild(time);

    // Create a note container and add it to the body
    let noteContainer = document.createElement('div');
    noteContainer.id = 'noteContainer';
    document.body.appendChild(noteContainer);

    // Create an "Add" button and add a click event listener to trigger the form function
    let add_button = document.createElement('button');
    add_button.textContent = messages.ADD;
    add_button.id = 'add-button';
    add_button.addEventListener('click', () => form());
    document.body.appendChild(add_button);

    // Create a "Return" button and add a click event listener to navigate to index.html
    let return_button = document.createElement('button');
    return_button.textContent = messages.RETURN;
    return_button.id = 'return-button';
    return_button.addEventListener('click', () => window.location.href = '/index.html');
    document.body.appendChild(return_button);

    // Initialize the application
    init();
    setInterval(() => last_saved(), 2000);
});
