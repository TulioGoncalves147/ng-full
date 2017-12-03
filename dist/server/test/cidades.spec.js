"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai = require("chai");
var chaiHttp = require("chai-http");
process.env.NODE_ENV = 'test';
var app_1 = require("../app");
var cidade_1 = require("../models/cidade");
var should = chai.use(chaiHttp).should();
describe('Cidades', function () {
    beforeEach(function (done) {
        cidade_1.default.remove({}, function (err) {
            done();
        });
    });
    describe('Backend tests for cidades', function () {
        it('should get all the cidades', function (done) {
            chai.request(app_1.app)
                .get('/api/cidades')
                .end(function (err, res) {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(0);
                done();
            });
        });
        it('should get cidades count', function (done) {
            chai.request(app_1.app)
                .get('/api/cidades/count')
                .end(function (err, res) {
                res.should.have.status(200);
                res.body.should.be.a('number');
                res.body.should.be.eql(0);
                done();
            });
        });
        it('should create new cidade', function (done) {
            var cidade = { name: 'Franca', codIBGE: 2 };
            chai.request(app_1.app)
                .post('/api/cidade')
                .send(cidade)
                .end(function (err, res) {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.a.property('name');
                //res.body.should.have.a.property('weight');
                res.body.should.have.a.property('codIBGE');
                done();
            });
        });
        it('should get a cidade by its id', function (done) {
            var cidade = new cidade_1.default({ name: 'Cidade', codIBGE: 4 });
            cidade.save(function (error, newCidade) {
                chai.request(app_1.app)
                    .get("/api/cidade/" + newCidade.id)
                    .end(function (err, res) {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('name');
                    // res.body.should.have.property('weight');
                    res.body.should.have.property('codIBGE');
                    res.body.should.have.property('_id').eql(newCidade.id);
                    done();
                });
            });
        });
        it('should update a cidade by its id', function (done) {
            var cidade = new cidade_1.default({ name: 'Cidade', codIBGE: 4 });
            cidade.save(function (error, newCidade) {
                chai.request(app_1.app)
                    .put("/api/cidade/" + newCidade.id)
                    .send({ codIBGE: 5 })
                    .end(function (err, res) {
                    res.should.have.status(200);
                    done();
                });
            });
        });
        it('should delete a cidade by its id', function (done) {
            var cidade = new cidade_1.default({ name: 'Cidade', codIBGE: 4 });
            cidade.save(function (error, newCidade) {
                chai.request(app_1.app)
                    .delete("/api/cidade/" + newCidade.id)
                    .end(function (err, res) {
                    res.should.have.status(200);
                    done();
                });
            });
        });
    });
});
//# sourceMappingURL=cidades.spec.js.map