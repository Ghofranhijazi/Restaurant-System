document.getElementById("orderForm").addEventListener("submit", function(event) {
    event.preventDefault();
  
    // جمع البيانات من النموذج
    const fullName = document.getElementById("fullName").value;
    const password = document.getElementById("password").value;
    const dob = document.getElementById("dob").value;
    const gender = document.getElementById("gender").value;
    const phone = document.getElementById("phone").value;
  
    const orderTypes = Array.from(document.querySelectorAll("input[name='orderType']:checked")).map(input => input.value);
    const orderOption = document.querySelector("input[name='orderOption']:checked").value;
  
    // إنشاء كائن يحتوي على البيانات
    const order = {
      fullName,
      password,
      dob,
      gender,
      phone,
      orderTypes,
      orderOption
    };
  
    // حفظ البيانات في Local Storage
    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders.push(order);
    localStorage.setItem("orders", JSON.stringify(orders));
  
    // إعادة تعيين النموذج
    this.reset();
  
    alert("Order submitted successfully!");
  });
  
