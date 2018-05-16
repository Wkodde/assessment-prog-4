const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
let token = "";
const invalidToken = "eyJ0eXAAAAAAAajIUzI1NiJ9.eyJleHAiOjE1MjcyMzc4NzEsImlhdCI6MTUyNjM3Mzg3MSwic3ViIjp7InVzZXIiOnsiaWQiOjMsImZpcnN0bmFtZSI6IkpvcnJpdCIsImxhc3RuYW1lIjoiTWVldXdpc3NlbiIsImVtYWlsIjoiam9ycml0LW1lZXV3aXNzZW5AaG90bWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCRDSnRQNlNQMGh0dTdRTURPZW51RU1lTmtuQXdkWjZudGdINVc1YjZTSGRXRXVpcTk3SG9MYSJ9fX0._V3G_WVk6-v1pN9CiYfz7e1Afnz5nZO2-2X6xCde5jA";
let studentenhuisID = 0;
const naam = "TestNaam";
const adres = "TestAdres";

chai.should();
chai.use(chaiHttp);

describe('Studentenhuis API POST', () => {
    before(function(){
        chai.request(server)
            .post('/api/login')
            .send({
                "email": "test@test.nl",
                "password": "secret"
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');

                token = res.body.token;
            });


    });
    it('should throw an error when using invalid JWT token', (done) => {
        chai.request(server)
            .post('/api/studentenhuis')
            .send({
                "naam": naam,
                "adres": adres
            }).set(
            "x-access-token", invalidToken
        )
            .end((err, res) => {
                res.should.have.status(401);
                res.body.should.be.a('object');

                let response = res.body;
                response.should.have.property('message');
                response.should.have.property('code');
                response.should.have.property('datetime');
                done();
            });
    });

    it('should return a studentenhuis when posting a valid object', (done) => {
        chai.request(server)
            .post('/api/studentenhuis')
            .send({
                "naam": naam,
                "adres": adres
            }).set(
                "x-access-token", token
            )
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');

                let response = res.body;
                response.should.have.property('ID');
                studentenhuisID = response.ID;
                response.should.have.property('naam').equals(naam);
                response.should.have.property('adres').equals(adres);
                response.should.have.property('contact');
                response.should.have.property('email');
                done();
            });

    });

    it('should throw an error when naam is missing', (done) => {
        chai.request(server)
            .post('/api/studentenhuis')
            .send({
                "adres": adres
            }).set(
            "x-access-token", token
        )
            .end((err, res) => {
                res.should.have.status(412);
                res.body.should.be.a('object');

                let response = res.body;
                response.should.have.property('message');
                response.should.have.property('code');
                response.should.have.property('datetime');
                done();
            });
    });

    it('should throw an error when adres is missing', (done) => {
        chai.request(server)
            .post('/api/studentenhuis')
            .send({
                "naam": naam
            }).set(
            "x-access-token", token
        )
            .end((err, res) => {
                res.should.have.status(412);
                res.body.should.be.a('object');

                let response = res.body;
                response.should.have.property('message');
                response.should.have.property('code');
                response.should.have.property('datetime');
                done();
            });
    })
});

describe('Studentenhuis API GET all', () => {
    it('should throw an error when using invalid JWT token', (done) => {
        chai.request(server)
            .get('/api/studentenhuis')
            .set(
            "x-access-token", invalidToken
        )
            .end((err, res) => {
                res.should.have.status(401);
                res.body.should.be.a('object');

                let response = res.body;
                response.should.have.property('message');
                response.should.have.property('code');
                response.should.have.property('datetime');
                done();
            });
    });

    it('should return all studentenhuizen when using a valid token', (done) => {
        chai.request(server)
            .get('/api/studentenhuis')
            .set(
            "x-access-token", token
        )
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            });
    })
});

describe('Studentenhuis API GET one', () => {
    it('should throw an error when using invalid JWT token', (done) => {
        chai.request(server)
            .get('/api/studentenhuis/' + studentenhuisID)
            .set(
                "x-access-token", invalidToken
            )
            .end((err, res) => {
                res.should.have.status(401);
                res.body.should.be.a('object');

                let response = res.body;
                response.should.have.property('message');
                response.should.have.property('code');
                response.should.have.property('datetime');
                done();
            });
    });

    it('should return the correct studentenhuis when using an existing huisId', (done) => {
        chai.request(server)
            .get('/api/studentenhuis/' + studentenhuisID)
            .set(
                "x-access-token", token
            )
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');

                let response = res.body;
                response.should.have.property('ID');
                response.should.have.property('naam').equals(naam);
                response.should.have.property('adres').equals(adres);
                response.should.have.property('contact');
                response.should.have.property('email');
                done();
            });
    });

    it('should return an error when using an non-existing huisId', (done) => {
        chai.request(server)
            .get('/api/studentenhuis/0')
            .set(
                "x-access-token", token
            )
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.be.a('object');

                let response = res.body;
                response.should.have.property('message');
                response.should.have.property('code');
                response.should.have.property('datetime');
                done();
            });
    })
});

describe('Studentenhuis API PUT', () => {
    it('should throw an error when using invalid JWT token', (done) => {
        chai.request(server)
            .put('/api/studentenhuis/' + studentenhuisID)
            .set(
                "x-access-token", invalidToken
            )
            .end((err, res) => {
                res.should.have.status(401);
                res.body.should.be.a('object');

                let response = res.body;
                response.should.have.property('message');
                response.should.have.property('code');
                response.should.have.property('datetime');
                done();
            });
    });

    it('should return a studentenhuis with ID when posting a valid object', (done) => {
        chai.request(server)
            .put('/api/studentenhuis/' + studentenhuisID)
            .send({
                "naam": "nieuwenaam",
                "adres": "Nieuw Adres"
            }).set(
            "x-access-token", token
        )
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');

                let response = res.body;
                response.should.have.property('ID');
                studentenhuisID = response.ID;
                response.should.have.property('naam').equals("nieuwenaam");
                response.should.have.property('adres').equals("Nieuw Adres");
                response.should.have.property('contact');
                response.should.have.property('email');
                done();
            });
    });

    it('should throw an error when naam is missing', (done) => {
        chai.request(server)
            .put('/api/studentenhuis/' + studentenhuisID)
            .send({
                "adres": "Nieuw Adres"
            }).set(
            "x-access-token", token
        )
            .end((err, res) => {
                res.should.have.status(412);
                res.body.should.be.a('object');

                let response = res.body;
                response.should.have.property('message');
                response.should.have.property('code');
                response.should.have.property('datetime');
                done();
            });
    });

    it('should throw an error when adres is missing', (done) => {
        chai.request(server)
            .put('/api/studentenhuis/' + studentenhuisID)
            .send({
                "naam": "nieuwenaam"
            }).set(
            "x-access-token", token
        )
            .end((err, res) => {
                res.should.have.status(412);
                res.body.should.be.a('object');

                let response = res.body;
                response.should.have.property('message');
                response.should.have.property('code');
                response.should.have.property('datetime');
                done();
            });
    })
});

describe('Studentenhuis API DELETE', () => {
    it('should throw an error when using invalid JWT token', (done) => {
        chai.request(server)
            .delete('/api/studentenhuis/' + studentenhuisID)
            .set(
                "x-access-token", invalidToken
            )
            .end((err, res) => {
                res.should.have.status(401);
                res.body.should.be.a('object');

                let response = res.body;
                response.should.have.property('message');
                response.should.have.property('code');
                response.should.have.property('datetime');
                done();
            });
    });

    it('should return a succesfull delete message when deleting a studentenhuis', (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        done()
    })

    it('should throw an error when there are meals in a studentenhuis', (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        done()
    })


    it('should throw an error when the user is not the creator of studentenhuis', (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        done()
    })
})