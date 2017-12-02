"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai = require("chai");
var chaiHttp = require("chai-http");
process.env.NODE_ENV = 'test';
var app_1 = require("../app");
var estado_1 = require("../models/estado");
var should = chai.use(chaiHttp).should();
describe('Estados', function () {
    beforeEach(function (done) {
        estado_1.default.remove({}, function (err) {
            done();
        });
    });
    describe('Backend tests for estados', function () {
        it('should get all the estados', function (done) {
            chai.request(app_1.app)
                .get('/api/estados')
                .end(function (err, res) {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(0);
                done();
            });
        });
        it('should get estados count', function (done) {
            chai.request(app_1.app)
                .get('/api/estados/count')
                .end(function (err, res) {
                res.should.have.status(200);
                res.body.should.be.a('number');
                res.body.should.be.eql(0);
                done();
            });
        });
        it('should create new estado', function (done) {
            var estado = { name: 'São Paulo', UF: 'SP', codIBGE: 2 };
            chai.request(app_1.app)
                .post('/api/estado')
                .send(estado)
                .end(function (err, res) {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.a.property('name');
                res.body.should.have.a.property('UF');
                res.body.should.have.a.property('codIBGE');
                done();
            });
        });
        it('should get a estado by its id', function (done) {
            var estado = new estado_1.default({ name: 'Estado', UF: 'SP', codIBGE: 4 });
            estado.save(function (error, newEstado) {
                chai.request(app_1.app)
                    .get("/api/estado/" + newEstado.id)
                    .end(function (err, res) {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('name');
                    res.body.should.have.property('UF');
                    res.body.should.have.property('codIBGE');
                    res.body.should.have.property('_id').eql(newEstado.id);
                    done();
                });
            });
        });
        it('should update a estado by its id', function (done) {
            var estado = new estado_1.default({ name: 'Estado', UF: 'SP', codIBGE: 4 });
            estado.save(function (error, newEstado) {
                chai.request(app_1.app)
                    .put("/api/estado/" + newEstado.id)
                    .send({ UF: 5 })
                    .end(function (err, res) {
                    res.should.have.status(200);
                    done();
                });
            });
        });
        it('should delete a estado by its id', function (done) {
            var estado = new estado_1.default({ name: 'Estado', UF: 'SP', codIBGE: 4 });
            estado.save(function (error, newEstado) {
                chai.request(app_1.app)
                    .delete("/api/estado/" + newEstado.id)
                    .end(function (err, res) {
                    res.should.have.status(200);
                    done();
                });
            });
        });
    });
});
//# sourceMappingURL=estados.spec.js.map