export class Note {
    constructor(width, height, top, left, color, text) {
        this.width = width;
        this.height = height;
        this.top = top;
        this.left = left;
        this.color = color;
        this.text = text;
    }
    render() {
        const note = document.createElement('div');

        note.classList.add('note');
        note.style.cssText = `
            width: ${this.width};
            height: ${this.height};
            top: ${this.top};
            left: ${this.left};
        `;
        note.innerHTML = `
            <div class="note__inner">
                <div class="note__head" style="background: ${this.color.head};">
                    <div class="note__close">&#10006;</div>
                </div>
                <textarea class="note__textarea" style="background: ${this.color.body};">${this.text}</textarea>
            </div>
        `;

        note.addEventListener('mousedown', (e) => {
            if (e.target.classList.contains('note__close')) {
                close(e);
            } else if (e.target.classList.contains('note__head')) {
                startMove(e);
                window.addEventListener('mouseup', endMove);
            }
            
        });

        note.addEventListener('mouseup', () => {
            this.width = note.style.width;
            this.height = note.style.height;
            localStorage.setItem('notes', JSON.stringify(notes));
    
        });

        const textarea = note.querySelector('.note__inner .note__textarea');
        textarea.addEventListener('change', () => {
            this.text = textarea.value;
            localStorage.setItem('notes', JSON.stringify(notes));
        });

        document.querySelector('.note-container').append(note);


        let dx, dy;

        const close = () => {
            note.remove();
            notes.splice(notes.indexOf(this), 1);
            localStorage.setItem('notes', JSON.stringify(notes));
        };

        const startMove = (e) => {
            const noteTop = +note.style.top.slice(0, -2);
            const noteLeft = +note.style.left.slice(0, -2);
            dy = e.clientY - noteTop;
            dx = e.clientX - noteLeft;
            window.addEventListener('mousemove', move);
        };

        const move = (e) => {
            note.style.top = e.clientY - dy + 'px';
            note.style.left = e.clientX - dx + 'px';
        };

        const endMove = () => {
            window.removeEventListener('mousemove', move);

            alignElement();

            this.top = note.style.top;
            this.left = note.style.left;           
            localStorage.setItem('notes', JSON.stringify(notes));

            window.removeEventListener('mouseup', endMove);
        };

        const alignElement = () => {
            const top = +note.style.top.slice(0, -2);
            const left = +note.style.left.slice(0, -2);
            const height = +this.height.slice(0, -2);
            const width = +this.width.slice(0, -2);

            if (top < 150) {
                note.style.top = 150 + 'px';
            }
            if (left < 15) {
                note.style.left = 15 + 'px';
            }

            const docHeight = document.documentElement.clientHeight;
            if (top + height + 15 > docHeight) {
                note.style.top = docHeight - height - 15 + 'px';
            }
            const docWidth = document.documentElement.clientWidth;
            if (left + width + 15 > docWidth) {
                note.style.left = docWidth - width - 15 + 'px';
            }
        };
    }
}

export let notes;

if (localStorage.getItem('notes')) {
    notes = JSON.parse(localStorage.getItem('notes'));
    for (let i = 0; i < notes.length; i++) {
        notes[i] = new Note(...Object.values(notes[i]));
        notes[i].render();
    }
} else {
    notes = [];
}
