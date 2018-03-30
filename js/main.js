(function () {
  const ProductWrapper = {
    create: function (productInfo) {
      const obj = Object.create(this);
      obj.id = productInfo.id;
      obj.name = productInfo.name;
      obj.hero = productInfo.hero;
      obj.images = productInfo.images;
      obj.links = productInfo.links;
      obj.priceRange = productInfo.priceRange;
      return obj;
    },

    generateLiElm: function () {
      const productLiTemplateElm = document.createElement('template');
      productLiTemplateElm.innerHTML = `
        <li class="product-item" style="background-image: url(${this.hero.href})" title="${this.name}" data-uid="${this.id}">
            <div class="product-price">
                <span class="price-currency">$</span>
                <!--<span class="price-value high">${this.priceHigh}</span>-->
            </div>
        <!-- add link to view slideshow -->
        </li>`;
      return productLiTemplateElm.content;
    },

    },
  };
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

  const setupProductList = (arr) => {
    //TODO: More and better validation.
    if (!Array.isArray(arr)) {
      return false;
    }
    products = arr.map(arrItem => ProductWrapper.create(arrItem));
  };

  const renderProductListAside = () => {
    products.forEach(item => {
      asideProductElm.appendChild(item.generateLiElm());
    });
  };

  fetch('http://localhost/~nazario/com/william-sonoma-vanilla/tmp/data.json',
    fetchHeaders)
    .then(response => response.json())
    .then(data => {
      setAsideTitle(data.name);
      setupProductList(data.groups);
      renderProductListAside();
    })
    .catch(error => console.log(error));
})();