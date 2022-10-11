/**
 *
 *
 *  Unit test for user module
 */

let chai = require("chai");
let server = require("../app");
let chaiHttp = require("chai-http");
chai.should();
chai.use(chaiHttp);

//Mocha currently is not still compatible with ES6 so use ES5
//Link :- https://github.com/mochajs/mocha/issues/2018

describe("User Management APIs", function () {
  describe("POST /api/user/adduser", function () {
    this.timeout(20000); //inms 3000 = 3ms default is 2ms

    it("API should send in response added user", (done) => {
      const user_data = {
        first_name: "test",
        last_name: "test",
        email: "test@konverge.ai",
        organization: "test",
      };

      chai
        .request(server)
        .post("/api/user/adduser")
        .send(user_data)
        .set("Accept", "application/json")
        .end((err, response) => {
          response.body.should.be.a("object");
          response.body.should.have.property("status");
          done();
        });
    });
  });
});
