const noteContainer = document.querySelector('.note-container'),
      btnNewNote = document.querySelector('.new-note');

let notes;
let dx, dy;

if (localStorage.getItem('notes')) {
    notes = JSON.parse(localStorage.getItem('notes'));
    notes.forEach(note => {
        createNote(note);
    });
} else {
    notes = [];
}

btnNewNote.addEventListener('click', () => {
    const note = {
        width: 200 + 'px',
        height: 150 + 'px',
        top: 150 + 'px',
        left: 15 + 'px',
        text: ''
    };

    notes.push(note);
    localStorage.setItem('notes', JSON.stringify(notes));
    createNote(note);
});

function createNote(objNote) {
    const elemNote = document.createElement('div');
    elemNote.classList.add('note');
    elemNote.style.cssText = `
        width: ${objNote.width};
        height: ${objNote.height};
        top: ${objNote.top};
        left: ${objNote.left};
    `;
    elemNote.innerHTML = `
        <div class="note__inner">
            <div class="note__head">
                <div class="note__close">&#10006;</div>
            </div>
            <textarea class="note__textarea">${objNote.text}</textarea>
        </div>
    `;

    const head = elemNote.querySelector('.note__inner .note__head'),
          textarea = elemNote.querySelector('.note__inner .note__textarea'),
          btnClose = elemNote.querySelector('.note__inner .note__head .note__close');


    btnClose.addEventListener('click', e => {
        elemNote.remove();
        notes.splice(notes.indexOf(objNote), 1);
        localStorage.setItem('notes', JSON.stringify(notes));
    });

    const listener = (e) => moveNote(e, elemNote);

    head.addEventListener('mousedown', (e) => {
        // if (e.target.classList.contains('note__head')) {
            const noteTop = +elemNote.style.top.slice(0, -2);
            const noteLeft = +elemNote.style.left.slice(0, -2);
            dy = e.clientY - noteTop;
            dx = e.clientX - noteLeft;

            window.addEventListener('mousemove', listener);
        // }
    });

    window.addEventListener('mouseup', (e) => {
            window.removeEventListener('mousemove', listener);
            if (+elemNote.style.top.slice(0, -2) < 150) {
                elemNote.style.top = 150 + 'px';
            }
            objNote.top = elemNote.style.top;
            objNote.left = elemNote.style.left;
            localStorage.setItem('notes', JSON.stringify(notes));
    });

    elemNote.addEventListener('mouseup', () => {
        objNote.width = elemNote.style.width;
        objNote.height = elemNote.style.height;
        localStorage.setItem('notes', JSON.stringify(notes));
    });

    textarea.addEventListener('change', () => {
        objNote.text = textarea.value;
        localStorage.setItem('notes', JSON.stringify(notes));
    });
    noteContainer.append(elemNote);
}

function moveNote(e, elemNote) {
    elemNote.style.top = e.clientY - dy + 'px';
    elemNote.style.left = e.clientX - dx + 'px';
}





