const modal = document.getElementById("noteModal");
const noteText = document.getElementById("note_text");
const noteList = document.querySelector(".container");
const openModal = document.getElementById("openModal");
const closeModal = document.getElementById("closeModal");
const addNote = document.getElementById("add_note");

var editingNote = null; // для хранения заметки которую редачим
// открыть/закрыть модалку
openModal.onclick = function () {
    modal.style.display = "block";
};
closeModal.onclick = function () {
    modal.style.display = "none";
};
window.onclick = function (e) {
    if (e.target === modal) {
        modal.style.display = "none";
    }
};

// переключение темы
document.querySelector(".theme-button").onclick = function () {
    document.body.classList.toggle("dark-theme");
};

// добавление/редактирование заметки
addNote.onclick = function () {
    var text = noteText.value;
    if (!text) return;

    if (editingNote) {
        editingNote.querySelector(".note-text").childNodes[0].nodeValue = text;
        editingNote = null;
    } else {
        // создание новой
        var note = document.createElement("div");
        note.className = "note";
        note.innerHTML = `
      <input type="checkbox" class="note-checkbox">
      <p class="note-text">${text}      </p>
        <svg class="note-icon edit-icon" width="18" height="18" viewBox="0 0 18 18" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M8.67272 5.99106L2 12.6637V16H5.33636L12.0091 9.32736M8.67272 5.99106L11.0654 3.59837L11.0669 3.59695C11.3962 3.26759 11.5612 3.10261 11.7514 3.04082C11.9189 2.98639 12.0993 2.98639 12.2669 3.04082C12.4569 3.10257 12.6217 3.26735 12.9506 3.59625L14.4018 5.04738C14.7321 5.37769 14.8973 5.54292 14.9592 5.73337C15.0136 5.90088 15.0136 6.08133 14.9592 6.24885C14.8974 6.43916 14.7324 6.60414 14.4025 6.93398L14.4018 6.93468L12.0091 9.32736M8.67272 5.99106L12.0091 9.32736"
                stroke="#CDCDCD" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        <svg class="note-icon delete-icon" width="18" height="18" viewBox="0 0 18 18" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M3.87414 7.61505C3.80712 6.74386 4.49595 6 5.36971 6H12.63C13.5039 6 14.1927 6.74385 14.1257 7.61505L13.6064 14.365C13.5463 15.1465 12.8946 15.75 12.1108 15.75H5.88894C5.10514 15.75 4.45348 15.1465 4.39336 14.365L3.87414 7.61505Z"
                stroke="#CDCDCD" />
            <path d="M14.625 3.75H3.375" stroke="#CDCDCD" stroke-linecap="round" />
            <path d="M7.5 2.25C7.5 1.83579 7.83577 1.5 8.25 1.5H9.75C10.1642 1.5 10.5 1.83579 10.5 2.25V3.75H7.5В2.25Z"
                stroke="#CDCDCD" />
            <path d="M10.5 9V12.75" stroke="#CDCDCD" stroke-linecap="round" />
            <path d="M7.5 9V12.75" stroke="#CDCDCD" stroke-linecap="round" />
        </svg>
     
    `;

        var separator = document.createElement("div");
        separator.className = "separator";
        separator.innerHTML = "<p>__________________________________________________________</p>";

        var addButton = openModal;
        noteList.insertBefore(note, addButton);
        noteList.insertBefore(separator, addButton);
    }

    noteText.value = "";
    modal.style.display = "none";
};

// редактирование и удаление 
document.addEventListener("click", function (e) {
    var editIcon = e.target.closest(".edit-icon");
    var deleteIcon = e.target.closest(".delete-icon");

    if (deleteIcon) {
        var note = deleteIcon.closest(".note");
        var separator = note.nextElementSibling;
        if (separator && separator.classList.contains("separator")) {
            separator.remove();
        }
        note.remove();
    }

    if (editIcon) {
        editingNote = editIcon.closest(".note");
        var currentText = editingNote.querySelector(".note-text").childNodes[0].nodeValue;
        noteText.value = currentText;
        modal.style.display = "block";
    }
});


// реализация посика

// const search_input = document.getElementById("search");
// search_input.addEventListener("input", () => {
//     let listNotes = document.querySelectorAll(".list > label > p.note_text")
//     for (let i = 0; i < listNotes.length; i++) {
//         listNotes[i].parentElement.style.display = "block";
//           if(!listNotes[i].innerText.includes(search_input.value)){
//             listNotes[i].parentElement.style.display = "none";
//           }

//     }
// })











let search = document.getElementsByClassName("search-input")[0]
search.addEventListener("input", function () {
    let search_text = search.value
    let notes = document.getElementsByClassName("note")
    let separators = document.getElementsByClassName("separator")

    if (/[^A-Za-zА-Яа-яЁё0-9 ]/.test(search_text)) {
        alert("Только русские,английские буквы и цифры")
        search.value = search_text.replace(/[^A-Za-zА-Яа-яЁё0-9 ]/g, '')
        return
    }
    
    for (let i = 0; i < notes.length; i++) {
        let note_text = notes[i].getElementsByClassName("note-text")[0].innerText
        let show = search_text === '' || note_text.toLowerCase().includes(search_text.toLowerCase())
        
        notes[i].classList.toggle("display-none", !show)
        if (separators[i]) separators[i].classList.toggle("display-none", !show)
    }
})






