const balance = document.getElementById("balance"),
    money_plus = document.getElementById("money-plus"),
    money_minus = document.getElementById("money-minus"),
    list = document.getElementById("list"),
    form = document.getElementById("form"),
    text = document.getElementById("text"),
    amount = document.getElementById("amount");


// let dummmyTransactions = [
//     {id: 1, text: "Flower", amount: -20},
//     {id: 2, text: "Salary", amount: 300},
//     {id: 3, text: "Book", amount: -10},
//     {id: 4, text: "Camera", amount: 150}
// ];

const localStorageTransactions = JSON.parse(localStorage.getItem("transactions"));

let transactions = localStorage.getItem("transactions") !== null ?
localStorageTransactions : [];

// Add transaction
function addTransaction(e) {
    //prevent default prevents it from actually submitting. 
    e.preventDefault();

    if(text.value.trim() === "" || amount.value.trim() === "") {

        alert("Please add a text and amount");

    } else{
        const transaction = {
            id: generateID(),
            text: text.value, 
            amount: +amount.value
        };

        transactions.push(transaction);

        addToTransactionDOM(transaction);

        updateValues();

        updateLocalStorage();

        text.value = "";
        amount.value="";
    }
}


//Generate random ID
function generateID() {
    return Math.floor(Math.random() * 100);
}

//Add transactions to DOM list

function addToTransactionDOM(transaction) {
    //get sign, if trans aount is greater than 0, then (?) we change the sign to minus, else (:) we change the sign to a plus. 
    const sign = transaction.amount < 0 ? "-" : "+";

    const item = document.createElement("li");

    // Add class besed on value. If the trans amount is less that 0, add class minus, else add clas plus. 
    item.classList.add(transaction.amount < 0 ? "minus" : "plus");

    item.innerHTML = `
        ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span> <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>    
    `;
    
    list.appendChild(item);

}


//Update balance, income and expense. 
function updateValues(){
    //sets amounts to any array of just the amounts of each transaction. 
    const amounts = transactions.map(transaction => transaction.amount);
    const total = amounts
        .reduce((acc,item) => (acc += item) , 0)
        .toFixed(2);

    const income = amounts
        .filter(item =>  item > 0)
        .reduce((acc, item) => (acc += item), 0)
        .toFixed(2);

    const expense = (amounts
        .filter(item => item < 0 )
        .reduce((acc,item) => (acc += item), 0) * -1)
        .toFixed(2);

        balance.innerText  =`$${total}`;
        money_plus.innerText = `$${income}`;
        money_minus.innerText = `$${expense}`;
}


// Init App

function init() {
    list.innerHTML = "";
    transactions.forEach(addToTransactionDOM);
}


//remove transaction by id
function removeTransaction(id){
    transactions = transactions.filter(transaction => transaction.id !== id);
    init();

    updateLocalStorage();
}

init();

//update local storage transactions

function updateLocalStorage(){
    localStorage.setItem("transactions", JSON.stringify(transactions));
}

updateValues();


//Event Listeners
form.addEventListener("submit", addTransaction);