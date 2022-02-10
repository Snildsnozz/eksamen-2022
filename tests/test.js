const chai = require("chai");
const app = require("../server.js");
const chaiHttp = require("chai-http");
const expect = chai.expect;
//const { describe, it } = require("mocha");

chai.should();
chai.use(chaiHttp);

describe(`POST /produktnavnarray`, () => {
  it("should post a new product", (done) => {
    chai
      .request(app)
      .post("/produktnavnarray")
      .send({
        id: "testid",
        produkt: "sille 123",
        price: "250",
        category: "Møbler",
      })
      .end((err, res) => {
        //tjek at fejlbeskeden ikke er sat
        expect(err).to.be.null;

        //tjek om statuskode er 200
        expect(res.status).to.equal(200);

        //Tjekker om msg er den rigtige
        expect(res.body.msg).to.equal("Din vare er tilføjet");

        //tjek om man får produkt i response.
        expect(res.body.product).to.not.be.null;

        //tjek om response er et objekt.
        expect(res.body.product).to.be.an("object");

        //tjek at response body ikke er et array
        expect(res.body).to.not.be.an("array");

        done();
      });
  });
});
