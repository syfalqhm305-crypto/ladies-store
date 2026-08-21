const supabaseClient = window.supabase.createClient(
  window.SUPABASE_URL,
  window.SUPABASE_ANON_KEY
);


let cart = [];


async function loadProducts(){

const box=document.getElementById("products");

const {data,error}=await supabaseClient
.from("products")
.select("*")
.eq("active",true);


if(error){
console.log(error);
return;
}


box.innerHTML="";


data.forEach(product=>{


box.innerHTML += `

<div class="card">

<img src="${product.image_url || 'https://via.placeholder.com/300'}">

<h3>${product.name}</h3>

<p>${product.description || ""}</p>

<div class="price">
${product.price} ريال
</div>


<button onclick="addCart(
'${product.id}',
'${product.name}',
${product.price}
)">
إضافة للسلة
</button>


</div>

`;


});


}



function addCart(id,name,price){

cart.push({
id,
name,
price,
qty:1
});


updateCart();


}



function updateCart(){

document.getElementById("cartCount").innerHTML=cart.length;


let box=document.getElementById("cartItems");

let total=0;


box.innerHTML="";


cart.forEach(item=>{


total += item.price;


box.innerHTML += `

<div class="cart-item">

${item.name}

<br>

${item.price} ريال

</div>

`;


});


document.getElementById("total").innerHTML=
"الإجمالي: "+total+" ريال";


}



function openCart(){

document.getElementById("cartBox")
.classList.add("show");

}


function closeCart(){

document.getElementById("cartBox")
.classList.remove("show");

}



function checkout(){

document.getElementById("cartBox")
.classList.remove("show");


document.getElementById("orderBox")
.classList.add("show");


}



async function sendOrder(){


let gender =
document.getElementById("gender").value;


let order = {

customer_name:
document.getElementById("name").value,


phone:
document.getElementById("phone").value,


gender,


address:
document.getElementById("address").value,


payment_method:
document.getElementById("payment").value,


notes:
document.getElementById("notes").value,


total:
cart.reduce((a,b)=>a+b.price,0),


items:cart


};



let {error}=await supabaseClient
.from("orders")
.insert(order);



if(error){

alert("حدث خطأ");

console.log(error);

return;

}



alert("تم إرسال الطلب بنجاح ✅");


window.location.reload();


}



function track(){

let code=prompt("ادخل رقم التتبع");

if(code){

alert(
"سيتم إضافة صفحة التتبع قريباً"
);

}

}



loadProducts();
