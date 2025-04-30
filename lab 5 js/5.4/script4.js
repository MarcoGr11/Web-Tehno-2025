const productMap = new Map();
const productHistory = new WeakMap();
const deletedProducts = new WeakSet();
const orderLog = [];

function logAction(action) {
    console.log(`[LOG ${new Date().toLocaleTimeString()}] ${action}`);
}

function addProduct() {
    const name = document.getElementById('name').value;
    const price = parseFloat(document.getElementById('price').value);
    const quantity = parseInt(document.getElementById('quantity').value);
    if (!name || isNaN(price) || isNaN(quantity)) return;

    const product = { name, price, quantity };
    productMap.set(name, product);
    productHistory.set(product, [`Cтворено: ${new Date().toLocaleString()}`]);
    logAction(`Додано продукт: ${name}, ціна: ${price}, кількість: ${quantity}`);
    renderProducts();
}

function deleteProduct(name) {
    if (productMap.has(name)) {
        const product = productMap.get(name);
        deletedProducts.add(product);
        productMap.delete(name);
        logAction(`Видалено продукт: ${name}`);
        renderProducts();
    }
}

function renderProducts() {
    const list = document.getElementById('productList');
    list.innerHTML = '';
    for (let [key, product] of productMap.entries()) {
        const li = document.createElement('li');
        li.textContent = `${product.name}: ${product.price} грн, ${product.quantity} шт.`;
        const delBtn = document.createElement('button');
        delBtn.textContent = 'Видалити';
        delBtn.onclick = () => deleteProduct(product.name);
        li.appendChild(delBtn);
        list.appendChild(li);
    }
}

function searchProduct() {
    const name = document.getElementById('searchName').value;
    const res = document.getElementById('searchResult');
    if (productMap.has(name)) {
        const product = productMap.get(name);
        res.textContent = `Знайдено: ${product.name} - ${product.price} грн, ${product.quantity} шт.`;
        logAction(`Пошук: знайдено продукт "${name}"`);
    } else {
        res.textContent = 'Продукт не знайдено';
        logAction(`Пошук: продукт "${name}" не знайдено`);
    }
}

function placeOrder() {
    const name = document.getElementById('orderName').value;
    const qty = parseInt(document.getElementById('orderQty').value);
    if (productMap.has(name)) {
        const product = productMap.get(name);
        if (product.quantity >= qty) {
            product.quantity -= qty;
            const history = productHistory.get(product) || [];
            const orderRecord = `Замовлено ${qty} шт. продукту "${name}" — ${new Date().toLocaleString()}`;
            history.push(orderRecord);
            orderLog.push(orderRecord);
            productHistory.set(product, history);
            logAction(`Замовлення: ${qty} шт. продукту "${name}". Залишилось: ${product.quantity}`);
            renderProducts();
        } else {
            alert('Недостатня кількість на складі');
            logAction(`Помилка замовлення: недостатньо "${name}" на складі`);
        }
    } else {
        alert('Продукт не знайдено');
        logAction(`Помилка замовлення: продукт "${name}" не знайдено`);
    }
}

function viewOrders() {
    const list = document.getElementById('orderList');
    list.innerHTML = '';
    orderLog.forEach(order => {
        const li = document.createElement('li');
        li.textContent = order;
        list.appendChild(li);
    });
    logAction('Перегляд усіх замовлень');
}
