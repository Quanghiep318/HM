let openShopping = document.querySelector(".shopping");
let closeShopping = document.querySelector(".closeShopping");
let body = document.querySelector("body");
let list = document.getElementById("list");
openShopping.addEventListener("click", () => {
  body.classList.add("active");
});
closeShopping.addEventListener("click", () => {
  body.classList.remove("active");
});

let products = [
  {
    id: 1,
    name: "PRODUCT NAME 1",
    image: "phan7-1.jpg",
    price: 120000,
  },
  {
    id: 2,
    name: "PRODUCT NAME 2",
    image: "phan7-2.jpg",
    price: 120000,
  },
  {
    id: 3,
    name: "PRODUCT NAME 3",
    image: "phan7-3.jpg",
    price: 220000,
  },
  {
    id: 4,
    name: "PRODUCT NAME 4",
    image: "phan7-4.jpg",
    price: 123000,
  },
  {
    id: 5,
    name: "PRODUCT NAME 5",
    image: "phan7-5.jpg",
    price: 320000,
  },
  {
    id: 6,
    name: "PRODUCT NAME 6",
    image: "phan7-6.jpg",
    price: 120000,
  },
];
// khoi tao ham render
function render(){
    // B1 : in du lieu ra man hinh
// de duyet qua tung phan tu co the dung ham Map va ForEach
products.forEach((element,index)=>{
    // tao HTML element
    let newdiv = document.createElement("div");
    // Set thuoojc tisnh (attribute)
    newdiv.setAttribute("id","item")
    // Cach 1 them attribute class cho item moi
    // newdiv.setAttribute("class","item")
    // Cach 2 classList.add
    newdiv.classList.add("item")
    // them noi udng cho the div vua tao thong qua innerHTML
    newdiv.innerHTML=`<img src="./image/${element.image}" />
    <div class="title">${element.name}</div>
    <div class="price">${element.price}</div>
    <button id = "${element.id}" class = "btn-add">Add To Card</button>`;
    // them newdiv vao the cha co id la lisst
    list.appendChild(newdiv);
} );


}

render();

// xu ly cart 
let cart = JSON.parse(localStorage.getItem("carts")) || [];
// Uy quyen su kieen
list.onclick = function(e){
    // console.log(e.target.classList.contains("btn-add"));
    if(e.target.classList.contains("btn-add")){
        // console.log(e.target.id)
        let id = Number(e.target.id);
        // console.log(id);
        let buyItem = products.find((e) => e.id == id);
        // console.log(buyItem);
        // them 1 bien amountcho doi tuong BuyItem
        // Kiem tra trong mang cart neu nhu nhu chua tn tai trong cart
        // thi cho amount la 1
        // Neu ton tai thi amount them 1 don vi 
        // Cách 1 : sử dụng kỹ thuật cắm cờ
        // let checkCart = -1;
        // for(let i = 0; i < cart.length; i++){
        //   if(buyItem.id == cart[i].id){
        //     checkCart = i;
        //   }
        // }
        // // ra ngoài vòng for kiểm tra điều kiện biến check cart
        // if(checkCart ==-1){
        //   // thêm thuộc tinh cho doi tương
        //   buyItem.count = 1;
        //   cart.push(buyItem);

 
        // } else{
        //   cart[checkCart].count += 1
        // }
        // console.log("Sau khi thêm sản phẩm", cart);
        // 
        // Cách 2 : Sử dụng hàm findIndex, find để kiểm tra tồn tại trong giỏ hàng
        let findIndex = cart.findIndex((e) => buyItem.id == e.id);
        console.log(findIndex);
        if(findIndex == -1){
          buyItem.count = 1;
          cart.push(buyItem);
        } else {
          cart[findIndex].count += 1;
        }
        console.log("Sau khi thêm sản phẩm", cart);
        // them dữ liêu cart lên localStorage
        localStorage.setItem("carts", JSON.stringify(cart));
        // Xử lý in số lượng sản phẩm có trong giở hàng
        let quantity = document.getElementById("quantity");
        quantity.innerText = cart.length; 
        
        renderCart();
      }
};

// Viết hàm render dữ liệu trong cart ra bên giỏ hàng
let listCard = document.getElementById("list-card");
// Khởi tạo hàm renderCart - hàm in dữ liệu giỏ hàng
function renderCart() {
  listCard.innerHTML = "";
  cart.forEach((e) => {
    // Bước 1: Tạo mới thẻ li
    let li = document.createElement("li");
    // Bước 2: Gán nội dung cho thẻ li vừa tạo mới
    li.innerHTML = `<div><img src="./image/${e.image}" /></div>
            <div>${e.name}</div>
            <div>${e.price}</div>
            <div>
              <button id="${e.id}" class = "btn-minus">-</button>
              <div class="count">${e.count}</div>
              <button id="${e.id}" class = "btn-add">+</button>
            </div>
            <button id="${e.id}" class = "btn-delete">Delete</button>`;
    //Bước 3: Thêm li vào trong thẻ cha ul
    listCard.appendChild(li);
  });
}
// Thực thi hàm in giỏ hàng
// renderCart();

// Xử lý in số lượng sản phẩm có trong giở hàng
// let quantity = document.getElementById("quantity");
// quantity.innerText = cart.length;
// Bước 1: ủy quyền sự kiện cho listCard
listCard.onclick = function (e) {
  // Bắt sự kiện với nút trừ
  if (e.target.classList.contains("btn-minus")) {
    let minusId = Number(e.target.id);
    // Tìm vị trí index của sản phẩm muốn giảm số lượng (count-1)
    let findIndex = cart.findIndex((e) => minusId == e.id);
    console.log(findIndex);
    // Update lại số lượng của sản phẩm trong giỏ hàng
    // Nếu sản phẩm có số lượng bằng 0 => xóa khỏi giỏ hàng
    // Nếu sản phẩm có số lượng lớn hơn 0 => thì trừ đi -1
    if (cart[findIndex].count == 1) {
      cart.splice(findIndex, 1);
    } else {
      cart[findIndex].count -= 1;
    }
    // Cập nhật lại dữ liệu lên localStorage
    localStorage.setItem("carts", JSON.stringify(cart));
    // Xử lý in số lượng sản phẩm có trong giỏ hàng
    let quantity = document.getElementById("quantity");
    quantity.innerText = cart.length;
    // Render lại dữ liệu trong giỏ hàng
    renderCart();
  }
  // Bắt sự kiện với nút cộng
  if (e.target.classList.contains("btn-add")) {
    console.log("Đây là nút cộng");
  }
  // Bắt sự kiện với nút xóa
  if (e.target.classList.contains("btn-delete")) {
    // console.log("Đây là nút xóa");
    // console.log(e.target.id); => trả về id kiểu dữ liệu string
    let deleteId = Number(e.target.id);
    // Tìm vị trị index của sản phẩm muốn xóa trong giỏ hàng
    let findIndex = cart.findIndex((e) => deleteId == e.id);
    console.log(findIndex);
    // Xóa phần tử trong mảng cart theo chỉ số index
    cart.splice(findIndex, 1);
    console.log("Sau khi xóa sản phẩm", cart);
    // Cập nhật lại dữ liệu lên localStorage
    localStorage.setItem("carts", JSON.stringify(cart));
    // Xử lý in số lượng sản phẩm có trong giỏ hàng
    let quantity = document.getElementById("quantity");
    quantity.innerText = cart.length;
    // Render (in lại dữ liệu) lại cart
    renderCart();
  }
};