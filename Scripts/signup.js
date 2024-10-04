let users = JSON.parse(localStorage.getItem("users")) || [];
class user {
  constructor() {}
  validate(email, pass) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z0-9\d@$!%*?&]{8,}$/;
    // Contain at least 1 number, 1 uppercase, 1 lowercase, 1 special digit and at least 8 digits.
    if (!email.match(emailRegex)) {
      alert("Wrong email format");
      return false;
    } else if (!pass.match(passRegex)) {
      alert("The password must contain at least 1 number, 1 uppercase letter, 1 lowercase letter, 1 special character and at least 8 characters");
      return false;
    }
    for(let i = 0; i< users.length;++i) {
      if (users[i].email === email) {
        alert("The email has been used by another user");
        return false;
      } else if (users[i].pass === pass) {
        alert("The password has been used by another user");
        return false;
      }
    }
    return true;
  }
  signup(useremail, userpass, usertype) {
    if (this.validate(useremail, userpass)) {
      this.email = useremail;
      this.pass = userpass;
      this.usertype = usertype;
      users.push(this);
      localStorage.setItem("users", JSON.stringify(users));
      localStorage.setItem("currentUser", JSON.stringify(useremail));
      localStorage.setItem("currentType", JSON.stringify(usertype));
      if (usertype == "student") {
        window.location = "user.html";
      } else {
        window.location = "admin.html";
      }
    } else {
      alert("Please fill the form again");
    }
  }
}
//   console.log(users);
function signupUser() {
  event.preventDefault();
  let useremail = document.getElementById("email").value;
  let userpass = document.getElementById("password").value;
  let usertype = document.getElementById("user").value;
  let User = new user();
  User.signup(useremail, userpass, usertype);
}
