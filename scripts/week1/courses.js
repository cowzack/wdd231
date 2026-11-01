
const courses = [
    {
        code: "WDD 130",
        subject: "WDD",
        title: "Web Fundamentals",
        credits: 2,
        completed: true
    },
    {
        code: "WDD 131",
        subject: "WDD",
        title: "Dynamic Web Fundamentals",
        credits: 2,
        completed: true
    },
    {
        code: "WDD 231",
        subject: "WDD",
        title: "Web Frontend Development I",
        credits: 3,
        completed: false
    },
    {
        code: "CSE 110",
        subject: "CSE",
        title: "Programming Building Blocks",
        credits: 2,
        completed: true
    },
    {
        code: "CSE 111",
        subject: "CSE",
        title: "Programming with Functions",
        credits: 2,
        completed: true
    },
    {
        code: "CSE 210",
        subject: "CSE",
        title: "Programming with Classes",
        credits: 2,
        completed: false
    },
    {
        code: "CSE 212",
        subject: "CSE",
        title: "Programming with Data Structures",
        credits: 2,
        completed: false
    }
];

// Display courses
function displayCourses(courseList) {
    const container = document.querySelector("#course-container");

    container.innerHTML = "";

    courseList.forEach(course => {
        const card = document.createElement("div");

        card.classList.add("course-card");

        if (course.completed) {
            card.classList.add("completed");
        }

        card.innerHTML = `
            <h3>${course.code}</h3>
            <p>${course.title}</p>
            <p>${course.credits} Credits</p>
            <p>${course.completed ? "Completed ✓" : "Not Completed"}</p>
        `;

        container.appendChild(card);
    });

    // Calculate total credits using reduce()
    const totalCredits = courseList.reduce(
        (total, course) => total + course.credits,
        0
    );

    document.querySelector("#total-credits").textContent = totalCredits;
}

// Display all courses
displayCourses(courses);

// Filter buttons
document.querySelector("#all-courses").addEventListener("click", () => {
    displayCourses(courses);
});

document.querySelector("#wdd-courses").addEventListener("click", () => {
    const wddCourses = courses.filter(course => course.subject === "WDD");
    displayCourses(wddCourses);
});

document.querySelector("#cse-courses").addEventListener("click", () => {
    const cseCourses = courses.filter(course => course.subject === "CSE");
    displayCourses(cseCourses);
});
