
function customer (fullName, password, dob, email, gender, phone, orderType, orderOption, imageUrl){ //*
  this.fullName = fullName;
  this.password = password;
  this.dob = dob;
  this.email = email;
  this.gender = gender;
  this.phone = phone;
  this.orderType = orderType;
  this.orderOption = orderOption;
  this.imageUrl = imageUrl; //*
}


let customers = [];
const previousInputs = {};

let form = document.getElementById("order-form");
form.addEventListener('submit', function(event){
  event.preventDefault();
   

// validation : 
  

let fullName = document.getElementById("fullName").value;
     if (/\s/.test(fullName)) {
        alert("Please Enter Name without spaces!");
        return;
      }
      else if (previousInputs.fullName === fullName) {
        alert("You already entered this full name!");
        return;
      }
     

  let password = document.getElementById('password').value;
    if (!/(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?~-])[a-zA-Z\d!@#$%^&*()_+[\]{};':"\\|,.<>/?~-]{8,}$/.test(password)) {
      alert("Password must be more than 8 characters, including uppercase, a number, and a symbol.");
      return;
    }

    let dob = document.getElementById('dob').value;
    if (!/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/.test(dob)) {
      alert("Birthdate must be in the format YYYY-MM-DD.");
      return;
    }

    let email = document.getElementById('email').value;
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      alert("Please Enter valid email address!");
      return;
    }
    else if (previousInputs.email === email) {
      alert("You already entered this email!");
      return;
    }
  
  
    let gender = document.querySelector('input[name="gender"]:checked').value;
    let phone = document.getElementById('phone').value.trim();
    if (!/^07\d{8}$/.test(phone)) {
      alert("Please Enter valid Phon number! ");
      return;
    }
    else if (previousInputs.phone === phone) {
      alert("You already entered this phone number!");
      return;
    }
    previousInputs.fullName = fullName;
    previousInputs.email = email;
    previousInputs.phone = phone;
    
let imageInput = document.getElementById("image");
let imageUrl = imageInput.files.length
    ? URL.createObjectURL(imageInput.files[0])
    : "assets/default-avatar.png";

let orderType = Array.from(document.querySelectorAll('input[name="orderType"]:checked')).map(input => input.value);
let orderOption = document.querySelector('input[name="orderOption"]:checked')?.value;

let newCustomers = new customer(fullName, password, dob, email, gender, phone, orderType, orderOption, imageUrl);
customers.push(newCustomers);
// set local :
localStorage.setItem('customers', JSON.stringify(customers));
// card section after submit :
 let sectionCard = document.getElementById("cards-section");
 let customerCard = document.createElement("div");
 customerCard.className="customer-Card";

 let img = document.createElement("img");
 img.src = imageUrl;
 img.alt = "Uploaded image";

 let Name = document.createElement("h3");
 Name.textContent = fullName;

 let dobElement = document.createElement('p');
 dobElement.textContent = `Date of Birthday: ${dob}`; 

let emailElement = document.createElement('p');
emailElement.textContent = `Email: ${email}`; 

let phoneElement = document.createElement('p');
phoneElement.textContent = `Phone: ${phone}`;

let genderElement = document.createElement('p');
genderElement.textContent = `Gender: ${gender}`;

let orderTypeElement = document.createElement("p");
orderTypeElement.textContent=`orderType: ${orderType.join(', ')}`;

let orderOptionElement = document.createElement("p");
orderOptionElement.textContent=`orderOption: ${orderOption}`;


customerCard.appendChild(img);
customerCard.appendChild(Name);
customerCard.appendChild(dobElement);
customerCard.appendChild(emailElement);
customerCard.appendChild(phoneElement);
customerCard.appendChild(genderElement);
customerCard.appendChild(orderTypeElement);
customerCard.appendChild(orderOptionElement);

// customerCard.innerHTML = `
//   <img src="${image}" alt="${fullName}">
//   <h3>${fullName}</h3>
//   <p>Email: ${email}</p>
//   <p>Phone: ${phone}</p>
//   <p>Gender: ${gender}</p>
//   <p>Order Type: ${orderType.join(', ')}</p>
//   <p>Order Option: ${orderOption}</p>
// `; without appendChild and without using decleared.
sectionCard.appendChild(customerCard);
});

// get local : 
function displayData() {
  let storedData = localStorage.getItem('customers');
  customers = storedData ? JSON.parse(storedData) : [];
  let sectionCard = document.getElementById("cards-section");
  sectionCard.innerHTML = ""; // تنظيف القسم قبل إعادة العرض

  customers.forEach(customer => {
      let customerCard = document.createElement("div");
      customerCard.className = "customer-Card";

      let img = document.createElement("img");
      img.src = customer.imageUrl;
      img.alt = "Uploaded image";

      let Name = document.createElement("h3");
      Name.textContent = customer.fullName;

      let dobElement = document.createElement('p');
      dobElement.textContent = `Date of Birthday: ${customer.dob}`;

      let emailElement = document.createElement('p');
      emailElement.textContent = `Email: ${customer.email}`;

      let phoneElement = document.createElement('p');
      phoneElement.textContent = `Phone: ${customer.phone}`;

      let genderElement = document.createElement('p');
      genderElement.textContent = `Gender: ${customer.gender}`;

      let orderTypeElement = document.createElement("p");
      orderTypeElement.textContent = `Order Type: ${customer.orderType.join(', ')}`;

      let orderOptionElement = document.createElement("p");
      orderOptionElement.textContent = `Order Option: ${customer.orderOption}`;

      customerCard.appendChild(img);
      customerCard.appendChild(Name);
      customerCard.appendChild(dobElement);
      customerCard.appendChild(emailElement);
      customerCard.appendChild(phoneElement);
      customerCard.appendChild(genderElement);
      customerCard.appendChild(orderTypeElement);
      customerCard.appendChild(orderOptionElement);

      sectionCard.appendChild(customerCard);
  });
}
displayData();



function clearName(){
  localStorage.clear();
  customers = [];
  document.getElementById("order-form").reset(); //برجع الفورم فاضي
  document.getElementById("cards-section").innerHTML = ""; //ببطل في كارد بالسكشن  
};
