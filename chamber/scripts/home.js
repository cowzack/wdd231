
// ==========================================
// ZAMBALES CHAMBER OF COMMERCE HOME PAGE
// ==========================================

// OpenWeatherMap API settings
const API_KEY = "17002de450c47bcf8b54aa0135ab8857";

// Coordinates for Iba, Zambales
const LATITUDE = 15.327;
const LONGITUDE = 119.978;

// ==========================================
// BUSINESS SPOTLIGHTS
// ==========================================

async function loadSpotlights() {
    const container = document.querySelector("#spotlights-container");

    try {
        const response = await fetch("data/members.json");

        if (!response.ok) {
            throw new Error("Unable to load member data.");
        }

        const members = await response.json();

        // Select only Gold (3) and Silver (2) members
        const eligibleMembers = members.filter(member =>
            member.membership === 2 || member.membership === 3
        );

        // Shuffle the eligible members randomly
        for (let i = eligibleMembers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));

            [eligibleMembers[i], eligibleMembers[j]] =
                [eligibleMembers[j], eligibleMembers[i]];
        }

        // Display up to three random members
        const selectedMembers = eligibleMembers.slice(0, 3);

        container.innerHTML = "";

        selectedMembers.forEach(member => {
            const card = document.createElement("article");
            card.classList.add("spotlight-card");

            const membershipLevel =
                member.membership === 3 ? "Gold Member" : "Silver Member";

            const image = document.createElement("img");
            image.src = `images/members/${member.image}`;
            image.alt = `${member.name} logo`;
            image.loading = "lazy";

            image.onerror = () => {
                image.alt = "Business logo unavailable";
                image.src = "images/chamber-logo.jpg";
            };

            const name = document.createElement("h3");
            name.textContent = member.name;

            const description = document.createElement("p");
            description.textContent = member.description;

            const phone = document.createElement("p");
            phone.textContent = `Phone: ${member.phone}`;

            const address = document.createElement("p");
            address.textContent = `Address: ${member.address}`;

            const membership = document.createElement("p");
            membership.textContent = `Membership: ${membershipLevel}`;

            const website = document.createElement("a");
            website.href = member.website;
            website.textContent = "Visit Website";
            website.target = "_blank";
            website.rel = "noopener noreferrer";

            card.append(
                image,
                name,
                description,
                phone,
                address,
                membership,
                website
            );

            container.appendChild(card);
        });

        if (selectedMembers.length === 0) {
            container.textContent = "No Gold or Silver members available.";
        }

    } catch (error) {
        console.error("Spotlight Error:", error);
        container.textContent = "Unable to load business spotlights.";
    }
}

// ==========================================
// WEATHER INFORMATION
// ==========================================

async function loadWeather() {
    const container = document.querySelector("#weather-container");

    try {
        if (API_KEY === "YOUR_OPENWEATHERMAP_API_KEY") {
            throw new Error("Please add your OpenWeatherMap API key.");
        }

        const currentURL =
            `https://api.openweathermap.org/data/2.5/weather?lat=${LATITUDE}&lon=${LONGITUDE}&appid=${API_KEY}&units=metric`;

        const forecastURL =
            `https://api.openweathermap.org/data/2.5/forecast?lat=${LATITUDE}&lon=${LONGITUDE}&appid=${API_KEY}&units=metric`;

        const [currentResponse, forecastResponse] = await Promise.all([
            fetch(currentURL),
            fetch(forecastURL)
        ]);

        if (!currentResponse.ok || !forecastResponse.ok) {
            throw new Error("Weather data could not be retrieved.");
        }

        const currentData = await currentResponse.json();
        const forecastData = await forecastResponse.json();

        // Current weather
        const currentTemperature = Math.round(currentData.main.temp);
        const description = currentData.weather[0].description;
        const icon = currentData.weather[0].icon;

        // Display current weather
        const currentWeather = document.createElement("div");
        currentWeather.classList.add("current-weather");

        const heading = document.createElement("h3");
        heading.textContent = "Current Weather";

        const temperature = document.createElement("p");
        temperature.textContent = `${currentTemperature}°C`;

        const weatherDescription = document.createElement("p");
        weatherDescription.textContent =
            description.charAt(0).toUpperCase() + description.slice(1);

        const weatherIcon = document.createElement("img");
        weatherIcon.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
        weatherIcon.alt = description;

        currentWeather.append(
            heading,
            weatherIcon,
            temperature,
            weatherDescription
        );

        // ======================================
        // THREE-DAY FORECAST
        // ======================================

        const forecastSection = document.createElement("div");
        forecastSection.classList.add("forecast-section");

        const forecastHeading = document.createElement("h3");
        forecastHeading.textContent = "3-Day Temperature Forecast";

        forecastSection.appendChild(forecastHeading);

        // Group forecast entries by date
        const dailyForecasts = {};

        forecastData.list.forEach(item => {
            const date = new Date(item.dt * 1000);
            const dateKey = date.toLocaleDateString("en-CA");

            if (!dailyForecasts[dateKey]) {
                dailyForecasts[dateKey] = [];
            }

            dailyForecasts[dateKey].push(item);
        });

        // Exclude today and get the next three days
        const today = new Date().toLocaleDateString("en-CA");

        const nextThreeDays = Object.keys(dailyForecasts)
            .filter(date => date > today)
            .sort()
            .slice(0, 3);

        nextThreeDays.forEach(dateKey => {
            const dayEntries = dailyForecasts[dateKey];

            // Find the forecast closest to 12 noon
            const middayForecast = dayEntries.reduce((closest, item) => {
                const hour = new Date(item.dt * 1000).getHours();
                const closestHour =
                    new Date(closest.dt * 1000).getHours();

                return Math.abs(hour - 12) <
                    Math.abs(closestHour - 12) ? item : closest;
            });

            const temperatures = dayEntries.map(item => item.main.temp);

            const minTemperature = Math.round(Math.min(...temperatures));
            const maxTemperature = Math.round(Math.max(...temperatures));

            const forecastDate = new Date(`${dateKey}T12:00:00`);

            const dayName = forecastDate.toLocaleDateString("en-US", {
                weekday: "long"
            });

            const forecastCard = document.createElement("article");
            forecastCard.classList.add("forecast-card");

            const day = document.createElement("h4");
            day.textContent = dayName;

            const forecastIcon = document.createElement("img");
            forecastIcon.src =
                `https://openweathermap.org/img/wn/${middayForecast.weather[0].icon}@2x.png`;
            forecastIcon.alt = middayForecast.weather[0].description;

            const forecastTemperature = document.createElement("p");
            forecastTemperature.textContent =
                `High: ${maxTemperature}°C | Low: ${minTemperature}°C`;

            forecastCard.append(
                day,
                forecastIcon,
                forecastTemperature
            );

            forecastSection.appendChild(forecastCard);
        });

        container.innerHTML = "";
        container.append(currentWeather, forecastSection);

    } catch (error) {
        console.error("Weather Error:", error);

        container.textContent =
            "Weather information is currently unavailable. Please try again later.";
    }
}

// ==========================================
// LOAD HOME PAGE CONTENT
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
    loadSpotlights();
    loadWeather();
});
