const htmlInput = document.getElementById("htmlInput");
const previewBtn = document.getElementById("previewBtn");
const previewArea = document.getElementById("previewArea");

const viewButtons = document.querySelectorAll(".view-btn");

previewBtn.onclick = () => {
    previewArea.innerHTML = htmlInput.value;
};

viewButtons.forEach(button => {
    button.onclick = () => {
        viewButtons.forEach(btn => btn.classList.remove("active"));

        button.classList.add("active");

        if (button.dataset.width === "100%") {
            previewArea.style.width = "100%";
        } else {
            previewArea.style.width = button.dataset.width + "px";
        }
    };
});