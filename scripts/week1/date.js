
// Get the current year
const currentYear = new Date().getFullYear();

// Display the current year in the footer
document.querySelector("#current-year").textContent = currentYear;

// Display the last modified date of the document
document.querySelector("#lastModified").textContent =
    `Last Modified: ${document.lastModified}`;
