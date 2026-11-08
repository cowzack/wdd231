
// =====================================
// ZAMBALES CHAMBER OF COMMERCE
// BUSINESS DIRECTORY
// =====================================

const membersContainer = document.querySelector("#members-container");
const gridButton = document.querySelector("#grid-view");
const listButton = document.querySelector("#list-view");

// Membership level names
function getMembershipName(level) {
    switch (level) {
        case 3:
            return "Gold Member";
        case 2:
            return "Silver Member";
        default:
            return "Member";
    }
}

// Fetch business information from JSON
async function getMembers() {
    try {
        const response = await fetch("data/members.json");

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const members = await response.json();

        displayMembers(members);

    } catch (error) {
        console.error("Error loading members:", error);

        membersContainer.textContent =
            "Sorry, the business directory could not be loaded. Please try again later.";
    }
}

// Display business cards
function displayMembers(members) {
    membersContainer.innerHTML = "";

    members.forEach((member) => {

        // Create card
        const card = document.createElement("article");
        card.classList.add("member-card");

        // Business image
        const image = document.createElement("img");
        image.src = `images/members/${member.image}`;
        image.alt = `${member.name} logo`;
        image.loading = "lazy";
        image.width = 130;
        image.height = 100;

        // Business name
        const name = document.createElement("h3");
        name.textContent = member.name;

        // Address
        const address = document.createElement("p");
        address.textContent = `Address: ${member.address}`;

        // Phone
        const phone = document.createElement("p");
        phone.textContent = `Phone: ${member.phone}`;

        // Website
        const website = document.createElement("a");
        website.href = member.website;
        website.textContent = "Visit Website";
        website.target = "_blank";
        website.rel = "noopener noreferrer";

        // Description
        const description = document.createElement("p");
        description.textContent = member.description;

        // Membership
        const membership = document.createElement("span");
        membership.classList.add("membership");
        membership.textContent = getMembershipName(member.membership);

        // Add elements to card
        card.append(
            image,
            name,
            address,
            phone,
            website,
            description,
            membership
        );

        // Add card to directory
        membersContainer.appendChild(card);
    });
}

// Switch to Grid View
gridButton.addEventListener("click", () => {
    membersContainer.classList.remove("list");
    membersContainer.classList.add("grid");

    gridButton.classList.add("active");
    listButton.classList.remove("active");

    gridButton.setAttribute("aria-pressed", "true");
    listButton.setAttribute("aria-pressed", "false");
});

// Switch to List View
listButton.addEventListener("click", () => {
    membersContainer.classList.remove("grid");
    membersContainer.classList.add("list");

    listButton.classList.add("active");
    gridButton.classList.remove("active");

    listButton.setAttribute("aria-pressed", "true");
    gridButton.setAttribute("aria-pressed", "false");
});

// Load directory when page opens
getMembers();
