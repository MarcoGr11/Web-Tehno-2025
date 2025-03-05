// завдання 1: сума перших 50 натуральних чисел (while)
function sumFirst50() {
    let sum = 0;
    let i = 1;
    while (i <= 50) {
        sum += i;
        i++;
    }
    console.log("Завдання 1: Сума перших 50 натуральних чисел =", sum);
}
sumFirst50();

// завдання 2: факторіал введеного числа (for)
function factorial(n) {
    if (n < 0) return "Некоректне число";
    let fact = 1;
    for (let i = 1; i <= n; i++) {
        fact *= i;
    }
    console.log(`Завдання 2: Факторіал ${n} дорівнює`, fact);
}
factorial(5); // змінне число

// завдання 3: визначення місяця за введеним числом (switch)
function getMonth(num) {
    let month;
    switch (num) {
        case 1: month = "Січень"; break;
        case 2: month = "Лютий"; break;
        case 3: month = "Березень"; break;
        case 4: month = "Квітень"; break;
        case 5: month = "Травень"; break;
        case 6: month = "Червень"; break;
        case 7: month = "Липень"; break;
        case 8: month = "Серпень"; break;
        case 9: month = "Вересень"; break;
        case 10: month = "Жовтень"; break;
        case 11: month = "Листопад"; break;
        case 12: month = "Грудень"; break;
        default: month = "Невірне число";
    }
    console.log(`Завдання 3: Місяць номер ${num} - це ${month}`);
}
getMonth(3); // змінне число

// завдання 4: сума парних чисел у масиві
function sumEvenNumbers(arr) {
    let sum = arr.filter(num => num % 2 === 0).reduce((acc, num) => acc + num, 0);
    console.log("Завдання 4: Сума парних чисел =", sum);
}
sumEvenNumbers([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

// завдання 5: кількість голосних у рядку (стрілкова функція)
const countVowels = str => {
    let vowels = "аеєиіїоуюяАЕЄИІЇОУЮЯ";
    let count = [...str].filter(char => vowels.includes(char)).length;
    console.log("Завдання 5: Кількість голосних у рядку =", count);
};
countVowels("привіт  Як у тебе справИ , що поробляєш "); // змінний рядок

// завдання 6: піднесення base до степеня exponent
function power(base, exponent) {
    console.log(`Завдання 6: ${base} в степені ${exponent} =`, Math.pow(base, exponent));
}
power(2, 3);
