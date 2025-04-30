// 1. оператори порівняння
function findMinMax(arr) {
    return [Math.min(...arr), Math.max(...arr)];
}

function compareObjects(obj1, obj2) {
    if (Object.keys(obj1).length !== Object.keys(obj2).length) return false;
    for (let key in obj1) {
        if ( obj1[key] !== obj2[key]) return false;
    }
    return true;
}

// 2. логічні оператори
function isInRange(num, min, max) {
    return num >= min && num <= max;
}

function toggleBoolean(value) {
    return !value;
}

// 3. умовні розгалуження
function getGradeDescription(grade) {
    return grade >= 90 ? "відмінно" : grade >= 75 ? "добре" : grade >= 60 ? "задовільно" : "незадовільно";
}

function getSeason(month) {
    return month >= 3 && month <= 5 ? "Весна" : month >= 6 && month <= 8 ? "Літо" : month >= 9 && month <= 11 ? "Осінь" : "Зима";
}

function isPassing(grade) {
    return grade >= 50 ? "Пройшов" : "Не пройшов";
}