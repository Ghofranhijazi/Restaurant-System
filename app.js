function Customer(fullName, password, dob, email, gender, phone, orderType, orderOption, imageUrl) {
  this.fullName = fullName;
  this.password = password;
  this.dob = dob;
  this.email = email;
  this.gender = gender;
  this.phone = phone;
  this.orderType = orderType;
  this.orderOption = orderOption;
  this.imageUrl = imageUrl;
}

function run() {
  const cardsSection = document.getElementById('customer-cards');
  cardsSection.textContent = '';

  const storedOrders = localStorage.getItem('customerOrders');
  const customerOrders = storedOrders ? JSON.parse(storedOrders) : [];

  customerOrders.forEach((customer) => {
    const card = document.createElement('div');
    card.classList.add('card');

    const img = document.createElement('img');
    img.src = customer.imageUrl || 'assets/default-avatar.png';
    img.alt = `${customer.fullName}'s image`;

    const name = document.createElement('p');
    name.textContent = `Full Name: ${customer.fullName}`;

    const password = document.createElement('p');
    password.textContent = `Password: ${'*'.repeat(customer.password.length)}`;

    const dob = document.createElement('p');
    dob.textContent = `Date of Birth: ${customer.dob}`;

    const email = document.createElement('p');
    dob.textContent = `Email: ${customer.email}`;


    const gender = document.createElement('p');
    gender.textContent = `Gender: ${customer.gender}`;

    const phone = document.createElement('p');
    phone.textContent = `Phone: ${customer.phone}`;

    const orderType = document.createElement('p');
    // orderType.textContent = `Order Type: ${customer.orderType.join(' & ')}`;
    orderType.textContent = `Order Type: ${customer.orderType}`;


    const orderOption = document.createElement('p');
    orderOption.textContent = `Order Option: ${customer.orderOption}`;

    card.appendChild(img);
    card.appendChild(name);
    card.appendChild(password);
    card.appendChild(dob);
    card.appendChild(email);
    card.appendChild(gender);
    card.appendChild(phone);
    card.appendChild(orderType);
    card.appendChild(orderOption);

    cardsSection.appendChild(card);
  });
}

const previousInputs = {};

document.getElementById('order-form').addEventListener('submit', function (sub) {
  sub.preventDefault();

  const fullName = document.getElementById('fullName').value.trim();
  //validation 
  if (/\s/.test(fullName)) {
    alert("Please Enter Name without spaces!");
    return;
  }
  else if (previousInputs.fullName === fullName) {
    alert("You already entered this full name!");
    return;
  }

  const password = document.getElementById('password').value.trim();
  if (!/(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?~-])[a-zA-Z\d!@#$%^&*()_+[\]{};':"\\|,.<>/?~-]{8,}$/.test(password)) {
    alert("Password must be more than 8 characters, including uppercase, a number, and a symbol.");
    return;
  }
  const dob = document.getElementById('dob').value.trim();
  if (!/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/.test(dob)) {
    alert("Birthdate must be in the format YYYY-MM-DD.");
    return;
  }
  const email = document.getElementById('email').value.trim();
  if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
    alert("Please Enter valid email address!");
    return;
  }
  else if (previousInputs.email === email) {
    alert("You already entered this email!");
    return;
  }

  const gender = document.querySelector('input[name="gender"]:checked').value.trim();
  const phone = document.getElementById('phone').value.trim();
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
  


  // const orderType = Array.from(document.querySelectorAll('input[name="orderType"]:checked')).map(
  //   (checkbox) => checkbox.value
  // );
  const orderType = document.querySelector('input[name="orderType"]:checked').value;

  const orderOption = document.querySelector('input[name="orderOption"]:checked').value;

  const imageInput = document.getElementById('image');
  const imageUrl = imageInput.files.length ? URL.createObjectURL(imageInput.files[0]) : 'assets/default-avatar.png';

  const newCustomer = new Customer(fullName, password, dob, email, gender, phone, orderType, orderOption, imageUrl);

  const storedOrders = localStorage.getItem('customerOrders');
  const customerOrders = storedOrders ? JSON.parse(storedOrders) : [];

  customerOrders.push(newCustomer);
  localStorage.setItem('customerOrders', JSON.stringify(customerOrders));

  document.getElementById('order-form').reset();
  run();
});

function clearName() {
  localStorage.clear();
  document.getElementById('customer-cards').textContent = '';
}

run();
