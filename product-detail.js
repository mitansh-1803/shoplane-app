$(document).ready(function(){
    var  productId = window.location.search.split('=')[1];
    var currentObj = null;
    $.get('https://5d76bf96515d1a0014085cf9.mockapi.io/product/' + productId,function(productObject){
        currentObj = productObject;
        function renderPreviewImages(url,pos){
            var image = $('<img>').attr({
                class :'preview-image',
                src : url,
                attr : productObject.name + 'image'
            })
            if(pos == 0){
                image.addClass('active');
            }
            image.click(function(){
                $('.preview-image').removeClass('active');
                image.addClass('active');
                previewImage.attr('src',url);
            })
            return image;
        }
        var leftDivision = $('<div>').attr('class','left-column');
        var previewImage = $('<img>').attr({
            src : productObject.preview,
            alt : productObject.name + 'image'
        })
        leftDivision.append(previewImage);

        var rightDivision = $('<div>').attr('class','right-column');
        var productName = $('<h1>').html(productObject.name);
        var productBrand =$('<h4>').html(productObject.brand);
        productBrand.attr('class','brand');
        var price = $('<span>').html(productObject.price);
        var productPrice = $('<h3>').html('Price: Rs ');
        productPrice.append(price);
        
        var description = $('<h3>').html('Description');
        var descriptionPara = $('<p>').attr('class','description');
        descriptionPara.html(productObject.description);
        var descriptionDivision = $('<div>').append(description,descriptionPara);
        
        var productPreview = $('<h3>').html('Product Preview');
        var previewImageContainer = $('<div>').attr('class','product-preview');
        var previewContainer = $('<div>').append(productPreview,previewImageContainer);
        for(var i = 0; i < productObject.photos.length;i++){
            previewImageContainer.append(renderPreviewImages(productObject.photos[i],i))
        }

        var addToCartButton = $('<button>').attr('id','add-to-cart-btn');
        addToCartButton.html('Add to Cart');
        rightDivision.append(productName,productBrand,productPrice,descriptionDivision,previewContainer,addToCartButton)

        $('#product-detail-container').append(leftDivision,rightDivision);
        
        $('#add-to-cart-btn').click(function(){
            $('#add-to-cart-btn').addClass('clicked');
            setTimeout(function(){
                $('#add-to-cart-btn').removeClass('clicked');
            },200);
            
            var productList = localStorage.getItem('product-list') === null ? [] : localStorage.getItem('product-list');
            productList = productList.length > 0 ? JSON.parse(productList) : [];
            var pos = -1;
            for(var i = 0; i < productList.length; i++){
                if(productList[i].id == currentObj.id){
                    pos = i;
                }
            }
            if(pos > -1){
                productList[pos].count++;
                localStorage.setItem('product-list',JSON.stringify(productList));
            }
            else{
                currentObj.count = 1;
                productList.push(currentObj);
                localStorage.setItem('product-list',JSON.stringify(productList));        
            }
            var cartProducts = 0;
            for(var j = 0; j < productList.length; j++){
                cartProducts += productList[j].count;
            }
            $('#cart-counter').html(cartProducts);
        })
    })

})