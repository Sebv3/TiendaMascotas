function enviarFormulario() {
    var nombre, apellido, correo, telefono, mensaje, error;

    nombre = document.getElementById('nombre').value;
    apellido = document.getElementById('apellido').value;
    correo = document.getElementById('correo').value;
    telefono = document.getElementById('telefono').value;
    mensaje = document.getElementById('mensaje').value;
    expresion = /\w+@\w+\.+[a-z]/;

    if(nombre === null || nombre === ''
        ||apellido === null || apellido === ''
        ||correo === null || correo === ''
        ||telefono === null || telefono === ''
        ||mensaje === null || mensaje === '') {
        alert("Todos los campos son obligatorios");
        return false;
    }
    
    else if (nombre.length > 30) {
        alert("El nombre es muy largo");
        return false;
    }

    else if(!expresion.test(correo)) {
        alert("El correo no es válido");
        return false;
    }

    else if(isNaN(telefono)) {
        alert("El telefono ingresado no es válido");
        return false;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const btnCart = document.querySelector('.container-cart-icon');
    const containerCartProducts = document.querySelector('.container-cart-products');
    const productsList = document.querySelector('.container-items');
    const rowProduct = document.querySelector('.row-product');
    const valorTotal = document.querySelector('.total-pagar');
    const countProducts = document.querySelector('#contador-productos');

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
        if (e.target.classList.contains('icon-close')) {
            const product = e.target.parentElement;
            const title = product.querySelector('p').textContent;
            
            allProducts = allProducts.filter(product => product.title !== title);
            showHTML();
        }
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
                <i class="bi bi-x-lg icon-close"></i>       
            `;

            rowProduct.append(containerProduct);

            total += parseInt(product.quantity * product.price.slice(1).replace(/\./g, ''));
            totalOfProducts += product.quantity;
        });

        valorTotal.innerText = `$${total.toLocaleString('es-CL')}`;
        countProducts.innerText = totalOfProducts;
    };

});
