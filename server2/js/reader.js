// Function to draw notes on the page
function draw() {
    // Get the note container element
    let noteContainer = document.getElementById('noteContainer');
    // Clear the existing content of the note container
    noteContainer.innerHTML = messages.EMPTY;

    // ChatGPT use as a reference for this function
    // Iterate through each note in the notegroup and display it
    notegroup.list.forEach(note => {
        // Create a div element for each note
        let note_el = document.createElement('div');
        note_el.classList.add('note-read');

        // Create a paragraph element to display the note text
        let textarea = document.createElement('p');
        textarea.innerHTML = note.text;
        textarea.id = `textarea-${note.id}`; // appending note id to each textarea was chatgpts idea
        note_el.appendChild(textarea);

        // Add the note element to the note container
        noteContainer.appendChild(note_el);

        // Add an input event listener to update the note when the text is modified
        textarea.addEventListener("input", () => notegroup.update(note));
    });
}

// Wait for the DOM content to be fully loaded before executing the script
document.addEventListener('DOMContentLoaded', function () {
    // Create an element to display the current time
    let time = document.createElement('h6');
    time.id = 'time';
    document.body.appendChild(time);

    // Create a container for notes
    let noteContainer = document.createElement('div');
    noteContainer.id = 'noteContainer';
    document.body.appendChild(noteContainer);

    // Create a textarea for the note's text
    let textarea = document.createElement('div');
    noteContainer.appendChild(textarea);

    // Create a return button and set its click event to navigate to '/index.html'
    let return_button = document.createElement('button');
    return_button.textContent = messages.RETURN;
    return_button.id = 'return-button';
    return_button.addEventListener('click', () => window.location.href = '/index.html');
    document.body.appendChild(return_button);

    // Initialize the application and update it every 2 seconds
    init();
    setInterval(() => init(), 2000);
});
