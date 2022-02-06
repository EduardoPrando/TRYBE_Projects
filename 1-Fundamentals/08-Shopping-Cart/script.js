const urlLoading = 'https://api.mercadolibre.com/sites/MLB';

const shopCart = document.querySelector('.cart__items');

const selectClassItems = document.querySelector('.items');

const emptyButton = document.querySelector('.empty-cart');

const loading = document.querySelector('.loading');

const appendItem = (object, querySelected) => querySelected.appendChild(object);

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

const removeLoading = () => {
  loading.remove();
  const back = document.querySelector('.back');
  back.style.opacity = '100%';
};

const totalPriceSting = document.querySelector('.total-price');

const calculatePrice = () => {
  const listOfItems = document.querySelectorAll('.cart__item');
  let totalItemsPrice = 0;
  listOfItems.forEach((value) => {
    const splitValue = value.innerText.split('$')[1];
    totalItemsPrice += Number(splitValue);
    totalItemsPrice.toFixed(2);
  });
  totalPriceSting.innerText = totalItemsPrice;
};

const localStorageSetItemFunction = () => {
  localStorage.setItem('ShopCart', shopCart.innerHTML);
  calculatePrice();
};

const localStorageGetItemFunction = () => {
  shopCart.innerHTML = localStorage.getItem('ShopCart');
};

function cartItemClickListener(event) {
  event.target.remove();
  localStorageSetItemFunction();
}

shopCart.addEventListener('click', cartItemClickListener);

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  return li;
}

const buttonEventCart = async (event) => {
  const buttonClickId = getSkuFromProductItem(event.target.parentNode);
  const response = await (await fetch(`https://api.mercadolibre.com/items/${buttonClickId}`))
  .json();
  await appendItem(createCartItemElement(response), shopCart);
  localStorageSetItemFunction();
};

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ id: sku, title: name, thumbnail: image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'))
  .addEventListener('click', buttonEventCart);
  return section;
}

// ============ MY CODE: ============

const getLinkJson = async () => {
  setTimeout(() => removeLoading(), 3000);
  const response = await (await fetch(`${urlLoading}/search?q=computador)`)).json();
  return response;
};

const creatListOfProducts = async () => {
  const itemsLink = await getLinkJson();
  itemsLink.results.forEach((product) => {
    appendItem(createProductItemElement(product), selectClassItems);
});
};

const cleanCartList = () => {
  document.querySelector('.cart__items').innerHTML = '';
  localStorageSetItemFunction();
};

emptyButton.addEventListener('click', cleanCartList);

// ==================================

window.onload = async () => {
  creatListOfProducts();
  localStorageGetItemFunction();
};
