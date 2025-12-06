function scrollToProducts(){
    window.scrollTo({
        top: window.innerHeight,
        behavior: "smooth"
    });
}


const hero = document.querySelector(".hero");

if(hero){
    hero.addEventListener("mouseenter", ()=>{
        hero.style.transform = "scale(1.03)";
    });

    hero.addEventListener("mouseleave", ()=>{
        hero.style.transform = "scale(1)";
    });
}

<script>
const products = [
  "Oversize Hoodie",
  "Basic T-shirt",
  "Eşofman Altı",
  "Crop Sweathirt"
];


const searchBtn = document.getElementById("searchBtn");
const searchBox = document.getElementById("searchBox");
const searchInput = document.getElementById("searchInput");
const resultBox = document.getElementById("searchResults");
const closeSearch = document.getElementById("closeSearch");

searchBtn.onclick = () => {
  searchBox.style.display = "flex";
  searchInput.focus();
};

closeSearch.onclick = () => {
  searchBox.style.display = "none";
  searchInput.value = "";
  resultBox.innerHTML = "";
};

searchInput.addEventListener("input", () => {
  const value = searchInput.value.toLowerCase();
  resultBox.innerHTML = "";

  if(!value) return;

  products
    .filter(p => p.toLowerCase().includes(value))
    .forEach(item => {
      const li = document.createElement("li");
      li.textContent = item;
      resultBox.appendChild(li);
    });
});
</script>
<script>

// TEMP STORAGE
let activeProduct = {};
let selectedSize = "";

// OPEN PRODUCT
function openProduct(title,img,price,desc){

  document.getElementById("modal").style.display="flex";

  document.getElementById("m-title").innerText=title;
  document.getElementById("m-img").src=img;
  document.getElementById("m-price").innerText=price;
  document.getElementById("m-desc").innerText=desc;

  activeProduct = {
      title,img,price,desc,size:null
  };

  document.getElementById("selectedSize").innerText="";
  document.querySelectorAll(".sizes button")
          .forEach(btn=>btn.classList.remove("active"));
}


function closeModal(){
  document.getElementById("modal").style.display="none";
}


function selectSize(el){
  document.querySelectorAll(".sizes button")
          .forEach(btn=>btn.classList.remove("active"));

  el.classList.add("active");

  selectedSize = el.innerText;

  document.getElementById("selectedSize").innerText =
    "Seçilen beden: " + selectedSize;

  activeProduct.size = selectedSize;
}

function addCart(){

  if(!activeProduct.size){
    alert("Önce beden seç!");
    return;
  }

  let carts = JSON.parse(localStorage.getItem("cart")) || [];

  carts.push(activeProduct);

  localStorage.setItem("cart",JSON.stringify(carts));

  alert("Sepete eklendi 👜");
}

</script>

let selectedSize = null;

// Her ürün için ayrı beden seçimi
function addCart(title, img, price, el){
    const productDiv = el.closest(".product"); // Butonun bulunduğu ürün
    const size = productDiv.dataset.selectedSize;

    if(!size){
        alert("Önce beden seç!");
        return;
    }

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({title, img, price, size});
    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Sepete eklendi 👜");
}
function selectSize(el){
    const container = el.closest(".product");
    container.querySelectorAll(".sizes button").forEach(btn => btn.classList.remove("active"));
    el.classList.add("active");
    container.dataset.selectedSize = el.innerText; // ürün bazlı beden
}
