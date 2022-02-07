
document.addEventListener("DOMContentLoaded", function () {
    let login = document.getElementById('loginform')
    
    login.addEventListener('submit', (e) => {
        e.preventDefault();

        let mail = document.getElementById('email').value;
        let kode = document.getElementById('password').value;

        let user = {
            id: null, 
            email: mail,
            password: kode
        };

        fetch('http://localhost:3000/views/login', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
            },

            body: JSON.stringify(user),
        })
        .then((response) => response.json())
        .then((data) => {
            if(data) {
                localStorage.setItem('user', JSON.stringify(data))
                location.href='/views/varer.html';
            } else {
                alert(data)
            }
        })
        .catch((err) => {
            console.log('error:', err);
        });
    });
})




