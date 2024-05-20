
let searchForm = document.querySelector('.search_form');

document.querySelector(".search-btn").onclick = () => {
      searchForm.classList.toggle("active");
      
      shoppingCart.classList.remove("active");
       userCart.classList.remove("active");
      navbar.classList.remove("active");
}
let shoppingCart = document.querySelector('.shopping_cart');

document.querySelector(".shopping-btn").onclick = () => {
      shoppingCart.classList.toggle("active");
       searchForm.classList.remove("active");
    
       userCart.classList.remove("active");
      navbar.classList.remove("active");
}
let userCart = document.querySelector('.login_form');

document.querySelector(".user-btn").onclick = () => {
      userCart.classList.toggle("active");
       searchForm.classList.remove("active");
      shoppingCart.classList.remove("active");
      
      navbar.classList.remove("active");
}
let navbar= document.querySelector('.navbar');

document.querySelector(".menu-btn").onclick = () => {
      navbar.classList.toggle("active");
       searchForm.classList.remove("active");
      shoppingCart.classList.remove("active");
       userCart.classList.remove("active");
     
}
window.onscroll = () => {
      searchForm.classList.remove("active");
      shoppingCart.classList.remove("active");
       userCart.classList.remove("active");
      navbar.classList.remove("active");
}