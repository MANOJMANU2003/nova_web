 function loginUser(){
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

      if(email === "" || password === ""){
        alert("Please fill all fields");
        return;
      }
      const savedUser =
        JSON.parse(localStorage.getItem("novacartUser"));

      if(!savedUser){
        alert("No user found. Please register first.");
        return;
      }
      if(
        email === savedUser.email && password === savedUser.password){
        alert("Login Successful. Welcome " + savedUser.username);

        localStorage.setItem("isLoggedIn", true);
        window.location.href = "index.html";
      }
      else{
        alert("Invalid Email or Password");
      }
    }