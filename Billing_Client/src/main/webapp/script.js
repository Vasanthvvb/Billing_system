var userId = document.getElementById("userid");
var password = document.getElementById("password");

function authentication(event){
  event.preventDefault();
  var sessionToken = sessionStorage.getItem("token")

  const data = {
    userName: userId.value,
    password: password.value,
  };

  let configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "authToken": sessionToken,
    },
    body: JSON.stringify(data)
  };  

  fetch("http://localhost:8080/Billing_Server/webapi/root/login_", configObj)
    .then(response => {
      // console.log(response)
      if(response.status == 200){
        response.json().then(data => {
          sessionStorage.setItem("token", data.sessionId);
          sessionStorage.setItem("userId", data.adminId);
          localStorage.setItem("name", data.adminName);
          userId.value = ""
          password.value = ""
          window.location.href = "home.html";
        })
      }
      else{
        alert("Invalid Username or Password");
      }
    })
    .catch(error => {
      console.log(error)
    })
}
