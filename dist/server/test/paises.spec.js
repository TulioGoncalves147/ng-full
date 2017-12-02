"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai = require("chai");
var chaiHttp = require("chai-http");
process.env.NODE_ENV = 'test';
var app_1 = require("../app");
var pais_1 = require("../models/pais");
var should = chai.use(chaiHttp).should();
describe('Paises', function () {
    beforeEach(function (done) {
        pais_1.default.remove({}, function (err) {
            done();
        });
    });
    describe('Backend tests for paises', function () {
        it('should get all the paises', function (done) {
            chai.request(app_1.app)
                .get('/api/paises')
                .end(function (err, res) {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(0);
                done();
            });
        });
        it('should get paises count', function (done) {
            chai.request(app_1.app)
                .get('/api/paises/count')
                .end(function (err, res) {
                res.should.have.status(200);
                res.body.should.be.a('number');
                res.body.should.be.eql(0);
                done();
            });
        });
        it('should create new pais', function (done) {
            var pais = { name: 'BRASIL', codBACEN: 2 };
            chai.request(app_1.app)
                .post('/api/pais')
                .send(pais)
                .end(function (err, res) {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.a.property('name');
                res.body.should.have.a.property('codBACEN');
                done();
            });
        });
        it('should get a pais by its id', function (done) {
            var pais = new pais_1.default({ name: 'Pais', codBACEN: 4 });
            pais.save(function (error, newPais) {
                chai.request(app_1.app)
                    .get("/api/pais/" + newPais.id)
                    .end(function (err, res) {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('name');
                    res.body.should.have.property('codBACEN');
                    res.body.should.have.property('_id').eql(newPais.id);
                    done();
                });
            });
        });
        it('should update a pais by its id', function (done) {
            var pais = new pais_1.default({ name: 'Pais', codBACEN: 4 });
            pais.save(function (error, newPais) {
                chai.request(app_1.app)
                    .put("/api/pais/" + newPais.id)
                    .send({ codBACEN: 5 })
                    .end(function (err, res) {
                    res.should.have.status(200);
                    done();
                });
            });
        });
        it('should delete a pais by its id', function (done) {
            var pais = new pais_1.default({ name: 'Pais', codBACEN: 4 });
            pais.save(function (error, newPais) {
                chai.request(app_1.app)
                    .delete("/api/pais/" + newPais.id)
                    .end(function (err, res) {
                    res.should.have.status(200);
                    done();
                });
            });
        });
    });
});
//# sourceMappingURL=paises.spec.js.map