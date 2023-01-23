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

var container1 = document.querySelector(".top-container");
var container2 = document.querySelector(".bottom-container");
var container3 = document.querySelector(".pay-container");
var cusName = document.getElementById("cusName");
var phone = document.getElementById("phone");
var select = document.getElementById("pdName");
var productId = document.getElementById("pdId");
var productQuantity = document.getElementById("pdQuantity");
var productPrice = document.getElementById("pdPrice");
var addBtn = document.getElementById("add_btn");
var billTotal = document.getElementById("total");
var saveBtn = document.getElementById("saveBtn");

var cardholder = document.getElementById("cardholder");
var cardnumber = document.getElementById("cardnumber");
var expiryDate = document.getElementById("expiryDate");
var cvv = document.getElementById("cvv");
var fetchedAmount = document.getElementById("fetch_amount");


//Product nav
function func_productNav(sel) {
  window.location.href = sel.value;
}

//Getting all the products from the database
var productObj = {};

function getProducts() {
  var sessionToken = sessionStorage.getItem("token")
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
      res.json().then((data) => {
        productObj = data;
        //console.log(productObj)
        get_productName();
      });
    });
  //function call to get discount details
  getDiscountRate();
}

//Getting product discount details
var discountObj = {};
function getDiscountRate() {
  var sessionToken = sessionStorage.getItem("token")
  let configObj = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "authToken": sessionToken
    },
  };

  fetch(
    "http://localhost:8080/Billing_Server/webapi/root/discountRates",
    configObj
  )
    .then((response) => {
      return response;
    })
    .then((res) => {
      res.json().then((data) => {
        discountObj = data;
        //console.log(discountObj)
      });
    });
}

//Product name dropdown
function get_productName() {
  for (let i = 0; i < productObj.length; i++) {
    var option = document.createElement("option");
    option.text = productObj[i].name;
    option.value = i;
    select.appendChild(option);
  }
}

//Auto fill product details based on selected name
var category;
var tax;
var maxQuantity;
function getDetails(select) {
  productName = select.options[select.selectedIndex].text;
  for (let i = 0; i < productObj.length; i++) {
    if (Object.values(productObj[i])[4] == productName) {
      if(productObj[i].quantity != 0){
        addBtn.disabled = false;
        productQuantity.disabled = false;
        productId.value = productObj[i].id;
        productQuantity.value = 1;
        productPrice.value = productObj[i].price;
        category = productObj[i].category;
        tax = productObj[i].tax;
        maxQuantity = productObj[i].quantity;
      break;
      }
      else{
        addBtn.disabled = true;
        productId.value = productObj[i].id;
        productQuantity.value = 0;
        productQuantity.disabled = true;
        productPrice.value = "Out of Stock";
        break;
      }
    }
  }
}

//Adding items to the bill
var table = document.getElementById("table");
var table_body = document.querySelector(".table-body");
var totalamount = 0;
var balance;
var proId = [];
var proQty = [];
var proTax = [];
var userId = sessionStorage.getItem("userId");
//var sNo = 1;

function addtoBill() {

  var flag = false;

  if (select.options[select.selectedIndex].text != "Product Name") 
  {
    if(productQuantity.value <= maxQuantity){
      var name = select.options[select.selectedIndex].text;
      var id = productId.value;
      var qty = productQuantity.value;
      var price = productPrice.value;
      var index = 0;
      var discount=0;
      var amount;
      var taxAmount = (price*tax)/100;
      proId.push(id);
      proQty.push(qty);
      proTax.push(tax);

      for (let i = 0; i < discountObj.length; i++) {
        if (discountObj[i].category == category) {
          discount = discountObj[i].discountRate;
          amount = ((taxAmount+(price*1)) - (((taxAmount+(price*1)) * discount) / 100)) * qty;
          totalamount += amount
          flag = true;
          break;
        }
      }
      if(flag == false){
        amount = (taxAmount+(price*1))*qty
        totalamount += amount
      }

      var row = table_body.insertRow();
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      var cell3 = row.insertCell(2);
      var cell4 = row.insertCell(3);
      var cell5 = row.insertCell(4);
      var cell6 = row.insertCell(5);
      var cell7 = row.insertCell(6);

      cell1.innerText = name;
      cell2.innerText = price;
      cell3.innerText = tax.toFixed(2);
      cell4.innerText = qty;
      cell5.innerText = discount.toFixed(2);
      cell6.innerText = amount.toFixed(2);
      var checkBox = document.createElement('input');
      checkBox.type = "checkbox";
      checkBox.className = "itemChk";
      checkBox.id = index++;
      cell7.appendChild(checkBox);
      billTotal.innerText = totalamount.toFixed(2);
    }
    else{
      alert("Not enough stock");
    }
  }
  else{
    alert("Please fill all the fields properly")
  }
}

//Deleteing items in the bill
var delete_btn = document.getElementById("deleteBtn");
delete_btn.addEventListener('click', () => {
  var check = document.getElementsByClassName("itemChk");
  for(let x=check.length-1; x>=0; x--){
    if(check[x].checked == true){
      //console.log(table_body.rows[x].cells[5].innerText)
      totalamount = totalamount - ((table_body.rows[x].cells[5].innerText*1));
      proId.splice(x, 1)
      proQty.splice(x, 1);
      proTax.splice(x, 1);
      billTotal.innerText = totalamount.toFixed(2);
      if(proId.length == 0){
        billTotal.innerText = "0.00"
      }
      table_body.deleteRow(x);
      //console.log(totalamount)
    }
  }
  // for(let s=0; s<table_body.rows.length; s++){
  //   table_body.rows[s].cells[0].innerText = s+1;
  // }
  // sNo = table_body.rows.length+1;
})

//Saving the bill in the database
var billId;
var bTotal;

function saveBill(event){
  event.preventDefault();
  var sessionToken = sessionStorage.getItem("token")

  if(cusName.value != "" && phone.value != ""){
    if(proId.length > 0){

      const data = {
        name: cusName.value,
        number: phone.value,
        total: totalamount.toFixed(2),
        balance: totalamount.toFixed(2),
        proId: proId,
        proQty: proQty,
        proTax: proTax,
        userId: userId
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
        "http://localhost:8080/Billing_Server/webapi/root/bills",
        configObj)
        .then((response) => {
        if (response.status == 200) {
          response.json().then((data) => {
            billId = data.bId
            bTotal = data.total
            //console.log(bTotal)
            alert("Bill Saved");
            container1.style.display = "none"
            container2.style.display = "none"
            saveBtn.style.display = "none"
            container3.style.display = "block"
            fetchedAmount.value = bTotal.toFixed(2);
          });
        } 
        else {
          alert("Please enter the details properly");
        }
      });
    }else{
      alert("Please enter any products");
    }
  } else{
    alert("Please enter customer name and number")
  }
}

//Payment function
function paymentFunc(event){
  event.preventDefault();
  var sessionToken = sessionStorage.getItem("token");
  var userId = sessionStorage.getItem("userId");

  if(cardholder.value != "" && cardnumber.value != "" && expiryDate.value != "" && cvv.value != "" && fetchedAmount.value != ""){
    if(cardnumber.value.length == 16 && expiryDate.value.length == 5 && cvv.value.length == 3){
      if( (fetchedAmount.value*1) <= bTotal) { 
      const data = {
        billId: billId,
        amount: fetchedAmount.value,
        userId: userId
      }

      const configObj = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "authToken": sessionToken
        },
        body: JSON.stringify(data)
      };

      fetch(
        "http://localhost:8080/Billing_Server/webapi/root/payments",
        configObj)
        .then((response) => {
          if(response.status == 200){
            alert("Payment successful");
            location.reload();
          }
          else{
            alert("Something wrong");
          }
      })
    }
    else{
      alert("Entered amount exceeds Bill amount.")
    }
  }
    else{
      alert("Enter card details properly.")
    }
  }
  else{
    alert("Please fill all the details.")
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
      window.open("index.html","_self");
      //alert("Logged out successfully");
    }
    else{
      alert("Something wrong");
    }
  })
});
