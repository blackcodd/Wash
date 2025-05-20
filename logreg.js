let user;
document.getElementById("regsubmit").onclick = function() {
    const username = document.getElementById("regname").value;
    const password = document.getElementById("regpassword").value;
    const email = document.getElementById("regemail").value;
    const phone = document.getElementById("regphone").value;
    
    if (username && password && email && phone) {
        user = {
        username: username,
        password: password,
        email: email,
        phone: phone
        };
        alert("Registration successful!");
        toggleFeatures();
    } else {
        alert("Please fill in all fields.");
    }
    console.log(user);
}
