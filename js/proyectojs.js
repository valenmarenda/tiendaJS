// Estilos y animaciones

// Navbar sticky ver si se puede hacer con transicion
$(document).ready(function(){
  let alturaNav = $('.nav-bar1').offset().top;
  $(window).on('scroll', function(){
      if ($(window).scrollTop()> alturaNav){
          $('.nav-bar1').addClass('menu-fixed');
      }
      else {
          $('.nav-bar1').removeClass('menu-fixed');
      }
  })
});



//Animaciones en título
$('.header2').hide().fadeIn(5000);

//Animación btn Shop
$('.btn-shop').hover(function(){
    $('.btn-shop').addClass('animate__pulse');
})

//Animación btn Shop
$('.btn-header').hover(function(){
  $('.btn-header').addClass('animate__pulse');
})


// Carrito de compras
const itemsProductos = document.getElementById('items-productos')
const items = document.getElementById('items')
const footer =  document.getElementById('footer-carrito')
const templateCard = document.getElementById('template-card').content
const templateFooter = document.getElementById('template-footer').content
const templateCarrito = document.getElementById('template-carrito').content
const fragment = document.createDocumentFragment() 
let carrito = {}

document.addEventListener('DOMContentLoaded', () => {
  fetchData()
  if(localStorage.getItem('carrito')) {
    carrito = JSON.parse(localStorage.getItem('carrito'))
    marcarCarrito()
  }
})
itemsProductos.addEventListener('click', e => {
  addCarrito(e); 
  $('.btn-shop').addClass('animate__pulse')
})
items.addEventListener('click', e =>{
  btnAccion(e);
})
const fetchData = async () => {
  try {
      const res = await fetch ('data.json')
      const data = await res.json()
     // console.log(data)
      marcarCards(data)
  } catch (error) {
      console.log(error)
  }
}

const marcarCards = data => {
  data.forEach(product => {
    templateCard.querySelector('h5').textContent = product.producto
    templateCard.querySelector('p').textContent = product.precio
    templateCard.querySelector('h4').textContent = product.tipo
    templateCard.querySelector('.product-item').setAttribute("category", product.tipo)
    templateCard.querySelector('img').setAttribute("src", product.img) 
    templateCard.querySelector('.item-button').dataset.id = product.id
    const clone = templateCard.cloneNode(true)
    fragment.appendChild(clone)
  })
  itemsProductos.appendChild(fragment)
}

const addCarrito = e => {

  if (e.target.classList.contains('item-button')){
    setCarrito(e.target.parentElement)
  }
  e.stopPropagation()
}
const setCarrito = objeto =>{
  //console.log(objeto)
  const producto = {
    id: objeto.querySelector('.item-button').dataset.id,
    title: objeto.querySelector('h5').textContent,
    precio: objeto.querySelector('p').textContent,
    cantidad: 1
  }
  if (carrito.hasOwnProperty(producto.id)){
    producto.cantidad = carrito[producto.id].cantidad + 1
  }
  carrito[producto.id] = {...producto}
  marcarCarrito()
}

const marcarCarrito = () => {
 // console.log(carrito)
  items.innerHTML = ''
  Object.values(carrito).forEach(producto => {
    templateCarrito.querySelector('th').textContent = producto.id
    templateCarrito.querySelectorAll('td')[0].textContent = producto.title
    templateCarrito.querySelectorAll('td')[1].textContent = producto.cantidad
    templateCarrito.querySelector('.btn-info').dataset.id = producto.id
    templateCarrito.querySelector('.btn-danger').dataset.id = producto.id
    templateCarrito.querySelector('span').textContent = producto.cantidad * producto.precio
    const clone = templateCarrito.cloneNode(true)
    fragment.appendChild(clone)
  })

  items.appendChild(fragment)

  marcarFooter()

  localStorage.setItem('carrito', JSON.stringify(carrito))
}

const marcarFooter = () => {
  footer.innerHTML =''
  if (Object.keys(carrito).length === 0){
    footer.innerHTML = `
    <th scope="row" colspan="5">Carrito vacío - comience a comprar!</th>
    `
    return
  }
  const nCantidad = Object.values(carrito).reduce((acc, { cantidad }) => acc + cantidad,0)
  const nPrecio = Object.values (carrito).reduce((acc,{cantidad, precio}) => acc + cantidad * precio ,0)
  
  templateFooter.querySelectorAll('td')[0].textContent = nCantidad
  templateFooter.querySelector('span').textContent = nPrecio

  const clone = templateFooter.cloneNode(true)
  fragment.appendChild(clone)
  footer.appendChild(fragment)

  const btnVaciar = document.getElementById('vaciar-carrito')
  btnVaciar.addEventListener('click',() => {
    carrito = {}
    marcarCarrito()
  })
}

const btnAccion = e => {
 // console.log(e.target)
  //aumento la cantidad
  if(e.target.classList.contains('btn-info')) {
    //console.log(carrito[e.target.dataset.id])
   // carrito[e.target.dataset.id]
   const producto = carrito[e.target.dataset.id]
   producto.cantidad = carrito[e.target.dataset.id].cantidad + 1
   carrito[e.target.dataset.id] = {...producto}
   marcarCarrito()
  }
  if(e.target.classList.contains('btn-danger')){
    const producto = carrito[e.target.dataset.id]
    producto.cantidad --
    if(producto.cantidad === 0) {
      delete carrito[e.target.dataset.id]
    }
    marcarCarrito()
  }
  e.stopPropagation()
}


// filtrado de productos tienda
$(document).ready(function(){
  //color al filtro todos
  $('.category-list .category-item[category="all"]').addClass('category-item-active');
  $('.category-item').click(function(){
    var categoryProduct = $(this).attr('category');
    //console.log(categoryProduct);
    // color al filtro seleccionado
    $('.category-item').removeClass('category-item-active');
    $(this).addClass('category-item-active');
    //ocultar productos
    $('.product-item').hide();
    //mostrar productos
    $('.product-item[category="'+categoryProduct+'"]').show();
    });

    $('.category-item[category="all"]').click(function(){
      $('.product-item').show();
    });

});






















 
      
