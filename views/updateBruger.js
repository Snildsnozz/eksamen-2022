if (!localStorage.getItem('user')) {
    location.href = '/views/login.html'
} 

document.addEventListener("DOMContentLoaded", function () {
    let opdater = document.getElementById("updatebruger")

    opdater.addEventListener("click", (e) => {
        e.preventDefault();

        let brugernavn = document.getElementById('updateBrugerId').value;
        let email = document.getElementById('email').value;
        let password = document.getElementById("password").value;
        let uniq = document.getElementById('ID').value;

        let updatedBruger = {
            id: uniq,
            navn: brugernavn,
            mail: email, 
            kode: password
        } 
        
        
        fetch('http://localhost:3000/updateBrugerId', {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            //det under er det som bliver sendt til serveren. 
            body: JSON.stringify(updatedBruger)
        }).then(response => response.json())
        .then(data => {
            console.log(data)
            alert("Sucess:" + data.msg)
        })
        .catch((err) => {
            console.log('Error:', err)
        })
    })
});
