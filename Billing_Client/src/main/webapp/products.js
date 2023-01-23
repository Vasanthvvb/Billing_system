//Checking whether the session is active or not
function checkSession(){
  var session = sessionStorage.getItem("token");
  if(!session){
    window.open("index.html","_self");
  }
}

document.querySelector("#userName").innerText = localStorage.getItem("name");

//Product nav
function func_productNav(sel) {
  window.location.href = sel.value;
//   if (sel.options[sel.selectedIndex].text == "View") {
//     getProducts();
//   }
}

//Adding a new product in the database
function addProduct(event) {
  event.preventDefault();
  var sessionToken = sessionStorage.getItem("token");
  var userId = sessionStorage.getItem("userId")

  var productId = document.getElementById("pdId").value;
  var productName = document.getElementById("pdName").value;
  var productQty = document.getElementById("pdQuantity").value;
  var productPrice = document.getElementById("pdPrice").value;
  var productTax = document.getElementById("pdTax").value;
  var productCate = document.getElementById("pdCategory").value;

  if (
    productId != "" && 
    productName != "" &&
    productQty != "" &&
    productPrice != "" &&
    productTax != "" &&
    productCate != ""
  ) {
    
    if(productQty>0 && productPrice>0 && productTax>0){
      const data = {
        id: productId,
        name: productName,
        quantity: productQty,
        price: productPrice,
        tax: productTax,
        category: productCate,
        createdUser: userId,
      };

      let configObj = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "authToken": sessionToken
        },
        body: JSON.stringify(data),
      };

      fetch(
        "http://localhost:8080/Billing_Server/webapi/root/products",
        configObj
      ).then((response) => {
        if (response.status == 200) {
          alert("Product Successfully added.");
          location.reload();
        } else {
          alert("Product Id or Product name already exists");
        }
      });
    }
    else{
      alert("Product data should be greater than zero.")
    }
  } else {
    alert("Please fill all the credentials");
  }
}

//Adding discounts to products
function setDiscount(event){
  event.preventDefault();
  var sessionToken = sessionStorage.getItem("token");
  //var userId = sessionStorage.getItem("userId");

  var category = document.getElementById("category");
  var discount = document.getElementById("discount");
  if(category.value != "" && discount.value != "" && discount.value >= 0){

    const data = {
      category: category.value,
      discountRate: discount.value,
      //userId: userId
    }

    let configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "authToken": sessionToken
      },
      body: JSON.stringify(data),
    };

    fetch(
      "http://localhost:8080/Billing_Server/webapi/root/discountRates",
      configObj
    ).then((response) => {
      if (response.status == 200) {
        alert("Discount percentage updated");
        location.reload();
      } else {
        alert("Failed");
      }
    });
  } else {
    alert("Please fill all the credentials properly");
  }
}

  
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