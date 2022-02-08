const express = require("express");
const app = express(); //gør vi kan kalde metoderne (get, put osv).
const port = 3000;
const cors = require("cors");
const fs = require("fs");
const router = express.Router();

app.use(cors());
app.use(express.json());
app.use(express.static("./views"));
app.use("/", router);

//app.use('/users', userController);

app.listen(port, () => {
  console.log(`Den rigtige server lytter på http://localhost:${port}`);
});

app.post("/produktnavnarray", (req, res) => {
  let dataArray = JSON.parse(fs.readFileSync("data/produktnavn.json"));

  dataArray.push(req.body);
  //nu hvor det er et array kan man bruge .push. husk tomt array i json filen så den kan bruge array funktionerne.

  fs.writeFile(
    "data/produktnavn.json",
    JSON.stringify(dataArray, null, 4),
    (err) => {
      if (err) res.send(err); //hvis der er en error, sender det error tilbage til brugeren.
      res.send({
        msg: "Din vare er tilføjet",
        product: req.body,
      }); //bliver det en succes sender den beskeden tilbage.
    }
  );
});

app.get("/produktnavnarray", (req, res) => {
  fs.readFile("data/produktnavn.json", function (err, data) {
    //response.sendFile(path.join(__dirname + '/views/varer.html'));
    if (err) res.send(err);
    res.send(data);
  });
});

app.put("/produktnavnarray", (req, res) => {
  let dataArray = JSON.parse(fs.readFileSync("data/produktnavn.json"));

  for (let i = 0; i < dataArray.length; i++) {
    if (dataArray[i].id == req.body.id) {
      dataArray[i].produkt = req.body.produkt;
      fs.writeFile(
        "data/produktnavn.json",
        JSON.stringify(dataArray, null, 4),
        (err) => {
          if (err) res.send(err);
          res.status(200).json({
            msg: "Din vare er opdateret",
          });
        }
      );
    }
  }
});

app.delete("/produktnavnarray/:id", (req, res) => {
  let dataArray = JSON.parse(fs.readFileSync("data/produktnavn.json"));

  for (let i = 0; i < dataArray.length; i++) {
    if (dataArray[i].id == req.params.id) {
      dataArray.splice(i, 1); //sletter et produkt af gangen.

      fs.writeFile(
        "data/produktnavn.json",
        JSON.stringify(dataArray, null, 4),
        (err) => {
          if (err) res.send(err);
          res.status(200).json({
            msg: "Din vare er slettet",
          });
        }
      );
    }
  }
});

app.post("/opretBrugerId", (req, res) => {
  let dataArray = JSON.parse(fs.readFileSync("data/user.json"));

  dataArray.push(req.body); //nu hvor det er et array kan man bruge .push. husk tomt array i json filen så den kan bruge array funktionerne.

  fs.writeFile("data/user.json", JSON.stringify(dataArray, null, 4), (err) => {
    if (err) res.send(err); //hvis der er en error, sender det error tilbage til brugeren.
    res.send({
      msg: "Din bruger er tilføjet",
    }); //bliver det en succes sender den beskeden tilbage.
  });
});

app.put("/updateBrugerId", (req, res) => {
  let dataArray = JSON.parse(fs.readFileSync("data/user.json"));

  for (let i = 0; i < dataArray.length; i++) {
    if (dataArray[i].id == req.body.id) {
      dataArray[i].navn = req.body.navn;
      dataArray[i].kode = req.body.kode;
      dataArray[i].mail = req.body.mail;
      fs.writeFile(
        "data/user.json",
        JSON.stringify(dataArray, null, 4),
        (err) => {
          if (err) res.send(err);
          res.status(200).json({
            msg: "Din bruger er opdateret",
          });
        }
      );
    }
  }
});

app.delete("/sletBrugerId/:id", (req, res) => {
  let dataArray = JSON.parse(fs.readFileSync("data/user.json"));

  for (let i = 0; i < dataArray.length; i++) {
    if (dataArray[i].id == req.params.id) {
      dataArray.splice(i, 1); //sletter en bruger af gangen.

      fs.writeFile(
        "data/user.json",
        JSON.stringify(dataArray, null, 4),
        (err) => {
          if (err) res.send(err);
          res.status(200).json({
            msg: "Din bruger er slettet",
          });
        }
      );
    }
  }
});

router.post("/views/login", (req, res) => {
  const user = { email: req.body.email, password: req.body.password }; //får bodyen fra vores req og sætter ind i user obejkt. 

  let dataArray = JSON.parse(fs.readFileSync("data/user.json")); //læser hele user filen og laver det til et array, der består af bruger objekter. 
  let found = dataArray.find((u) => user.email == u.mail);
  //finder det element, der har samme mail, som den der kommer med i requestet. 

  if (found) { //findes brugeren? 
    if (user.password == found.kode) { //brugeren fandtes, er det det rigtige password.
      res.status(200).send(found); //brugeren fandet kodeordet er korrekt, sender brugeren tilbage. 
    } else {
      res.status(401).send(false); //brugeren fandtes koden var forkert, sender fejl.
    }
  } else {
    res.status(404).send(false); //brugeren findes ikke, sender fejl. 
  }
});

module.exports = app;