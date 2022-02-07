if (!localStorage.getItem('user')) {
    location.href = '/views/login.html'
} 
document.addEventListener("DOMContentLoaded", function () {
    
    let slet = document.getElementById("sletbruger")

        slet.addEventListener("click", (e) => {
            e.preventDefault();

            let uniq = JSON.parse(localStorage.getItem('user')).id
            
            
        fetch('http://localhost:3000/sletBrugerId/' + uniq, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(response => response.json())
        .then(data => {
            localStorage.removeItem('user') //logger brugeren ud. 
            location.href = '/views/login.html' //redirecter til login efter slet. 
        })
        .catch((err) => {
            console.log('Error:', err)
        })
    })
})
