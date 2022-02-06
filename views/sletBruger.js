document.addEventListener("DOMContentLoaded", function () {

    let slet = document.getElementById("sletbruger")

        slet.addEventListener("click", (e) => {
            e.preventDefault();

            let uniq = document.getElementById('sletBrugerId').value;
            
            
        fetch('http://localhost:3000/sletBrugerId/' + uniq, {
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
})
