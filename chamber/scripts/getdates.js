
// Display current copyright year
const currentYear = new Date().getFullYear();

document.querySelector("#current-year").textContent = currentYear;

// Display last modified date
const lastModified = document.querySelector("#lastModified");

lastModified.textContent = `Last Modified: ${document.lastModified}`;
