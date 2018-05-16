/**
 * Testcases aimed at testing the authentication process. 
 */
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

chai.should();
chai.use(chaiHttp);

// After successful registration we have a valid token. We export this token
// for usage in other testcases that require login.

describe('Registration', () => {
    it('should return a token when providing valid information', (done) => {
        chai.request(server).post('/api/register').send({
            firstname: "Kees",
            lastname: "Karel",
            email: "test@test.nl",
            password: "secret"
        }).end((err, res) => {
            res.should.have.status(200);

            res.body.should.be.a('object');
            res.body.should.have.property('token');
            res.body.should.have.property('email');

            let validToken = res.body.token;

            module.exports = {
                token: validToken
            }
                       
            done();
        });
    });

    it('should return an error on GET request', (done) => {
        chai.request(server).get('/api/register')
        .end((err, res) => {
            res.should.have.status(401);
            
            done();
        });
    });

    it('should throw an error when the user already exists', (done) => {
        chai.request(server).post('/api/register').send({
            firstname: "random",
            lastname: "random",
            email: "test@test.nl",
            password: "random"
        }).end((err, res) => {
            res.should.have.status(412);

            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.should.have.property('code');
            res.body.should.have.property('datetime');
                       
            done();
        });
    });

    it('should throw an error when no firstname is provided', (done) => {
        chai.request(server).post('/api/register').send({
            lastname: "Karel",
            email: "test@test.nl",
            password: "secret"
        }).end((err, res) => {
            res.should.have.status(412);

            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.should.have.property('code');
            res.body.should.have.property('datetime');
       
            done();
        });
    });

    it('should throw an error when firstname is shorter than 2 chars', (done) => {
        chai.request(server).post('/api/register').send({
            firstname: "t",
            lastname: "Kees",
            email: "test@test.nl",
            password: "secret"
        }).end((err, res) => {
            res.should.have.status(412);

            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.should.have.property('code');
            res.body.should.have.property('datetime');
       
            done();
        });
    });

    it('should throw an error when no lastname is provided', (done) => {
        chai.request(server).post('/api/register').send({
            firstname: "Karel",
            email: "test@test.nl",
            password: "secret"
        }).end((err, res) => {
            res.should.have.status(412);

            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.should.have.property('code');
            res.body.should.have.property('datetime');
       
            done();
        });
    });

    it('should throw an error when lastname is shorter than 2 chars', (done) => {
        chai.request(server).post('/api/register').send({
            firstname: "Karel",
            lastname: "t",
            email: "test@test.nl",
            password: "secret"
        }).end((err, res) => {
            res.should.have.status(412);

            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.should.have.property('code');
            res.body.should.have.property('datetime');
       
            done();
        });
    });

    it('should throw an error when email is invalid', (done) => {
        chai.request(server).post('/api/register').send({
            firstname: "Karel",
            lastname: "t",
            email: "test.nl",
            password: "secret"
        }).end((err, res) => {
            res.should.have.status(412);

            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.should.have.property('code');
            res.body.should.have.property('datetime');
       
            done();
        });
    });

});

describe('Login', () => {

    it('should return a token when providing valid information', (done) => {
        chai.request(server).post('/api/login').send({
            email: "test@test.nl",
            password: "secret"
        }).end((err, res) => {
            res.should.have.status(200);

            res.body.should.be.a('object');
            res.body.should.have.property('token');
            res.body.should.have.property('email');

            done();
        });
    });

    it('should throw an error when email does not exist', (done) => {
        chai.request(server).post('/api/login').send({
            email: "random@test.nl",
            password: "secret"
        }).end((err, res) => {
            res.should.have.status(412);

            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.should.have.property('code');
            res.body.should.have.property('datetime');
            done();
        });
    });

    it('should throw an error when email exists but password is invalid', (done) => {
        chai.request(server).post('/api/login').send({
            email: "test@test.nl",
            password: "test"
        }).end((err, res) => {
            res.should.have.status(401);

            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.should.have.property('code');
            res.body.should.have.property('datetime');
            done();
        });
    });

    it('should throw an error when using an invalid email', (done) => {
        chai.request(server).post('/api/login').send({
            email: "test.nl",
            password: "test"
        }).end((err, res) => {
            res.should.have.status(412);

            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.should.have.property('code');
            res.body.should.have.property('datetime');
            done();
        });
    });

});