var userArr = [
    { 
        email: "sille",
        password: "123"
    }
]


function login () {
    var email = document.getElementById("email").value
    var password = document.getElementById("password").value

    for (i=0; i < userArr.length; i++) {
        if(email == userArr[i].email && password == userArr[i].password){
            console.log(email + "is logged in")
            
        }
    } 
}
