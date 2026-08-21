const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const tuning = ['E', 'B', 'G', 'D', 'A', 'E']; // İnce telden kalın tele (1-6)
const frets = 12; // Eşik (0) dahil 13 nota olacak

const fretboard = document.getElementById('fretboard');
const noteSelect = document.getElementById('note-select');
const clearBtn = document.getElementById('clear-btn');

function generateFretboard() {
    fretboard.innerHTML = '';
    
    tuning.forEach((openNote) => {
        const stringDiv = document.createElement('div');
        stringDiv.className = 'string';
        
        let startIndex = notes.indexOf(openNote);
        
        for (let i = 0; i <= frets; i++) {
            const noteDiv = document.createElement('div');
            noteDiv.className = 'note';
            
            const currentNote = notes[(startIndex + i) % notes.length];
            noteDiv.dataset.note = currentNote;
            
            const label = document.createElement('div');
            label.className = 'note-label';
            label.textContent = currentNote;
            
            noteDiv.appendChild(label);
            
            // Tıklama olayı
            noteDiv.addEventListener('click', () => {
                noteDiv.classList.toggle('active');
            });
            
            stringDiv.appendChild(noteDiv);
        }
        
        fretboard.appendChild(stringDiv);
    });
}

function highlightNote(targetNote) {
    const allNotes = document.querySelectorAll('.note');
    allNotes.forEach(note => {
        note.classList.remove('highlight');
        if (note.dataset.note === targetNote) {
            note.classList.add('highlight');
        }
    });
}

function clearAll() {
    const allNotes = document.querySelectorAll('.note');
    allNotes.forEach(note => {
        note.classList.remove('active', 'highlight');
    });
    noteSelect.value = 'none';
}

noteSelect.addEventListener('change', (e) => {
    const selectedNote = e.target.value;
    if (selectedNote === 'none') {
        clearAll();
    } else {
        highlightNote(selectedNote);
    }
});

clearBtn.addEventListener('click', clearAll);

// Başlangıçta klavyeyi oluştur
generateFretboard();
