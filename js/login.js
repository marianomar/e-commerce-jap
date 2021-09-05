let submit = document.getElementById("submit")
submit.addEventListener("click", function(evento){
    evento.preventDefault();
    let email = document.getElementById("email").value;
    localStorage.setItem("email", email);
    let contrasena = document.getElementById("contrasena").value;
    
    if (email === "" || contrasena === ""){
        alert("Debe completar todos los campos!");
    }
    
    if(email !== "" && contrasena !== ""){
        window.location.href = "index.html"
    }
    
    

});
 



