//Checking whether the session is active or not
function checkSession(){
  var session = sessionStorage.getItem("token");
  if(!session){
    window.open("index.html","_self");
    return;
  }
  else{
    getBills();
  }
}

document.querySelector("#userName").innerText = localStorage.getItem("name");

//Product menu navaigartion
function func_productNav(sel) {
  window.location.href = sel.value;
}

//Getting all the products from the database
var billsObj = {};
var billProduct_obj = {};
var paymentObj = {};

function getBills() {
  var sessionToken = sessionStorage.getItem("token");

  let configObj = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "authToken": sessionToken
    },
  };

  fetch("http://localhost:8080/Billing_Server/webapi/root/bills", configObj)
    .then((response) => {
        return response;
    })
    .then((res) => {
      res.json().then((data) => {
        billsObj = data;
        //console.log(billsObj)
      });
    }).then(() => {
      //Getting Bill products
      getBill_products();
    });
}

//Getting all the products details for the bills
function getBill_products(){
  var sessionToken = sessionStorage.getItem("token");
  let configObj = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "authToken": sessionToken
    },
  };
  
  fetch("http://localhost:8080/Billing_Server/webapi/root/billProducts", configObj)
  .then((response) => {
      return response;
  })
  .then((res) => {
    res.json().then((data) => {
      billProduct_obj = data;
      //console.log(billProduct_obj)
      
      get_paymentDetails();
    });
  });
}

//Getting Payment details from the database
function get_paymentDetails(){
  var sessionToken = sessionStorage.getItem("token");
  let configObj = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "authToken": sessionToken
    },
  };
  
  fetch("http://localhost:8080/Billing_Server/webapi/root/payments", configObj)
  .then((response) => {
      return response;
  })
  .then((res) => {
    res.json().then((data) => {
      paymentObj = data;
      //console.log(paymentObj)
      
      viewBils();
    });
  });
}


//Viewing bill data in the table format
var table_body = document.querySelector(".table-body");
var count = 0;
var bill_totalAmount = document.getElementById("bill_totalAmount");
var pay_tableBody = document.querySelector(".pay_tableBody");

function viewBils() {
  //var col = Object.keys(billsObj[0]).length;
  var billAmount = 0;
  for (var i = 0; i < billsObj.length; i++) {
    //console.log(billsObj.);
    billAmount += Object.values(billsObj[i])[4];
    bill_totalAmount.innerText = billAmount.toFixed(2);

    var row = table_body.insertRow(i);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    var cell6 = row.insertCell(5);
    var cell7 = row.insertCell(6);
    var cell8 = row.insertCell(7);

    cell1.innerText = Object.values(billsObj[i])[0];
    cell2.innerText = Object.values(billsObj[i])[2];
    cell3.innerText = Object.values(billsObj[i])[4];
    cell4.innerText = Object.values(billsObj[i])[1];
    cell5.innerText = Object.values(billsObj[i])[3];
     
    var select = document.createElement("select");
    select.options.disabled = true;
    select.className = "billItems"
    //select.id = `items${i}`

    // 1st option
    var option = document.createElement("option");
    option.text = 'NAME | QTY | TAX% | DISCOUNT% | PRICE';
    select.appendChild(option);  
    option.className = "option-items"

    for (let k=0; k<billProduct_obj.length; k++)
    {
        if(billsObj[i].bId == billProduct_obj[k].billId){
            var option = document.createElement("option");
            //option.value = "";
            option.className = "option-items"
            option.text = `${billProduct_obj[k].name} | ${billProduct_obj[k].quantity} |
                            ${billProduct_obj[k].tax} | ${billProduct_obj[k].discount} | 
                            ${billProduct_obj[k].totalPrice}`;
            select.appendChild(option);
        }
    }
    select.options[0].disabled = true
    cell6.appendChild(select)

    if(Object.values(billsObj[i])[1] != 0){
      var btn = document.createElement('input');
      btn.type = "button";
      btn.className = "pay_btn";
      btn.id = i;
      btn.value = "Pay Balance";
      cell7.appendChild(btn);
      count++;
      }
      else{
        cell7.innerText = "NO BALANCE"
      }
      var paymentLink = document.createElement("a");
      paymentLink.className = "pay_details";
      paymentLink.id = i;
      paymentLink.innerText = "Payments";
      cell8.appendChild(paymentLink);
    }
  payBalance();
  get_billPayments();
}

//Getting bills details within range of date
var startDate = document.getElementById("startDate");
var endDate = document.getElementById("endDate");
var searchBtn = document.querySelector(".searchBtn");

searchBtn.addEventListener("click", () => {
  if(startDate.value != "" && endDate.value != ""){
    count = 0;
    var billAmount = 0;
    const listDate = [];
    let index = 0;
    const dateMove = new Date(startDate.value);
    let strDate = startDate.value;
    bill_totalAmount.innerText = billAmount.toFixed(2);

    //Pushing Dates into array
    if(strDate == endDate.value){
      strDate = dateMove.toISOString().slice(0, 10);
      listDate.push(strDate);
    }
    else{
      while (strDate < endDate.value) {
        strDate = dateMove.toISOString().slice(0, 10);
        listDate.push(strDate);
        dateMove.setDate(dateMove.getDate() + 1);
      }
    }
    //console.log(listDate);

    for (let x=table_body.rows.length-1; x>= 0; x--) {
      table_body.deleteRow(x);
    }

    for (let i = 0; i < listDate.length; i++) {
      for (let j = 0; j < billsObj.length; j++) {
        if (listDate[i] == Object.values(billsObj[j])[3]) {
          billAmount += Object.values(billsObj[j])[4];
          bill_totalAmount.innerText = billAmount.toFixed(2);

          var row = table_body.insertRow(index);
          var cell1 = row.insertCell(0);
          var cell2 = row.insertCell(1);
          var cell3 = row.insertCell(2);
          var cell4 = row.insertCell(3);
          var cell5 = row.insertCell(4);
          var cell6 = row.insertCell(5);
          var cell7 = row.insertCell(6);
          var cell8 = row.insertCell(7);

          cell1.innerText = Object.values(billsObj[j])[0];
          cell2.innerText = Object.values(billsObj[j])[2];
          cell3.innerText = Object.values(billsObj[j])[4];
          cell4.innerText = Object.values(billsObj[j])[1];
          cell5.innerText = Object.values(billsObj[j])[3];
          
          var select = document.createElement("select");
          select.options.disabled = true;
          select.className = "billItems"

          // 1st option
          var option = document.createElement("option");
          option.text = 'NAME | QTY | TAX% | DISCOUNT% | PRICE';
          select.appendChild(option);  
          option.className = "option-items"

          for (let k=0; k<billProduct_obj.length; k++)
          {
              if(billsObj[j].bId == billProduct_obj[k].billId){
                  var option = document.createElement("option");
                  option.className = "option-items"
                  option.text = `${billProduct_obj[k].name} | ${billProduct_obj[k].quantity} |
                                  ${billProduct_obj[k].tax} | ${billProduct_obj[k].discount} | 
                                  ${billProduct_obj[k].totalPrice}`;
                  select.appendChild(option);
              }
          }
          select.options[0].disabled = true
          cell6.appendChild(select)

          if(Object.values(billsObj[j])[1] != 0){
            var btn = document.createElement('input');
            btn.type = "button";
            btn.className = "pay_btn";
            btn.id = index;
            btn.value = "Pay Balance";
            cell7.appendChild(btn);
            count++;
            }
            else{
              cell7.innerText = "NO BALANCE"
            }
          index++;
          var paymentLink = document.createElement("a");
          paymentLink.className = "pay_details";
          paymentLink.id = j;
          paymentLink.innerText = "Payments";
          cell8.appendChild(paymentLink);
        }
      }
    }
  }
  else{
    alert("Please select any date");
  }
  payBalance();

  for(let x=pay_tableBody.rows.length-1; x>=0; x--){
    pay_tableBody.deleteRow(x);
  }
  get_billPayments();
});

//User bills
document.getElementById("userBills").addEventListener(
  'click', () => {
    var userId = sessionStorage.getItem("userId");
    var index = 0
    count = 0;
    var billAmount = 0;
    bill_totalAmount.innerText = billAmount.toFixed(2);
    for (let x=table_body.rows.length-1; x>= 0; x--) {
      table_body.deleteRow(x);
    }

    for (let j=0; j<billsObj.length; j++) {
      if (userId == Object.values(billsObj[j])[5]) {
        billAmount += Object.values(billsObj[j])[4];
        bill_totalAmount.innerText = billAmount.toFixed(2);

        var row = table_body.insertRow(index);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);
        var cell7 = row.insertCell(6);
        var cell8 = row.insertCell(7);

        cell1.innerText = Object.values(billsObj[j])[0];
        cell2.innerText = Object.values(billsObj[j])[2];
        cell3.innerText = Object.values(billsObj[j])[4];
        cell4.innerText = Object.values(billsObj[j])[1];
        cell5.innerText = Object.values(billsObj[j])[3];
        
        var select = document.createElement("select");
        select.options.disabled = true;
        select.className = "billItems"

        // 1st option
        var option = document.createElement("option");
        option.text = 'NAME | QTY | TAX% | DISCOUNT% | PRICE';
        select.appendChild(option);  
        option.className = "option-items"

        for (let k=0; k<billProduct_obj.length; k++)
        {
            if(billsObj[j].bId == billProduct_obj[k].billId){
                var option = document.createElement("option");
                option.className = "option-items"
                option.text = `${billProduct_obj[k].name} | ${billProduct_obj[k].quantity} |
                                ${billProduct_obj[k].tax} | ${billProduct_obj[k].discount} | 
                                ${billProduct_obj[k].totalPrice}`;
                select.appendChild(option);
            }
        }
        select.options[0].disabled = true
        cell6.appendChild(select)

        if(Object.values(billsObj[j])[1] != 0){
          var btn = document.createElement('input');
          btn.type = "button";
          btn.className = "pay_btn";
          btn.id = index;
          btn.value = "Pay Balance";
          cell7.appendChild(btn);
          count++;
          }
          else{
            cell7.innerText = "No Balance"
          }
        index++;
        var paymentLink = document.createElement("a");
        paymentLink.className = "pay_details";
        paymentLink.id = j;
        paymentLink.innerText = "Payments";
        cell8.appendChild(paymentLink);
      }
    }
    //payBalance();

    for(let x=pay_tableBody.rows.length-1; x>=0; x--){
      pay_tableBody.deleteRow(x);
    }
    get_billPayments();
  }
)

//Unpaid Bills
document.getElementById("unpaid_btn").addEventListener(
  'click', () => {
    var index = 0
    count = 0;
    var billAmount = 0;
    bill_totalAmount.innerText = billAmount.toFixed(2);
    for (let x=table_body.rows.length-1; x>= 0; x--) {
      table_body.deleteRow(x);
    }

    for (let j=0; j<billsObj.length; j++) {
      if (Object.values(billsObj[j])[1] != 0) {
        billAmount += Object.values(billsObj[j])[4];
        bill_totalAmount.innerText = billAmount.toFixed(2);

        var row = table_body.insertRow(index);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);
        var cell7 = row.insertCell(6);
        var cell8 = row.insertCell(7);

        cell1.innerText = Object.values(billsObj[j])[0];
        cell2.innerText = Object.values(billsObj[j])[2];
        cell3.innerText = Object.values(billsObj[j])[4];
        cell4.innerText = Object.values(billsObj[j])[1];
        cell5.innerText = Object.values(billsObj[j])[3];
        
        var select = document.createElement("select");
        select.options.disabled = true;
        select.className = "billItems"

        // 1st option
        var option = document.createElement("option");
        option.text = 'NAME | QTY | TAX% | DISCOUNT% | PRICE';
        select.appendChild(option);  
        option.className = "option-items"

        for (let k=0; k<billProduct_obj.length; k++)
        {
            if(billsObj[j].bId == billProduct_obj[k].billId){
                var option = document.createElement("option");
                option.className = "option-items"
                option.text = `${billProduct_obj[k].name} | ${billProduct_obj[k].quantity} |
                                ${billProduct_obj[k].tax} | ${billProduct_obj[k].discount} | 
                                ${billProduct_obj[k].totalPrice}`;
                select.appendChild(option);
            }
        }
        select.options[0].disabled = true
        cell6.appendChild(select)

        var btn = document.createElement('input');
        btn.type = "button";
        btn.className = "pay_btn";
        btn.id = index;
        btn.value = "Pay Balance";
        cell7.appendChild(btn);
        count++;
        index++;

        var paymentLink = document.createElement("a");
        paymentLink.className = "pay_details";
        paymentLink.id = j;
        paymentLink.innerText = "Payments";
        cell8.appendChild(paymentLink);
      }
    }
    payBalance();

    for(let x=pay_tableBody.rows.length-1; x>=0; x--){
      pay_tableBody.deleteRow(x);
    }
    get_billPayments();
});

//Customer bills
document.querySelector(".searchBtn1").addEventListener(
  'click', () => {
    var customerId = document.getElementById("customerId");
    if(customerId.value != ""){
      var index = 0
      count = 0;
      var billAmount = 0;
      bill_totalAmount.innerText = billAmount.toFixed(2);
      for (let x=table_body.rows.length-1; x>= 0; x--) {
        table_body.deleteRow(x);
      }

    for (let j=0; j<billsObj.length; j++) {
      if (Object.values(billsObj[j])[2] == customerId.value) {
        billAmount += Object.values(billsObj[j])[4];
        bill_totalAmount.innerText = billAmount.toFixed(2);

        var row = table_body.insertRow(index);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);
        var cell7 = row.insertCell(6);
        var cell8 = row.insertCell(7);

        cell1.innerText = Object.values(billsObj[j])[0];
        cell2.innerText = Object.values(billsObj[j])[2];
        cell3.innerText = Object.values(billsObj[j])[4];
        cell4.innerText = Object.values(billsObj[j])[1];
        cell5.innerText = Object.values(billsObj[j])[3];
        
        var select = document.createElement("select");
        select.options.disabled = true;
        select.className = "billItems"

        // 1st option
        var option = document.createElement("option");
        option.text = 'NAME | QTY | TAX% | DISCOUNT% | PRICE';
        select.appendChild(option);  
        option.className = "option-items"

        for (let k=0; k<billProduct_obj.length; k++)
        {
            if(billsObj[j].bId == billProduct_obj[k].billId){
                var option = document.createElement("option");
                option.className = "option-items"
                option.text = `${billProduct_obj[k].name} | ${billProduct_obj[k].quantity} |
                                ${billProduct_obj[k].tax} | ${billProduct_obj[k].discount} | 
                                ${billProduct_obj[k].totalPrice}`;
                select.appendChild(option);
            }
        }
        select.options[0].disabled = true
        cell6.appendChild(select)

        if(Object.values(billsObj[j])[1] != 0){
          var btn = document.createElement('input');
          btn.type = "button";
          btn.className = "pay_btn";
          btn.id = index;
          btn.value = "Pay Balance";
          cell7.appendChild(btn);
          count++;
          }
          else{
            cell7.innerText = "No Balance"
          }
          index++;
          var paymentLink = document.createElement("a");
          paymentLink.className = "pay_details";
          paymentLink.id = j;
          paymentLink.innerText = "Payments";
          cell8.appendChild(paymentLink);
        }
      }
    }
    else{
      alert("Please enter customer Id");
    }
    payBalance();

    for(let x=pay_tableBody.rows.length-1; x>=0; x--){
      pay_tableBody.deleteRow(x);
    }
    get_billPayments();
});

//Paying balance amount
var billId = document.querySelector("#billId");
var amount = document.querySelector("#amount");
var actualAmount;

function payBalance(){
var pay_btn = document.querySelectorAll(".pay_btn");
  for(let x=0; x<count; x++){
    pay_btn[x].addEventListener('click', 
      () => {
        billId.value = table_body.rows[pay_btn[x].id].cells[0].innerText;
        actualAmount = (table_body.rows[pay_btn[x].id].cells[3].innerText*1);
        amount.value = actualAmount;
    })
  }
}

function payBalance_amount(event){
  event.preventDefault();
  var sessionToken = sessionStorage.getItem("token");
  var userId = sessionStorage.getItem("userId");

  if((amount.value*1) <= actualAmount){

    const data = {
      billId: billId.value,
      amount: amount.value,
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
    alert("Entered amount exceeds bill amount.");
  }
}

//Viewing payment details
function get_billPayments(){
  var pay_details = document.querySelectorAll(".pay_details");
  for(let i=0; i<table_body.rows.length; i++){
    pay_details[i].addEventListener('click', () => {
      view_billPayment(table_body.rows[i].cells[0].innerText);
    });
  }
}
function view_billPayment(select_billId){
  var index = 0;

  for(let x=pay_tableBody.rows.length-1; x>=0; x--){
    pay_tableBody.deleteRow(x);
  }

  for(let i=0; i<paymentObj.length; i++){
    if(paymentObj[i].billId == select_billId){
      var row = pay_tableBody.insertRow(index);
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);

      cell1.innerText = paymentObj[i].amount.toFixed(2);
      cell2.innerText = paymentObj[i].date;
      index++;
    }
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

