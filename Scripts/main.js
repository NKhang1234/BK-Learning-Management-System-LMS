class user {
  constructor() {}
  login(useremail, userpass, us) {
    const users = JSON.parse(localStorage.getItem("users"));
    var is_success = false;
    for (let i = 0; i < users.length; i++) {
      if (
        users[i].email === useremail &&
        users[i].pass === userpass &&
        users[i].usertype === us
      ) {
        is_success = true;
        localStorage.setItem("currentUser", JSON.stringify(useremail));
        localStorage.setItem("currentType", JSON.stringify(us));
        if (us === "admin") {
          window.location = "admin.html";
        } else {
          window.location = "user.html";
        }
        break;
      }
    }
    if(!is_success) alert("Wrong email or password");
  }
}
function loginUser() {
  event.preventDefault();
  let useremail = document.getElementById("email").value;
  let userpass = document.getElementById("password").value;
  let us = document.getElementById("user").value;
  let User = new user();
  User.login(useremail, userpass, us);
}
