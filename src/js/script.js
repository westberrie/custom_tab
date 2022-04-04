import {Note, notes} from './components/note';

const btnNewNote = document.querySelector('.new-note');
const colors = [
    {head: '#73ff00', body: '#d2ffad'}, // Зелёный
    {head: '#ffff00', body: '#ffffad'}, // Жёлтый
    {head: '#00f3ff', body: '#adfbff'}, // Голубой
    {head: '#7000ff', body: '#d1adff'}, // Фиолетовый
    {head: '#f600ff', body: '#fcadff'}, // Розовый
    {head: '#ff0000', body: '#ffadad'}  // Красный
];
btnNewNote.addEventListener('click', () => {
    let rand = Math.floor(0 + Math.random() * (5 + 1));
    const note = new Note('200px', '150px', '150px', '15px', colors[rand], '');
    note.render();
    notes.push(note);
    localStorage.setItem('notes', JSON.stringify(notes));
});