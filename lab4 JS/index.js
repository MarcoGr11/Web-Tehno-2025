// Завдання 1
function task1() {
    console.log("Завдання - 1")
    let fruits = ["яблуко", "банан", "апельсин", "виноград"];
    console.log("Оригінальний масив:", fruits);

    fruits.pop();
    console.log("Після видалення останнього елемента:", fruits);

    fruits.unshift("ананас");
    console.log("Після додавання ананасу:", fruits);

    fruits.sort().reverse();
    console.log("Відсортований у зворотному порядку:", fruits);

    console.log("Індекс яблука:", fruits.indexOf("яблуко"));
}

task1();

// Завдання 2
function task2() {
    console.log("Завдання - 2")
    let colors = ["червоний", "синій", "зелений", "жовтий", "синій світлий"];
    console.log("Оригінальний масив:", colors);

    let longest = colors.reduce((a, b) => (a.length > b.length ? a : b));
    console.log("Найдовший елемент:", longest);

    colors = colors.filter(color => color.includes("синій"));
    console.log("Фільтрований масив:", colors);

    console.log("Об'єднаний рядок:", colors.join(", "));
}

task2();

// Завдання 3
function task3() {
    console.log("Завдання - 3")
    let employees = [
        { name: "Іван", age: 30, position: "розробник" },
        { name: "Марія", age: 25, position: "тестувальник" },
        { name: "Петро", age: 35, position: "розробник" }
    ];

    employees.sort((a, b) => a.name.localeCompare(b.name));
    console.log("Відсортовані працівники:", employees);

    console.log("Розробники:", employees.filter(e => e.position === "розробник"));

    employees = employees.filter(e => e.age !== 30);
    console.log("Після видалення працівника:", employees);

    employees.push({ name: "Олена", age: 28, position: "менеджер" });
    console.log("Після додавання нового працівника:", employees);
}

task3();

// Завдання 4
function task4() {
    console.log("Завдання - 4")
    let students = [
        { name: "Андрій", age: 22, course: 3 },
        { name: "Олексій", age: 20, course: 2 },
        { name: "Марина", age: 21, course: 3 }
    ];

    students = students.filter(s => s.name !== "Олексій");
    console.log("Після видалення Олексія:", students);

    students.push({ name: "Сергій", age: 23, course: 4 });
    console.log("Після додавання студента:", students);

    students.sort((a, b) => b.age - a.age);
    console.log("Відсортовані студенти за віком:", students);

    console.log("Студент 3-го курсу:", students.find(s => s.course === 3));
}

task4();

// Завдання 5
function task5() {
    console.log("Завдання - 5")
    let numbers = [2, 5, 8, 10, 15];

    let squared = numbers.map(n => n ** 2);
    console.log("Квадрати чисел:", squared);

    let evenNumbers = numbers.filter(n => n % 2 === 0);
    console.log("Парні числа:", evenNumbers);

    let sum = numbers.reduce((acc, num) => acc + num, 0);
    console.log("Сума чисел:", sum);

    let additionalNumbers = [20, 25, 30, 35, 40];
    numbers = numbers.concat(additionalNumbers);
    console.log("Оновлений масив:", numbers);

    numbers.splice(0, 3);
    console.log("Після видалення перших 3 елементів:", numbers);
}

task5();

// Завдання 6
function libraryManagement() {
    console.log("Завдання - 6")
    let books = [
        { title: "Книга 1", author: "Автор 1", genre: "Фантастика", pages: 200, isAvailable: true },
        { title: "Книга 2", author: "Автор 2", genre: "Детектив", pages: 150, isAvailable: false }
    ];

    function addBook(title, author, genre, pages) {
        books.push({ title, author, genre, pages, isAvailable: true });
    }

    function removeBook(title) {
        books = books.filter(b => b.title !== title);
    }

    function findBooksByAuthor(author) {
        return books.filter(b => b.author === author);
    }

    function toggleBookAvailability(title, isBorrowed) {
        let book = books.find(b => b.title === title);
        if (book) book.isAvailable = !isBorrowed;
    }

    function sortBooksByPages() {
        books.sort((a, b) => a.pages - b.pages);
    }

    function getBooksStatistics() {
        return {
            totalBooks: books.length,
            availableBooks: books.filter(b => b.isAvailable).length,
            borrowedBooks: books.filter(b => !b.isAvailable).length,
            averagePages: books.reduce((sum, b) => sum + b.pages, 0) / books.length
        };
    }

    addBook("Книга 3", "Автор 3", "Роман", 300);
    console.log("Статистика книг:", getBooksStatistics());
}

libraryManagement();

// Завдання 7
function task7() {
    console.log("Завдання - 7")
    let student = {
        name: "Василь",
        age: 21,
        course: 2
    };

    student.subjects = ["Математика", "Програмування", "Фізика"];
    delete student.age;
    console.log("Оновлений об'єкт:", student);
}

task7();
