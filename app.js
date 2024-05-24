document.addEventListener('DOMContentLoaded', () => {
    const btnCart = document.querySelector('.container-cart-icon');
    const containerCartProducts = document.querySelector('.container-cart-products');
    const productsList = document.querySelector('.container-items');
    const rowProduct = document.querySelector('.row-product');
    const valorTotal = document.querySelector('.total-pagar');
    const countProducts = document.querySelector('#contador-productos');
    const emptyCartBtn = document.querySelector('.btn-cart-empty');

    let allProducts = [];

    btnCart.addEventListener('click', toggleCart);

    productsList.addEventListener('click', addToCart);

    rowProduct.addEventListener('click', adjustQuantity);

    emptyCartBtn.addEventListener('click', emptyCart);

    function toggleCart() {
        containerCartProducts.classList.toggle('hidden-cart');
    }

    function addToCart(e) {
        if (e.target.classList.contains('btn-card')) {
            const product = e.target.parentElement;
            const infoProduct = {
                quantity: 1,
                title: product.querySelector('h5').textContent,
                price: product.querySelector('h6').textContent
            };

            const exists = allProducts.some(p => p.title === infoProduct.title);
            
            if (exists) {
                allProducts = allProducts.map(p => {
                    if (p.title === infoProduct.title) {
                        p.quantity++;
                    }
                    return p;
                });
            } else {
                allProducts = [...allProducts, infoProduct];
            }
            showCart();   
        } 
    }

    function adjustQuantity(e) {
        if (e.target.classList.contains('btn-restar') || e.target.classList.contains('btn-sumar')) {
            const product = e.target.parentElement;
            const title = product.querySelector('.titulo-producto-carrito').textContent;
            const index = allProducts.findIndex(p => p.title === title);

            if (index !== -1) {
                if (e.target.classList.contains('btn-restar')) {
                    allProducts[index].quantity--;
                    if (allProducts[index].quantity === 0) {
                        allProducts.splice(index, 1);
                    }
                } else if (e.target.classList.contains('btn-sumar')) {
                    allProducts[index].quantity++;
                }
                showCart();
            }
        }
    }

    function emptyCart() {
        allProducts = [];
        showCart();
    }

    function showCart() {
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
    }
});
