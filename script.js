let notesTitles = [];
let notes = [];

let archivNotesTitles = [];
let archivNotes = [];

let trashNotesTitles = [];
let trashNotes = [];

function init() {
  getFromLocalStorage();
  renderNotes();
  renderArchivNotes();
  renderTrashNotes();
}

function renderNotes() {
  let contentRef = document.getElementById("content");
  contentRef.innerHTML = "";
  for (let indexNote = 0; indexNote < notes.length; indexNote++) {
    contentRef.innerHTML += getNoteTemplate(indexNote);
  }
}

function renderArchivNotes() {
  let archivContentRef = document.getElementById("archiv_content");
  archivContentRef.innerHTML = "";
  for (let indexArchivNote = 0; indexArchivNote < archivNotes.length; indexArchivNote++) {
    archivContentRef.innerHTML += getArchivNoteTemplate(indexArchivNote);
  }
}

function renderTrashNotes() {
  let trashContentRef = document.getElementById("trash_content");
  trashContentRef.innerHTML = "";
  for (let indexTrashNote = 0; indexTrashNote < trashNotes.length; indexTrashNote++) {
    trashContentRef.innerHTML += getTrashNoteTemplate(indexTrashNote);
  }
}

function addNote() {
  let noteTitleInputRef = document.getElementById("title_input");
  let noteInputRef = document.getElementById("note_input");
  let noteTitle = noteTitleInputRef.value;
  let noteInput = noteInputRef.value;

  if (noteTitle == "" || noteInput == "") {
    return;
  }

  notesTitles.push(noteTitle);
  notes.push(noteInput);

  saveToLocalStorage();
  renderNotes();
  noteTitleInputRef.value = "";
  noteInputRef.value = "";
}

function noteToTrash(indexNote) {
  let trashNote = notes.splice(indexNote, 1);
  trashNotes.push(trashNote[0]);
  let trashNoteTitle = notesTitles.splice(indexNote, 1);
  trashNotesTitles.push(trashNoteTitle[0]);
  saveToLocalStorage();
  renderNotes();
  renderArchivNotes();
  renderTrashNotes();
}

function archivToTrash(indexArchivNote) {
  let trashNote = archivNotes.splice(indexArchivNote, 1);
  trashNotes.push(trashNote[0]);
  let trashNoteTitle = archivNotesTitles.splice(indexArchivNote, 1);
  trashNotesTitles.push(trashNoteTitle[0]);
  saveToLocalStorage();
  renderNotes();
  renderArchivNotes();
  renderTrashNotes();
}

function noteToArchiv(indexNote) {
  let archivNote = notes.splice(indexNote, 1);
  archivNotes.push(archivNote[0]);
  let archivNoteTitle = notesTitles.splice(indexNote, 1);
  archivNotesTitles.push(archivNoteTitle[0]);
  saveToLocalStorage();
  renderNotes();
  renderArchivNotes();
  renderTrashNotes();
}

function archivToNote(indexArchivNote) {
  let note = archivNotes.splice(indexArchivNote, 1);
  notes.push(note[0]);
  let noteTitle = archivNotesTitles.splice(indexArchivNote, 1);
  notesTitles.push(noteTitle[0]);
  saveToLocalStorage();
  renderNotes();
  renderArchivNotes();
  renderTrashNotes();
}

function trashToNote(indexTrashNote) {
  let note = trashNotes.splice(indexTrashNote, 1);
  notes.push(note[0]);
  let noteTitle = trashNotesTitles.splice(indexTrashNote, 1);
  notesTitles.push(noteTitle[0]);
  saveToLocalStorage();
  renderNotes();
  renderArchivNotes();
  renderTrashNotes();
}

function deleteNote(indexTrashNote) {
  trashNotes.splice(indexTrashNote, 1);
  saveToLocalStorage();
  renderNotes();
  renderArchivNotes();
  renderTrashNotes();
}

function saveToLocalStorage() {
  localStorage.setItem("notes", JSON.stringify(notes));
  localStorage.setItem("notesTitles", JSON.stringify(notesTitles));
  localStorage.setItem("archivNotes", JSON.stringify(archivNotes));
  localStorage.setItem("archivNotesTitles", JSON.stringify(archivNotesTitles));
  localStorage.setItem("trashNotes", JSON.stringify(trashNotes));
  localStorage.setItem("trashNotesTitles", JSON.stringify(trashNotesTitles));
}

function getFromLocalStorage() {
  let notesArray = JSON.parse(localStorage.getItem("notes"));
  let notesTitlesArray = JSON.parse(localStorage.getItem("notesTitles"));
  if (notesArray != null) {
    notes = notesArray;
    notesTitles = notesTitlesArray;
  }

  let archivNotesArray = JSON.parse(localStorage.getItem("archivNotes"));
  let archivNotesTitlesArray = JSON.parse(localStorage.getItem("archivNotesTitles"));
  if (archivNotesArray != null) {
    archivNotes = archivNotesArray;
    archivNotesTitles = archivNotesTitlesArray;
  }

  let trashNotesArray = JSON.parse(localStorage.getItem("trashNotes"));
  let trashNotesTitlesArray = JSON.parse(localStorage.getItem("trashNotesTitles"));
  if (trashNotesArray != null) {
    trashNotes = trashNotesArray;
    trashNotesTitles = trashNotesTitlesArray;
  }
}
