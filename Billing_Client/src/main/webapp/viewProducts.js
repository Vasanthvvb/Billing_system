//Checking whether the session is active or not
function checkSession(){
  var session = sessionStorage.getItem("token");
  if(!session){
    window.open("index.html","_self");
  }
  else{
    getProducts();
  }
}

document.querySelector("#userName").innerText = localStorage.getItem("name");

//Product nav
function func_productNav(sel) {
    window.location.href = sel.value;
}

//Getting all the products from the database
var productObj = {};

function getProducts() {
  var sessionToken = sessionStorage.getItem("token");
  let configObj = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "authToken": sessionToken
    },
  };

  fetch("http://localhost:8080/Billing_Server/webapi/root/products", configObj)
  .then((response) => {
    return response;
  })
  .then((res) => {
    res.json().then(data => {
        productObj = data
        //console.log(productObj)
    })
    .then(() => {
      viewProducts();
    })
  });
}

//View the product data in the table format
var table_body = document.querySelector(".table-body")
function viewProducts() {
    //var col = Object.keys(productObj[0]).length-2;
    for(var i=0; i<productObj.length; i++) {
      var row = table_body.insertRow(i);
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      var cell3 = row.insertCell(2);
      var cell4 = row.insertCell(3);
      var cell5 = row.insertCell(4);
      var cell6 = row.insertCell(5);
      var cell7 = row.insertCell(6);

      cell1.innerText = productObj[i].category
      cell2.innerText = productObj[i].id
      cell3.innerText = productObj[i].name
      cell4.innerText = productObj[i].price
      cell5.innerText = productObj[i].quantity
      cell6.innerText = productObj[i].tax

      var btn = document.createElement('input');
      btn.type = "button";
      btn.className = "btn";
      btn.id = i;
      btn.value = "EDIT";
      cell7.appendChild(btn);
    }
    func();
}


//Updating Product Details
var table = document.querySelector('.table');
var updateForm = document.getElementById('updateForm');
updateForm.style.display = "none";

var pdId = document.getElementById('pdId');
var pdName = document.getElementById('pdName');
var pdPrice = document.getElementById('pdPrice');
var pdQuantity = document.getElementById('pdQuantity');
var pdTax = document.getElementById('pdTax');
var pdCategory;
function func(){
    var edit_btn = document.querySelectorAll(".btn");
    for(let i=0; i<productObj.length; i++){
        edit_btn[i].addEventListener('click', () => {
            document.querySelector(".wrapper").style.width = "80%"
            table.style.width = "100%"
            table.style.marginLeft = "1rem"
            updateForm.style.display = "block"
            pdCategory = table_body.rows[i].cells[0].innerText
            pdId.value = table_body.rows[i].cells[1].innerText;
            pdName.value = table_body.rows[i].cells[2].innerText;
            pdPrice.value = table_body.rows[i].cells[3].innerText;
            pdQuantity.value = table_body.rows[i].cells[4].innerText;
            pdTax.value = table_body.rows[i].cells[5].innerText;
        })
    }
}


function updateProduct(event){
  event.preventDefault();

  if(pdQuantity.value != "" && pdPrice.value != "" && pdTax.value != ""){
    if(pdQuantity.value>=0 && pdPrice.value>0 && pdTax.value>0){
      var sessionToken = sessionStorage.getItem("token");
      var userId = sessionStorage.getItem("userId");

      const data = {
        id: pdId.value,
        name: pdName.value,
        quantity: pdQuantity.value,
        price: pdPrice.value,
        tax: pdTax.value,
        category: pdCategory,
        modifiedUser: userId
      };

      let configObj = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "authToken": sessionToken
      },
      body: JSON.stringify(data),
      };

      fetch(
      `http://localhost:8080/Billing_Server/webapi/root/products/${pdId.value}`,configObj
      ).then((response) => {
      if (response.status == 200) {
        alert("Product Details Updated");
        location.reload();
      } 
      else{
        alert("Something wrong");
      }
      });
    }
    else{
      alert("Product data should be greater than zero.");
    }
  }  else{
  alert("Please fill all the credentials");
  }
}

//Getting Discount Details
var discountObj = {}
function getDiscount(){
  var sessionToken = sessionStorage.getItem("token");

  let configObj = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "authToken": sessionToken
    }
  };

  fetch("http://localhost:8080/Billing_Server/webapi/root/discountRates"
  ,configObj)
  .then((response) => {
    response.json().then(data => {
        discountObj = data
        viewDiscount();
    })
  })
}
//Viewing Discount Details
var viewDis = document.getElementById("viewDis");
var viewPro = document.getElementById("viewPro");
var discountView = document.querySelector(".discountView");
var container = document.querySelector(".container");

function viewDiscount(){
  for(let i=0; i<discountObj.length; i++){
    viewDis.style.display = "none";
    viewPro.style.display = "block";
    discountView.style.display = "flex";
    container.style.display = "none";
    var div = document.createElement("div");
    var p_1 = document.createElement('p');
    var p_2 = document.createElement('p');
    p_1.innerHTML = `CATEGORY : ${discountObj[i].category}`; 
    p_2.innerHTML = `DISCOUNT : ${discountObj[i].discountRate}%`;
    div.appendChild(p_1);
    div.appendChild(p_2);
    
    document.querySelector(".discountView").appendChild(div);
  }
}
//Viewing Product Details
viewPro.addEventListener('click', () => {
  while (discountView.hasChildNodes()) {
    discountView.removeChild(discountView.firstChild);
  }
  viewPro.style.display = "none";
  viewDis.style.display = "block";
  container.style.display = "flex"
  discountView.style.display = "none";
  
})


//Logging out
var logoutBtn = document.getElementById("logout");
logoutBtn.addEventListener('click', () => {
  var sessionToken = sessionStorage.getItem("token");

  let configObj = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "authToken": sessionToken
    }
  };

  fetch(`http://localhost:8080/Billing_Server/webapi/root/logout_/${sessionToken}`
  ,configObj)
  .then((response) => {
    if(response.status == 200){
      sessionStorage.clear();
      localStorage.clear();
      window.open("index.html", "_self");
      //alert("Logged out successfully");
    }
    else{
      alert("Something wrong");
    }
  })
})