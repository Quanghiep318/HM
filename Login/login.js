function Homepage() {
  window.location="../Homepage/homepage.html";
}
function Login() {
  window.location="../Login/login.html";
}


// Lấy dữ liệu local về
let users = JSON.parse(localStorage.getItem("users")) || [];
console.log(users);
// Truy vấn các thẻ HTML form cần thiết
let formLogin = document.getElementById("login-form");
let userLogin = document.getElementById("email");
let passLogin = document.getElementById("psw");
// console.log(formLogin, userLogin, passLogin);

// Truy vấn các HTML báo lỗi
let emailErr = document.getElementById("emailErr");
let passErr = document.getElementById("passErr");

// Hàm xóa lỗi
function deleteErr() {
  emailErr.innerText = "";
  passErr.innerText = "";
}

formLogin.onsubmit = function login(e) {
  e.preventDefault();
  //   console.log("kiểm tra");
  let emailLoginValue = emailLogin.value;
  let passLoginValue = passLogin.value;
  // Khai báo biến user bằng việc sử dụng phương thức find() với điều kiện theo username
  // Trả về toàn bộ thông tin (thuộc tính-giá trị) của đối tượng tìm thấy
  let user = users.find((user) => user.email === emailLoginValue);

  if (emailLoginValue == "") {
    emailErr.innerText = "Email đăng nhập không được bỏ trống";
  } else if (!user) {
    deleteErr();
    emailErr.innerText = "Email đăng nhập không tồn tại";
  } else {
    deleteErr();
    if (passLoginValue !== user.password) {
      deleteErr();
      passErr.innerText = "Mật khẩu không đúng";
    } else {
      deleteErr();
      // Nếu đăng nhập thành công thì mọi người chuyển sang trang chủ
      alert("Thành công");
      // Ví dụ:
      //   window.location.href = "trang_sau_khi_dang_nhap.html";
    }
  }
};