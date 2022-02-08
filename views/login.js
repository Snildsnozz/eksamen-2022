if (localStorage.getItem('user')) {
    location.href = '/views/varer.html'
} //hvis du er logget ind redirecter den til varer.html. 

document.addEventListener("DOMContentLoaded", function () { //kører ikke koden før siden er loadet. Ventetiden er lav. 
    let login = document.getElementById('loginform') //fordi det er en form kan man lave addeventlistener på submit. 
    
    login.addEventListener('submit', (e) => { //lytter efter handlingen submit. 
        e.preventDefault(); //sørger for koden kan køre. 

        let mail = document.getElementById('email').value; //trækker værdien ud af et formel element (email)
        let kode = document.getElementById('password').value; //trækker værdien ud af et formel element (password) 

        let user = {
            email: mail,
            password: kode
        };
        //lavet et objekt med de værdier fra formularen (det brugeren har tastet på siden) 

        fetch('http://localhost:3000/views/login', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
            },

            body: JSON.stringify(user), //smider user objekt i en body
        })
        .then((response) => response.json()) //Svaret fra serveren, sender JSON delen videre til næste .then. 
        .then((data) => { //data = json fra ovenover. 
            if(data) { //tjekker om der er sendt data. 
                localStorage.setItem('user', JSON.stringify(data)) //hvis ja, sætter localstorage til at have en bruger.
                location.href='/views/varer.html'; //sender brugerne videre til varer.html.
            } else {
                alert(data) //hvis ikke der er sendt data, alert false. 
            }
        })
        .catch((err) => {
            console.log('error:', err);
        });
    });
})





