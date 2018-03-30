(function () {
  //
  const fetchHeaders = {
    method: 'GET',
    headers: {
      'content-type': 'application/json'
    },
    mode: 'no-cors',
    cache: 'default'
  };

  // Elements
  const asideTitleElm = document.querySelector('.aside-title');
  const asideProductElm = document.querySelector('.page-aside .products');

  // Data Structures
  let products = [];

  const setAsideTitle = (title) => {
    asideTitleElm.textContent = title;
  };

  const setProductList = (arr) => {
    if (!Array.isArray(arr)) {
      products = [];
      // Throw an error
      return false;
    }
    products = arr;
  };

  const renderProductListAside = () => {
    products.forEach(product => {
      const productItem = document.createElement('li');
      productItem.setAttribute('id', product.id);
      productItem.setAttribute('class', 'product-item');
      productItem.setAttribute('style', `background-image: url(${product.hero.href}`);
      productItem.setAttribute('name', product.hero.alt);

      const productImage = document.createElement('img');
      productImage.setAttribute('class', 'product-img hero');

      productItem.append(productImage);

      asideProductElm.appendChild(productItem);
    });
  };

  fetch('http://localhost/~nazario/com/william-sonoma-vanilla/tmp/data.json',
    fetchHeaders)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      // products = (data && data.groups) ? data.groups : [];
      setAsideTitle(data.name);
      setProductList(data.groups);
      renderProductListAside();
    })
    .catch(error => console.log(error));
})();