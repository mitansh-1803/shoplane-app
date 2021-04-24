$(document).ready(function(){
    $('.responsive').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        dots: true,
        arrows: false,
    });

    var clothesHeading = $('<h2>').html('Clothing for Men and Women');
    var clothesSection = $('<div>').attr('id','clothes-section');
    var accessoriesHeading = $('<h2>').html('Accessories for Men and Women');
    var accessoriesSection = $('<div>').attr('id','accessories-section');
    $('#clothing').append(clothesHeading,clothesSection);
    $('#accessories').append(accessoriesHeading,accessoriesSection);
    
    function renderProductCards(productData){
        var productCard = $('<div>').attr('class','card');
        var productLink = $('<a>').attr('href', "product-detail.html?p=" + productData.id);
        var productImage = $('<img>').attr({
            src : productData.preview,
            alt : productData.name
        });
        productLink.append(productImage);
        var productDetails = $('<div>').attr('class','details');
        var productName = $('<h3>').html(productData.name);
        var productBrand = $('<h4>').html(productData.brand);
        var productPrice = $('<h5>').html('Rs ' + productData.price);
        productDetails.append(productName,productBrand,productPrice);
        productCard.append(productLink,productDetails);
        return productCard;
    }
    $.get("https://5d76bf96515d1a0014085cf9.mockapi.io/product",function(productsData){
        for(var i = 0; i < productsData.length; i++){
            var card =  renderProductCards(productsData[i]);
            if(!productsData[i].isAccessory){
                $('#clothes-section').append(card);
            }
            else{
                $('#accessories-section').append(card);
            }
        }
    })
})