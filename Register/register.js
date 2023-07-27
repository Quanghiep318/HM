// Lấy các phần tử HTML cần thiết
let registerForm = document.getElementById("form");
let emailInput = document.getElementById("email");
let passwordInput = document.getElementById("psw");
let dateInput = document.getElementById("date");
let nameInput = document.getElementById("name");
let name1Input = document.getElementById("name1");
let sexSelect = document.getElementById("sex");
let postCodeInput = document.getElementById("postCode");

// console.log(
//   registerForm,
//   emailInput,
//   passwordInput,
//   dateInput,
//   nameInput,
//   name1Input
//   sexSelect,
//   postCodeInput,
// );
// Lấy các phần tử HTML để hiển thị thông báo lỗi
let emailError = document.getElementById("emailError");
let passwordError = document.getElementById("passwordError");
let dateError = document.getElementById("dateError");
// console.log(emailError, passwordError, dateError);
// Hàm xóa lỗi
function deleteError() {
  emailError.innerText = "";
  passwordError.innerText = "";
  dateError.innerText = "";
}
// Hàm kiểm tra định dạng email (search trên mạng)
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
// Tạo ra 1 mảng để chứa đối tượng email khi khởi tạo thành công
let email = JSON.parse(localStorage.getItem("email")) || [];
// Hàm kiểm tra trùng username trong mảng users
function checkEmail(emailValue) {
  // Tìm index của user có userName trùng với username được truyền vào
  let findEmailIndex = email.findIndex((email) => user.email === email);
  // Nếu tìm thấy user có userName trùng với username được truyền vào, trả về true, ngược lại trả về false
  return findEmailIndex !== -1;
}

// Sự kiện onsubmit - submit
registerForm.onsubmit = function register(e) {
  e.preventDefault(); // ngăn chặn cách xử lý mặc định của trình duyệt khi xảy ra sự kiện
  // console.log("kiểm tra");
  // Lấy giá trị trong input
  let emailValue = emailInput.value;
  let passwordValue = passwordInput.value;
  let dateValue = dateInput.value;
  let nameValue = nameInput.value;
  let name1Value = name1Input.value;
  let sexValue = sexSelect.value;
  let postCodeValue = postCodeInput.value;
  
  // console.log(usernameValue, emailValue, passwordValue, passwordRepeatValue);
  if (checkEmail(emailValue)) {
    emailError.innerText = "Email đã tồn tại";
  } else if (emailValue === "") {
    emailError.innerText = "Không được để trống Email";
  } else {
    deleteError();
    if (isValidEmail(dateValue)) {
      deleteError();
      if (passwordValue.length >= 6) {
        deleteError();
        if (passwordRepeatValue == passwordValue) {
          deleteError();
          // Tạo ra newUser để lưu thông tin của người dùng mới đăng ký
          let newUser = {
            id: Math.floor(Math.random() * 10000000),
            email: emailValue,
            password: passwordValue,
            date: dateValue,
            name: nameValue,
            name1: name1Value,
            sex: sexValue,
            postCode: postCodeValue,
            isLogin = fail,

          };
          user.push(newUser);
          // Lưu dữ liệu lên local
          localStorage.setItem("key", JSON.stringify(value));
          // Chuyển hướng đến trang đăng nhập sau khi đăng ký thành công
          window.location.href = "../Login/login.html";
        } 
      } else {
        passwordError.innerText = "Mật khẩu không đúng định dạng";
      }
     }// else {
    //   dateError.innerText = "date chua nhap";
    // }
  }
};


function Homepage() {
  window.location="../Homepage/homepage.html";
}