var productList = localStorage.getItem('product-list') === null ? [] : localStorage.getItem('product-list');
productList = productList.length > 0 ? JSON.parse(productList) : [];
var cartProducts = 0;
for(var j = 0; j < productList.length; j++){
    cartProducts += productList[j].count;
}
$('#cart-counter').html(cartProducts);