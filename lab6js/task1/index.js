const productList = document.getElementById("product-list");
const emptyMessage = document.getElementById("empty-message");
const addProductBtn = document.getElementById("add-product-btn");
const modal = document.getElementById("modal");
const closeModal = document.getElementById("close-modal");
const productForm = document.getElementById("product-form");
const snackbar = document.getElementById("snackbar");
const totalPriceElement = document.getElementById("total-price");
const filterButtons = document.getElementById("filter-buttons");
const resetFilter = document.getElementById("reset-filter");
const sortByPrice = document.getElementById("sort-price");
const sortByCreated = document.getElementById("sort-created");
const sortByUpdated = document.getElementById("sort-updated");
const resetSort = document.getElementById("reset-sort");

let products = [];
let currentId = 1;
let currentFilter = null;
let currentSort = null;

const showSnackbar = (msg) => {
    snackbar.textContent = msg;
    snackbar.className = "show";
    setTimeout(() => snackbar.className = snackbar.className.replace("show", ""), 3000);
};

const updateTotal = () => {
    const total = products.reduce((sum, p) => sum + parseFloat(p.price), 0);
    totalPriceElement.textContent = `${total.toFixed(2)} грн`;
};

const renderProducts = () => {
    productList.innerHTML = "";
    const visibleProducts = products
        .filter(p => !currentFilter || p.category === currentFilter)
        .sort((a, b) => {
            if (currentSort === "price") return a.price - b.price;
            if (currentSort === "created") return new Date(a.createdAt) - new Date(b.createdAt);
            if (currentSort === "updated") return new Date(b.updatedAt) - new Date(a.updatedAt);
            return 0;
        });

    if (visibleProducts.length === 0) {
        emptyMessage.style.display = "block";
    } else {
        emptyMessage.style.display = "none";
        visibleProducts.forEach(p => {
            const card = document.createElement("div");
            card.className = "product-card";
            card.innerHTML = `
        <img src="${p.image}" alt="${p.name}" />
        <h3>${p.name}</h3>
        <p class="price">${p.price} грн</p>
        <p>Категорія: ${p.category}</p>
        <a href="${p.link}" target="_blank">🛒 Переглянути товар</a>
        <button onclick="editProduct(${p.id})">Редагувати</button>
        <button onclick="deleteProduct(${p.id})">Видалити</button>
      `;
            productList.appendChild(card);
        });
    }
    updateTotal();
    renderFilterButtons();
};

const renderFilterButtons = () => {
    const categories = [...new Set(products.map(p => p.category))];
    filterButtons.innerHTML = "";
    categories.forEach(cat => {
        const btn = document.createElement("button");
        btn.textContent = cat;
        btn.onclick = () => {
            currentFilter = cat;
            renderProducts();
        };
        filterButtons.appendChild(btn);
    });
};

const openModal = (product = null) => {
    modal.classList.remove("hidden");
    modal.dataset.editingId = product ? product.id : "";
    productForm.name.value = product ? product.name : "";
    productForm.price.value = product ? product.price : "";
    productForm.category.value = product ? product.category : "";
    productForm.image.value = product ? product.image : "";
    productForm.link.value = product ? product.link : "";
};

const closeModalFn = () => {
    modal.classList.add("hidden");
    productForm.reset();
};

const deleteProduct = (id) => {
    products = products.filter(p => p.id !== id);
    renderProducts();
    showSnackbar("Товар видалено успішно");
};

const editProduct = (id) => {
    const product = products.find(p => p.id === id);
    openModal(product);
};

productForm.onsubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const id = modal.dataset.editingId;
    const now = new Date().toISOString();
    const data = {
        id: id ? parseInt(id) : currentId++,
        name: form.name.value,
        price: parseFloat(form.price.value),
        category: form.category.value,
        image: form.image.value,
        link: form.link.value,
        createdAt: id ? products.find(p => p.id == id).createdAt : now,
        updatedAt: now
    };

    if (id) {
        products = products.map(p => p.id == id ? data : p);
        showSnackbar(`Товар ID ${id} оновлено: ${data.name}`);
    } else {
        products.push(data);
        showSnackbar("Новий товар додано");
    }
    closeModalFn();
    renderProducts();
};

addProductBtn.onclick = () => openModal();
closeModal.onclick = closeModalFn;
resetFilter.onclick = () => { currentFilter = null; renderProducts(); };
sortByPrice.onclick = () => { currentSort = "price"; renderProducts(); };
sortByCreated.onclick = () => { currentSort = "created"; renderProducts(); };
sortByUpdated.onclick = () => { currentSort = "updated"; renderProducts(); };
resetSort.onclick = () => { currentSort = null; renderProducts(); };

renderProducts();
