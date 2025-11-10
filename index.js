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




