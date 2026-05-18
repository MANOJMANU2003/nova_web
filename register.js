function registerUser(){

      const username = document.getElementById("registerUsername").value;
      const email = document.getElementById("registerEmail").value;
      const password = document.getElementById("registerPassword").value;
      const confirmPassword = document.getElementById("confirmPassword").value;
      const terms = document.getElementById("terms").checked;

      /* EMPTY CHECK */
      if(username === "" || email === "" || password === "" || confirmPassword === ""){
        alert("Please fill all fields");
        return;
      }

      /* PASSWORD MATCH */
      if(password !== confirmPassword){
        alert("Passwords do not match");
        return;
      }

      /* PASSWORD LENGTH */
      if(password.length < 8){
        alert("Password must be at least 8 characters");
        return;
      }

      /* TERMS */
      if(!terms){
        alert("Please accept terms and conditions");
        return;
      }

      /* SAVE USER */
      const user = {
        username, email, password
      };

      localStorage.setItem(
        "novacartUser",
        JSON.stringify(user)
      );

      alert("Registration Successful");
      window.location.href = "login.html";
    }