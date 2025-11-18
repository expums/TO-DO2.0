// пишу коменты чтобы шарить
const modal = document.getElementById("noteModal");
const noteText = document.getElementById("note_text");
const noteList = document.querySelector(".container");
const openModalBtn = document.getElementById("openModal");
const closeModalBtn = document.getElementById("closeModal");
const addNoteBtn = document.getElementById("add_note");
const searchInput = document.querySelector(".search-input");
const filterSelect = document.querySelector(".filter-select");
const themeButton = document.querySelector(".theme-button");

let editingNote = null; // для хранения редакт заметки, так посоветовали китайские друзья

//модалка
openModalBtn.addEventListener("click", function () {
  modal.style.display = "block";
});

closeModalBtn.addEventListener("click", function () {
  modal.style.display = "none";
});

window.addEventListener("click", function (e) {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

// темы
themeButton.addEventListener("click", function () {
  document.body.classList.toggle("dark-theme");
  const isDark = document.body.classList.contains("dark-theme");

  const moonIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M11.1249 0.548798C11.3387 0.917354 11.321 1.3762 11.0791 1.72705C10.3455 2.79152 9.91599 4.08062 9.91599 5.47334C9.91599 9.12428 12.8757 12.084 16.5266 12.084C17.9194 12.084 19.2085 11.6545 20.2729 10.9208C20.6238 10.6791 21.0826 10.6613 21.4512 10.8751C21.8197 11.089 22.0319 11.4962 21.9961 11.9208C21.5191 17.567 16.7867 22 11.0178 22C4.93282 22 0 17.0672 0 10.9822C0 5.21328 4.43301 0.480873 10.0792 0.00392422C10.5038 -0.0319387 10.911 0.180242 11.1249 0.548798ZM8.17985 2.63461C4.70452 3.81573 2.20355 7.10732 2.20355 10.9822C2.20355 15.8502 6.14981 19.7964 11.0178 19.7964C14.8927 19.7964 18.1843 17.2955 19.3654 13.8202C18.4741 14.1232 17.5191 14.2875 16.5266 14.2875C11.6587 14.2875 7.71244 10.3413 7.71244 5.47334C7.71244 4.48086 7.87682 3.52582 8.17985 2.63461Z" fill="#F7F7F7"/></svg>`;
  const sunIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M12.1576 1.15764C12.1576 0.518299 11.6394 0 11 0C10.3606 0 9.84235 0.518299 9.84235 1.15764V1.73887C9.84235 2.37822 10.3606 2.89651 11 2.89651C11.6394 2.89651 12.1576 2.37822 12.1576 1.73887V1.15764ZM18.7782 4.85893C19.2302 4.40683 19.2302 3.67386 18.7782 3.22177C18.3261 2.76969 17.5931 2.76969 17.141 3.22177L16.73 3.63282C16.2779 4.08492 16.2779 4.81789 16.73 5.26998C17.182 5.72206 17.915 5.72206 18.3671 5.26998L18.7782 4.85893ZM4.85889 3.22184C4.40681 2.76976 3.67383 2.76976 3.22175 3.22184C2.76967 3.67393 2.76967 4.4069 3.22175 4.859L3.63273 5.26998C4.08483 5.72206 4.8178 5.72206 5.26989 5.26998C5.72197 4.81789 5.72197 4.08492 5.26989 3.63282L4.85889 3.22184ZM1.15764 9.84235C0.518299 9.84235 0 10.3606 0 11C0 11.6394 0.518299 12.1576 1.15764 12.1576H1.73884C2.37819 12.1576 2.89648 11.6394 2.89648 11C2.89648 10.3606 2.37819 9.84235 1.73884 9.84235H1.15764ZM20.2611 9.84235C19.6217 9.84235 19.1035 10.3606 19.1035 11C19.1035 11.6394 19.6217 12.1576 20.2611 12.1576H20.8424C21.4817 12.1576 22 11.6394 22 11C22 10.3606 21.4817 9.84235 20.8424 9.84235H20.2611ZM5.26989 18.3672C5.72197 17.9151 5.72197 17.1821 5.26989 16.7301C4.8178 16.2779 4.08483 16.2779 3.63273 16.7301L3.22177 17.141C2.76968 17.5931 2.76968 18.3261 3.22176 18.7782C3.67385 19.2302 4.40682 19.2302 4.85892 18.7782L5.26989 18.3672ZM18.3671 16.7301C17.915 16.2779 17.182 16.2779 16.73 16.7301C16.2779 17.1821 16.2779 17.9151 16.73 18.3672L17.1409 18.7782C17.5931 19.2303 18.326 19.2303 18.7782 18.7782C19.2302 18.3261 19.2302 17.5932 18.7782 17.141L18.3671 16.7301ZM12.1576 20.2611C12.1576 19.6217 11.6394 19.1035 11 19.1035C10.3606 19.1035 9.84235 19.6217 9.84235 20.2611V20.8424C9.84235 21.4817 10.3606 22 11 22C11.6394 22 12.1576 21.4817 12.1576 20.8424V20.2611ZM6.36943 11C6.36943 8.4426 8.4426 6.36943 11 6.36943C13.5573 6.36943 15.6305 8.4426 15.6305 11C15.6305 13.5573 13.5573 15.6305 11 15.6305C8.4426 15.6305 6.36943 13.5573 6.36943 11ZM11 4.05415C7.1639 4.05415 4.05415 7.1639 4.05415 11C4.05415 14.8361 7.1639 17.9458 11 17.9458C14.8361 17.9458 17.9458 14.8361 17.9458 11C17.9458 7.1639 14.8361 4.05415 11 4.05415Z" fill="#F7F7F7"/></svg>`;

  if (isDark) {
    themeButton.innerHTML = sunIcon;
  } else {
    themeButton.innerHTML = moonIcon;
  }
});

// добавить и редачить заметку
addNoteBtn.addEventListener("click", function () {
  const text = noteText.value.trim();
  if (!text) return;

  if (editingNote) {
    editingNote.querySelector(".note-text").textContent = text; // редачим существующую
    editingNote = null;
  } else {
    const note = createNoteElement(text); // создание новой
    const separator = createSeparator();

    noteList.insertBefore(note, openModalBtn);
    noteList.insertBefore(separator, openModalBtn);
  }

  noteText.value = "";
  modal.style.display = "none";
});

// создание заметки
function createNoteElement(text) {
  const note = document.createElement("div");
  note.className = "note";
  note.innerHTML = `
    <input type="checkbox" class="note-checkbox">
    <p class="note-text">${text}</p>
    <svg class="note-icon edit-icon" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8.67272 5.99106L2 12.6637V16H5.33636L12.0091 9.32736M8.67272 5.99106L11.0654 3.59837L11.0669 3.59695C11.3962 3.26759 11.5612 3.10261 11.7514 3.04082C11.9189 2.98639 12.0993 2.98639 12.2669 3.04082C12.4569 3.10257 12.6217 3.26735 12.9506 3.59625L14.4018 5.04738C14.7321 5.37769 14.8973 5.54292 14.9592 5.73337C15.0136 5.90088 15.0136 6.08133 14.9592 6.24885C14.8974 6.43916 14.7324 6.60414 14.4025 6.93398L14.4018 6.93468L12.0091 9.32736M8.67272 5.99106L12.0091 9.32736" stroke="#CDCDCD" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    <svg class="note-icon delete-icon" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3.87414 7.61505C3.80712 6.74386 4.49595 6 5.36971 6H12.63C13.5039 6 14.1927 6.74385 14.1257 7.61505L13.6064 14.365C13.5463 15.1465 12.8946 15.75 12.1108 15.75H5.88894C5.10514 15.75 4.45348 15.1465 4.39336 14.365L3.87414 7.61505Z" stroke="#CDCDCD"/>
      <path d="M14.625 3.75H3.375" stroke="#CDCDCD" stroke-linecap="round"/>
      <path d="M7.5 2.25C7.5 1.83579 7.83577 1.5 8.25 1.5H9.75C10.1642 1.5 10.5 1.83579 10.5 2.25V3.75H7.5В2.25Z" stroke="#CDCDCD"/>
      <path d="M10.5 9V12.75" stroke="#CDCDCD" stroke-linecap="round"/>
      <path d="M7.5 9V12.75" stroke="#CDCDCD" stroke-linecap="round"/>
    </svg>
  `;
  return note;
}

// для создания делителя межуду заметок
function createSeparator() {
  const separator = document.createElement("div");
  separator.className = "separator";
  separator.innerHTML =
    "<p>__________________________________________________________</p>";
  return separator;
}

// удаление и редакчтирование
document.addEventListener("click", function (e) {
  // удаление заметки
  if (e.target.closest(".delete-icon")) {
    const note = e.target.closest(".note");
    const separator = note.nextElementSibling;

    if (separator?.classList.contains("separator")) {
      separator.remove();
    }
    note.remove();
  }

  // редактирование
  if (e.target.closest(".edit-icon")) {
    editingNote = e.target.closest(".note");
    noteText.value = editingNote.querySelector(".note-text").textContent;
    modal.style.display = "block";
  }
});

// поиск
searchInput.addEventListener("input", function () {
  const searchText = searchInput.value;

  if (/[^A-Za-zА-Яа-яЁё0-9 ]/.test(searchText)) {
    alert("Только русские, английские буквы и цифры");
    searchInput.value = searchText.replace(/[^A-Za-zА-Яа-яЁё0-9 ]/g, "");
    return;
  }

  const notes = document.querySelectorAll(".note");
  const separators = document.querySelectorAll(".separator");

  notes.forEach(function (note, i) {
    const noteText = note.querySelector(".note-text").textContent;
    const isMatch =
      searchText === "" ||
      noteText.toLowerCase().includes(searchText.toLowerCase());

    note.classList.toggle("display-none", !isMatch);
    separators[i]?.classList.toggle("display-none", !isMatch);
  });
});

// выпад.список
filterSelect.addEventListener("change", function () {
  const filterValue = filterSelect.value;
  const notes = document.querySelectorAll(".note");
  const separators = document.querySelectorAll(".separator");

  notes.forEach(function (note, i) {
    const checkbox = note.querySelector(".note-checkbox");
    let shouldShow = true;

    if (filterValue === "complete") {
      shouldShow = checkbox.checked;
    } else if (filterValue === "incomplete") {
      shouldShow = !checkbox.checked;
    }

    note.classList.toggle("display-none", !shouldShow);
    separators[i]?.classList.toggle("display-none", !shouldShow);
  });
});
