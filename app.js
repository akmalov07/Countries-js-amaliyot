const formElement = document.querySelector("#form");
const searchInput = document.querySelector("#search");
const flagsList = document.querySelector("#flags_list");
const modeBtn = document.querySelector("#mode");
const body = document.body;
const header = document.querySelector("header");
const form = document.querySelector("form");

const API_URL = "https://restcountries.com/v3.1/all";

let isDark = true;

modeBtn.addEventListener("click", () => {
    isDark = !isDark;

    if (isDark) {
        body.classList.remove("bg-white", "text-black");
        body.classList.add("bg-[#202C36]", "text-white");

        header.classList.remove("bg-white", "text-black");
        header.classList.add("bg-[#2B3844]", "text-white");

        form.classList.remove("bg-gray-200", "text-black");
        form.classList.add("bg-[#2B3844]", "text-white");

        modeBtn.textContent = "Ertalab Rejim";
    } else {
        body.classList.remove("bg-[#202C36]", "text-white");
        body.classList.add("bg-white", "text-black");

        header.classList.remove("bg-[#2B3844]", "text-white");
        header.classList.add("bg-white", "text-black");

        form.classList.remove("bg-[#2B3844]", "text-white");
        form.classList.add("bg-gray-200", "text-black");

        modeBtn.textContent = "Night Mode";
    }
});

function showData(data) {
    flagsList.innerHTML = data
        .map(
            (country) => `
        <li class="w-full pb-[44px] bg-[#2B3844] dark:bg-gray-200 rounded-[5px] md:w-[40%] lg:w-[30%] xl:w-[23%]">
            <img src="${country.flags.png}" alt="${country.name.common}" class="w-full h-[200px] rounded-tl-[5px] rounded-tr-[5px]">
            <h3 class="text-[18px] mt-[20px] text-center">${country.name.common}</h3>
        </li>
    `
        )
        .join("");
}

async function getData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const data = await response.json();
        showData(data);

        searchInput.addEventListener("input", (e) => {
            const searchValue = e.target.value.toLowerCase();
            if (searchValue) {
                const filteredCountries = data.filter((country) =>
                    country.name.common.toLowerCase().includes(searchValue)
                );
                showData(filteredCountries);
            } else {
                showData(data);
            }
        });
    } catch (error) {
        console.error("Error fetching data:", error.message);
    } finally {
        console.log("Fetch attempt finished");
    }
}

getData(API_URL);
