const htmlInput = document.getElementById("htmlInput");
const previewBtn = document.getElementById("previewBtn");
const previewArea = document.getElementById("previewArea");

previewBtn.onclick = () => {
    previewArea.innerHTML = htmlInput.value;
};