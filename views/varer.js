if (!localStorage.getItem('user')) {
    location.href = '/views/login.html'
} 
document.addEventListener("DOMContentLoaded", function () {

    let submit = document.getElementById("submit") 
    
    submit.addEventListener("click", (e) => {
        e.preventDefault();//for at den ikke reloader siden
        
        let produktnavn = document.getElementById('produktnavnarray').value;//får værdien inde i objektet.  
        let pris = document.getElementById('pris').value;
        let kategori = document.getElementById('kategori').value;

        var uniq = 'id' + Date.now().toString(36)//lavet et unikt id for hver produkt. 
        let nytprodukt = {
            id: uniq, 
            produkt: produktnavn,
            price: pris,
            category: kategori
        } 
        
        
       fetch('http://localhost:3000/produktnavnarray', { //routen som den følger. 
           method: "POST", //options objekt: vi bruger post (en body med)
           headers: { // serveren ved nu det der kommer er et json objekt. 
               'Content-Type': 'application/json'
           },
            //det under er det, som bliver sendt til serveren. 
           body: JSON.stringify(nytprodukt) //body sættes til at være den stringifiet variable, altså nytprodukt.  
       }).then(response => response.json()) /* laver en response inde i then - response.json gør at det vi får tilbage fra serveren også er json. 
        Res.json laver det om til det det var inden vi stringifiede det. */
       .then(data => { 
           console.log(produktnavn)
           alert("Sucess:" + data.msg) //laver en alert som viser sucess.
       })
      .catch((err) => {
          alert('Error:', err) //ellers hvis der går noget galt hopper den ned til catch og sender en error. 
      })
    })
    

    let opdater = document.getElementById("opdater")

    opdater.addEventListener("click", (e) => {
        e.preventDefault();

        
        let produktnavn = document.getElementById('opdaterProduktNavn').value;
        let uniq = document.getElementById('opdaterProduktId').value;
        let pris = document.getElementById("opdaterpris").value;
        //får værdien inde i objektet.  

        let updatedprodukt = {
            id: uniq, 
            produkt: produktnavn,
            price: pris
        } 
        
        
       fetch('http://localhost:3000/produktnavnarray', {
           method: "PUT",
           headers: {
               'Content-Type': 'application/json'  
               // serveren ved nu det der kommer er et json objekt. 
           },
           //det under er det som bliver sendt til serveren. 
           body: JSON.stringify(updatedprodukt)
       }).then(response => response.json())
       /* laver en response inde i then - response.json gør at det vi får tilbage fra serveren også er json. 
        Res.json laver det om til det det var inden vi stringifiede det. */
       .then(data => {
           console.log(data)
           alert("Sucess:" + data.msg)
       })
      .catch((err) => {
          console.log('Error:', err)
      })
    });


    let slet = document.getElementById("slet")

    slet.addEventListener("click", (e) => {
        e.preventDefault();

        
        let uniq = document.getElementById('sletproduktid').value;
        
        
       fetch('http://localhost:3000/produktnavnarray/' + uniq, {
           method: "DELETE",
           headers: {
               'Content-Type': 'application/json'
           },
       }).then(response => response.json())
       .then(data => {
           console.log(data)
           alert("Sucess:" + data.msg)
       })
      .catch((err) => {
          console.log('Error:', err)
      })

    })

    //henter alle produkter og viser dem i en tabel!!

    let hentAlleProdukter = document.getElementById('hentAlleProdukter');//id på knappen
    let seeall = document.getElementById('seeall');  //id på tabellen. 

    hentAlleProdukter.addEventListener('click', async () => {
        seeall.innerHTML = `
        <tr> 
            <th> Navn </th>
            <th> Id </th>
            <th> Pris </th>
            <th> Kategori </th>
        </tr>
        `; //ovenover er det som bliver vist i tabellen på hjemmesiden. 

        await fetch('http://localhost:3000/produktnavnarray/', { //
            method: 'GET'
        })
        .then((res) => res.json())
        .then((res) => {
            console.log(res);

            res.forEach((e) => {
                seeall.innerHTML += `
                <tr> 
                    <td>${e.produkt}</td>
                    <td>${e.id}</td>
                    <td>${e.price}</td>
                    <td>${e.category}</td> 
                </tr>
                `; //henter værdierne fra hvert element. 

            }); 
        })
    });
}); 