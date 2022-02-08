const chai = require ("chai");
const app = require('../server.js');
//const chai = require('chai');
const chaiHttp = require ('chai-http')

chai.should();
chai.use(chaiHttp);

describe(`POST /produktnavnarray`, () => {
    it('should post a new product', (done) => {
        chai
            .request(app)
            .get('/produktnavnarray')
            .end((err, res) => {

                //tjek at fejlbeskeden ikke er sat 
                expect(err).to.be.null;

                //tjek om statuskode er 200
                expect(res.status).to.equal(200);

                //tjek om response er et objekt. 
                expect(res.body).to.be.an('object');

                //tjek at response body ikke er et array
                expect(res.body).to.not.be.an('array');

                done();
            });
            
    });
});