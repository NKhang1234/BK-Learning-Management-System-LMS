
let data = JSON.parse(localStorage.getItem("users")) || [];
let sData = JSON.parse(localStorage.getItem("users")) || [];
class userList {
  constructor() {}
  showUserList() {
    display(data);
    function display(data) {
      document.querySelector(".user-list").innerHTML = "";
      data.forEach((elem, index) => {
        let div = document.createElement("div");
        div.classList.add("details");
        div.innerHTML = `
        <p>${elem.email}</p>
          <p>${elem.pass}</p>
          <p>${elem.usertype}</p>
        `;
        let div2 = document.createElement("div");
        let p = document.createElement("p");
        p.setAttribute("id", "remove");
        p.innerText = "Remove";
        p.addEventListener("click", () => {
          removeUser(elem, index);
        });
        div2.append(p);
        div.appendChild(div2);
        document.querySelector(".user-list").append(div);
      });
    }
    function removeUser(elem, index) {
      data.splice(index, 1);
      localStorage.setItem("users", JSON.stringify(data));
      display(data);
    }
  }
  addStudentData(e, p, t) {
    
    this.email = e;
    this.pass = p;
    this.usertype = t;
    data.push(this);
    localStorage.setItem("users", JSON.stringify(data));
    this.showUserList();
  }
}
function showUser() {
  let list = new userList();
  list.showUserList();
}
showUser();

function validate(email, pass) {
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
  for(let i = 0; i< data.length;++i) {
    if (data[i].email === email) {
      alert("The email has been used by another user");
      return false;
    } else if (data[i].pass === pass) {
      alert("The password has been used by another user");
      return false;
    }
  }
  return true;
}

function addStudent() {
  event.preventDefault();
  let e = document.getElementById("email").value;
  let p = document.getElementById("pass").value;
  let t = document.getElementById("type").value;

  if(validate(e,p)) {
    let student = new userList();
    student.addStudentData(e, p, t);
  } else {
    alert("Please fill the information again");
  }
}
function showData() {
  let emailData = JSON.parse(localStorage.getItem("currentUser"));
  let userData = JSON.parse(localStorage.getItem("currentType"));
  document.querySelector(".guest").innerHTML = `
    <p>${emailData} (${userData})</p>
    `;
}
showData();
