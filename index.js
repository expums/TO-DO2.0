const openModal = document.getElementById("openModal");
const modal = document.getElementById("noteModal");
const closeModal = document.getElementById("closeModal");

openModal.onclick = () => modal.style.display = "block";
closeModal.onclick = () => modal.style.display = "none";
window.onclick = (e) => {
    if (e.target === modal) modal.style.display = "none";
};

const themeButton = document.querySelector(".theme-button");

themeButton.onclick = () => {
    document.body.classList.toggle("dark-theme");
};

const note_text = document.getElementById("note_text");
const add_note = document.getElementById("add_note");
const addButton = document.getElementById(".add-button");

add_note.addEventListener("click", () => {
    const text_note = note_text.value;
    const new_task = document.createElement("div")
    newNote.className  = "note";

    note_list.appendChild(new_task)
})