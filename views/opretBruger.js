document.addEventListener("DOMContentLoaded", function () {

    let opret = document.getElementById("opretbruger") 
    
    opret.addEventListener("click", (e) => {
        e.preventDefault();//for at den ikke reloader siden
        
        let brugernavn = document.getElementById('opretBrugerId').value;//får værdien inde i objektet.  
        let email = document.getElementById('email').value;
        let password = document.getElementById('password').value;

        var uniq = 'id' + Date.now().toString(36)//lavet et unikt id for hver produkt. 
        let nybruger = {
            id: uniq, 
            navn: brugernavn,
            mail: email,
            kode: password
        } 
        
       fetch('http://localhost:3000/opretBrugerId', { //routen som den følger. 
           method: "POST", //options objekt: vi bruger post (en body med)
           headers: { // serveren ved nu det der kommer er et json objekt. 
               'Content-Type': 'application/json'
           },
            //det under er det, som bliver sendt til serveren. 
           body: JSON.stringify(nybruger) //body sættes til at være den stringifiet variable, altså nytprodukt.  
       }).then(response => response.json()) /* laver en response inde i then - response.json gør at det vi får tilbage fra serveren også er json. 
        Res.json laver det om til det det var inden vi stringifiede det. */
       .then(data => { 
           console.log(brugernavn)
           alert("Sucess:" + data.msg) //laver en alert som viser sucess.
       })
      .catch((err) => {
          alert('Error:', err) //ellers hvis der går noget galt hopper den ned til catch og sender en error. 
      })
    })
})