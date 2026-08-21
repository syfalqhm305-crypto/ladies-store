const db = window.supabaseClient;

let cart = JSON.parse(localStorage.getItem("cart") || "[]");

function saveCart(){
  localStorage.setItem("cart", JSON.stringify(cart));
}

async function loadProducts(){

  const box = document.querySelector(".products");
  if(!box) return;

  const {data,error} = await db
    .from("products")
    .select("*")
    .eq("active",true);

  if(error){
    console.log(error);
    return;
  }

  box.innerHTML="";

  data.forEach(p=>{

    box.innerHTML += `
    <div class="product-card">

      <img src="${p.image_url || 'https://via.placeholder.com/300'}">

      <h3>${p.name}</h3>

      <p>${p.description || ""}</p>

      <div class="price">
      ${p.price} ريال
      </div>

      <button onclick="addToCart('${p.id}','${p.name}',${p.price})">
      أضف للسلة
      </button>

    </div>
    `;

  });

}


function addToCart(id,name,price){

 cart.push({
  id,
  name,
  price,
  quantity:1
 });

 saveCart();

 alert("تمت إضافة المنتج للسلة 🛒");

}


function showCart(){

 let total=0;

 cart.forEach(i=>{
  total += i.price*i.quantity;
 });


 let box=document.getElementById("cartTotal");

 if(box)
 box.innerHTML="الإجمالي: "+total+" ريال";

}


document.addEventListener("DOMContentLoaded",()=>{

 loadProducts();
 showCart();

});
