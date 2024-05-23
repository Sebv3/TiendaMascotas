

document.addEventListener('DOMContentLoaded', () => {
    const btnCart = document.querySelector('.container-cart-icon');
    const containerCartProducts = document.querySelector('.container-cart-products');
    const productsList = document.querySelector('.container-items');
    const rowProduct = document.querySelector('.row-product');
    const valorTotal = document.querySelector('.total-pagar');
    const countProducts = document.querySelector('#contador-productos');
    const emptyCartBtn = document.querySelector('.btn-cart-empty')

    let allProducts = [];

    btnCart.addEventListener('click', () => {
        containerCartProducts.classList.toggle('hidden-cart');
    });


    productsList.addEventListener('click', e => {
        if (e.target.classList.contains('btn-card')) {
            const product = e.target.parentElement;
            const infoProduct = {
                quantity: 1,
                title: product.querySelector('h5').textContent,
                price: product.querySelector('h6').textContent
            };

            const exists = allProducts.some(product => product.title === infoProduct.title);
            
            if (exists) {
                const products = allProducts.map(product => {
                    if (product.title === infoProduct.title) {
                        product.quantity++;
                        return product;
                    } else {
                        return product;
                    }
                });
                allProducts = [...products];
            } else {
                allProducts = [...allProducts, infoProduct];
            }
            showHTML();   
        } 
    });

    rowProduct.addEventListener('click', e => {
        if (e.target.classList.contains('btn-restar')) {
            const product = e.target.parentElement;
            const title = product.querySelector('p').textContent;
            
            const index = allProducts.findIndex(p => p.title === title);
            if (index !== -1) {
                if (allProducts[index].quantity > 1) {
                    allProducts[index].quantity--;
                } else {
                    allProducts.splice(index, 1);
                }
                showHTML();
            }
        }
    });

    rowProduct.addEventListener('click', e => {
        if (e.target.classList.contains('btn-sumar')) {
            const product = e.target.parentElement;
            const title = product.querySelector('p').textContent;
            
            const index = allProducts.findIndex(p => p.title === title);
            if (index !== -1) {
                if (allProducts[index].quantity >= 1) {
                    allProducts[index].quantity++;
                } else {
                    allProducts.splice(index, 1);
                }
                showHTML();
            }
        }
    });

    emptyCartBtn.addEventListener('click', () => {
        allProducts = [];
        showHTML();
    });


    const showHTML = () => {

        rowProduct.innerHTML = '';

        let total = 0;
        let totalOfProducts = 0;

        allProducts.forEach(product => {
            const containerProduct = document.createElement('div');
            containerProduct.classList.add('cart-product');

            containerProduct.innerHTML = `
                <div class="info-cart-products">
                    <span class="cantidad-producto-carrito">${product.quantity}</span>
                    <p class="titulo-producto-carrito">${product.title}</p>
                    <span class="precio-producto-carrito">${product.price}</span>
                </div>  
                <i class="bi bi-dash btn-restar"></i>
                <i class="bi bi-plus btn-sumar"></i>     
            `;

            rowProduct.append(containerProduct);

            total += parseInt(product.quantity * product.price.slice(1).replace(/\./g, ''));
            totalOfProducts += product.quantity;
        });

        valorTotal.innerText = `$${total.toLocaleString('es-CL')}`;
        countProducts.innerText = totalOfProducts;
    };
});

