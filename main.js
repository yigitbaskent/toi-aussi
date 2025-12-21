var cart = JSON.parse(localStorage.getItem("cart")) || [];

var activeProduct = {
    title: "",
    img: "",
    price: "",
    size: null
};


function selectSize(el){
    var buttons = document.querySelectorAll(".sizes button");

    for(var i=0;i<buttons.length;i++){
        buttons[i].classList.remove("active");
    }

    el.classList.add("active");
    activeProduct.size = el.innerText;

    document.getElementById("selectedSize").innerText =
        "Seçilen beden: " + activeProduct.size;
}

function addCart(){
    if(activeProduct.size == null){
        alert("Lütfen beden seçiniz");
        return;
    }

    cart.push(activeProduct);
    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Ürün sepete eklendi");
}

<script>

var cart = JSON.parse(localStorage.getItem("cart")) || [];

var cartBox = document.getElementById("cartItems");
var totalBox = document.getElementById("totalPrice");

function loadCart(){
    cartBox.innerHTML = "<h2>Sepetiniz</h2>";

    if(cart.length == 0){
        cartBox.innerHTML += "<p>Sepetiniz boş.</p>";
        totalBox.innerText = "0 TL";
        return;
    }

    var total = 0;

    for(var i = 0; i < cart.length; i++){
        var priceNumber = parseInt(cart[i].price);
        total += priceNumber;

        cartBox.innerHTML += `
        <div class="item">
            <img src="${cart[i].img}">
            <div class="item-info">
                <h3>${cart[i].title}</h3>
                <p>Beden: ${cart[i].size}</p>
                <p>Fiyat: ${cart[i].price}</p>
            </div>
            <button class="delete-btn" onclick="removeItem(${i})">❌ Sil</button>
        </div>
        `;
    }

    totalBox.innerText = total + " TL";
}

function removeItem(index){
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

document.querySelector(".pay-btn").onclick = function(){
    alert("Şu anda bakımdayız. Ödeme işlemi geçici olarak kapalıdır.");
};

loadCart();
</script>
