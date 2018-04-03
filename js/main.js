'use strict';

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
        <!-- add link to view slideshow -->
        </li>`;
      return productLiTemplateElm.content;
    },

    generateDetailDisplayElm: function () {
      const productDetailTemplateElm = document.querySelector('#product-detail-tpl');
      productDetailTemplateElm.content.querySelector('.product-title').innerHTML = this.name;
      productDetailTemplateElm.content.querySelector('.product-img img').setAttribute('src', this.hero.href);
      productDetailTemplateElm.content.querySelector('.product-link').setAttribute('href', this.links.www);
      productDetailTemplateElm.content.querySelector('.product-description-text').innerHTML = `
      <p>Candy sesame snaps danish topping wafer. Sweet roll candy topping pudding. Dragée icing wafer macaroon cupcake dessert chupa chups sweet chocolate.</p>
      <p>Gummies jujubes pudding. Topping topping candy jelly fruitcake. Wafer candy chocolate oat cake marshmallow.</p>
      <p>Biscuit cupcake fruitcake liquorice brownie jelly sweet biscuit. Pastry candy carrot cake gummi bears chupa chups ice cream fruitcake wafer liquorice. Candy tart cookie gummi bears. Sweet roll jelly beans candy caramels.</p>
      <p>Gingerbread topping cake biscuit oat cake icing gummi bears sweet roll fruitcake. Chocolate cake chupa chups lollipop biscuit candy bonbon. Cheesecake jelly wafer sesame snaps.</p>`;

      if (this.priceRange && this.priceRange.regular) {
        const productPrice = productDetailTemplateElm.content.querySelector('.product-price');
        if (this.priceRange.regular.low) {
          const low = productDetailTemplateElm.content.querySelector('.product-price .low');
          productPrice.setAttribute('style', 'display: inline-block');
          low.innerHTML = this.priceRange.regular.low;
        }

        if (this.priceRange.regular.high) {
          const high = productDetailTemplateElm.content.querySelector('.product-price .high');
          productPrice.setAttribute('style', 'display: inline-block');
          high.innerHTML = this.priceRange.regular.high;
        }
      }

      // Clear out old stuff.
      // TODO: There should be a better way to do this.
      pageMainElm.innerHTML = '';
      pageMainElm.appendChild(document.importNode(productDetailTemplateElm.content, true));
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
  const pageMainElm = document.querySelector('.page-main');

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

  const displayDetail = (uid) => {
    const product = products.filter(item => item.id === uid);
    if (product.length > 0) {
      currentlySelected = product[0];
      currentlySelected.generateDetailDisplayElm();
    } else {
      // TODO: More elegant way to handel this
      throw new Error('Something bad happened.');
    }
  };

  let currentlySelected = null;

  const init = () => {
    // Add listener to all elements
    asideProductElm.addEventListener('click', (e) => {
      if (e.target.classList.contains('product-item')) {
        const uid = e.target.dataset.uid;
        displayDetail(uid);
      }
    });

    // Get Data
    fetch('./data.json',
      fetchHeaders)
      .then(response => response.json())
      .then(data => {
        setAsideTitle(data.name);
        setupProductList(data.groups);
        renderProductListAside();
      })
      .then(() => {
        asideProductElm.querySelectorAll('.product-item')[0].click();
      })
      .catch(error => console.log(error));
  };
  init();
})();