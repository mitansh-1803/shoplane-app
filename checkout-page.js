$(document).ready(function(){    
    var productList = localStorage.getItem('product-list') === null ? [] : localStorage.getItem('product-list');
    productList = productList.length > 0 ? JSON.parse(productList) : [];
    function renderProductList(data){
        
        var card = $('<div>').attr('class','checkout-card');
        var productImage = $('<img>').attr({
            src : data.preview,
            alt : data.name + 'image'
        });
        var productImageContainer = $('<div>').append(productImage);

        var productName = $('<h4>').html(data.name);
        var productCount = $('<p>').html('x' + data.count);
        var productPrice = $('<p>').html('Amount: Rs ' + data.price);
        var productInfoContainer = $('<div>').append(productName,productCount,productPrice);
        card.append(productImageContainer,productInfoContainer);

        return card;
    }
    var totalAmount = 0;
    for(var i = 0; i < productList.length; i++){
        $('#product-list-wrapper').append(renderProductList(productList[i]));
        var totalProductAmount = parseInt(productList[i].count) * parseFloat(productList[i].price);
        totalAmount += totalProductAmount;
    }
    $('#total-price').html(totalAmount);
    $('#item-count').html(productList.length);
    
    $('#place-order-btn').click(function(){
        
        var orderedItems = [];
        for(var i = 0; i<productList.length; i++){
            var obj ={
                "id": productList[i].id,
                "brand": productList[i].brand,
                "name": productList[i].name,
                "price": productList[i].price,
                "preview": productList[i].preview,
                "isAccessory": productList[i].isAccessory
            };
            orderedItems.push(obj);
        }
        console.log(orderedItems);
        var data = {
            amount : totalAmount,
            products : orderedItems
        };
        var xhttp = new XMLHttpRequest();
        xhttp.open("POST","https://5d76bf96515d1a0014085cf9.mockapi.io/order",true);
        xhttp.onreadystatechange = function(){
            if(this.readyState == 4){
            alert("Order Placed Successfully!!");
            localStorage.setItem('product-list', []);
            location.assign('./confirm-page.html');
            }
        }
        xhttp.send(data);
    })
})