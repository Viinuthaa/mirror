const htmlInput = document.getElementById("htmlInput");
const previewBtn = document.getElementById("previewBtn");
const previewFrame = document.getElementById("previewFrame");

const viewButtons = document.querySelectorAll(".view-btn");
const checkStatus = document.getElementById("checkStatus");
const issues = document.getElementById("issues");

previewBtn.onclick = () => {
    previewFrame.srcdoc = htmlInput.value;
    previewFrame.onload = checkUI;
};

viewButtons.forEach(button => {
    button.onclick = () => {
        viewButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        previewFrame.style.width =
            button.dataset.width === "100%"
                ? "100%"
                : button.dataset.width + "px";
    };
});

function checkUI() {
    issues.innerHTML = "";

    const document = previewFrame.contentDocument;
    const images = document.querySelectorAll("img");
    const buttons = document.querySelectorAll("button");
    const links = document.querySelectorAll("a");
    const inputs = document.querySelectorAll("input, textarea, select");
    const headings = document.querySelectorAll("h1");

    let problems = 0;

    images.forEach(image => {
        if (!image.hasAttribute("alt")) {
            addIssue("Image is missing alt text.");
            problems++;
        }
    });

    buttons.forEach(button => {
        if (!button.textContent.trim()) {
            addIssue("Button has no visible text.");
            problems++;
        }
    });

    links.forEach(link => {
        if (!link.textContent.trim()) {
            addIssue("Link has no visible text.");
            problems++;
        }
    });

    inputs.forEach(input => {
        if (!input.id || !document.querySelector(`label[for="${input.id}"]`)) {
            addIssue("Form control is missing a label.");
            problems++;
        }
    });

    if (!document.documentElement.lang) {
        addIssue("Page is missing a language attribute.");
        problems++;
    }

    if (headings.length === 0) {
        addIssue("Page is missing a main heading.");
        problems++;
    }

    checkStatus.textContent =
        problems === 0
            ? "No issues found."
            : problems + " issue" + (problems > 1 ? "s" : "") + " found.";
}

function addIssue(message) {
    const issue = document.createElement("p");
    issue.textContent = "⚠ " + message;
    issue.style.marginBottom = "8px";
    issues.appendChild(issue);
}