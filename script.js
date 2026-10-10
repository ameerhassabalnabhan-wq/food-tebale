
const weekDays = [
    {
        name: "الأحد",
        morning: "حواضر",
        lunch: "غداء العمال",
        evening: "مقلوبة",
        night: "حواضر"
    },
    {
        name: "الاثنين",
        morning: "كوكتيل",
        lunch: "غداء العمال",
        evening: "فتة دجاج",
        night: "حواضر"
    },
    {
        name: "الثلاثاء",
        morning: "بيض مقلي",
        lunch: "غداء العمال",
        evening: "رز وبازلاء",
        night: "حواضر"
    },
    {
        name: "الأربعاء",
        morning: "كوكتيل",
        lunch: "غداء العمال",
        evening: "ملوخية ورز",
        night: "حواضر"
    },
    {
        name: "الخميس",
        morning: "كوكتيل",
        lunch: "غداء العمال",
        evening: "اختياري",
        night: "حواضر"
    },
    {
        name: "الجمعة",
        morning: "حمص بزيت",
        lunch: "شيش مشوي",
        evening: "بيتزا",
        night: "حواضر"
    },
    {
        name: "السبت",
        morning: "بيض مقلي",
        lunch: "غداء العمال",
        evening: "كريسبي",
        night: "حواضر"
    }
];

const mealTimes = [
    { key: "morning", label: "8 الصبح" },
    { key: "lunch", label: "12 الظهر" },
    { key: "evening", label: "5 المغرب" },
    { key: "night", label: "8 العشاء" }
];

const todayIndex = new Date().getDay();
const today = weekDays[todayIndex];

const dateElement = document.getElementById("current-date");
const titleElement = document.getElementById("today-title");
const todayMealsElement = document.getElementById("today-meals");
const daysListElement = document.getElementById("days-list");

dateElement.textContent = new Date().toLocaleDateString("ar-IQ", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
});

titleElement.textContent = "وجبات يوم " + today.name;

function createMealCard(label, mealName, isLunch = false) {
    const card = document.createElement("div");
    card.className = "meal-card";

    const time = document.createElement("span");
    time.className = "meal-time";
    time.textContent = label;

    const name = document.createElement("div");
    name.className = "meal-name";

    if (isLunch) {
        const options = document.createElement("div");
        options.className = "lunch-options";

        const workersMeal = document.createElement("span");
        workersMeal.textContent = mealName;

        const orWord = document.createElement("span");
        orWord.className = "or-word";
        orWord.textContent = "أو";

        const alternative = document.createElement("span");
        alternative.className = "alternative";
        alternative.textContent = "رز بالماجي";

        options.append(workersMeal, orWord, alternative);
        name.appendChild(options);
    } else {
        name.textContent = mealName;
    }

    card.append(time, name);
    return card;
}

function fillMeals(container, day) {
    mealTimes.forEach((mealTime) => {
        const isLunch =
            mealTime.key === "lunch" &&
            day.name !== "الجمعة";

        container.appendChild(
            createMealCard(
                mealTime.label,
                day[mealTime.key],
                isLunch
            )
        );
    });
}

// عرض وجبات اليوم الحالي
fillMeals(todayMealsElement, today);

// عرض باقي الأيام مع الأسهم
weekDays.forEach((day, index) => {
    if (index === todayIndex) {
        return;
    }

    const details = document.createElement("details");
    details.className = "day-item";

    const summary = document.createElement("summary");

    const dayLabel = document.createElement("span");
    dayLabel.className = "day-label";
    dayLabel.textContent = day.name;

    summary.appendChild(dayLabel);
    details.appendChild(summary);

    const mealsContainer = document.createElement("div");
    mealsContainer.className = "day-meals";

    fillMeals(mealsContainer, day);

    details.appendChild(mealsContainer);
    daysListElement.appendChild(details);
});
