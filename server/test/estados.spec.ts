import * as chai from 'chai';
import * as chaiHttp from 'chai-http';

process.env.NODE_ENV = 'test';

import { app } from '../app';
import Estado from '../models/estado';

const should = chai.use(chaiHttp).should();

describe('Estados', () => {

  beforeEach(done => {
    Estado.remove({}, err => {
      done();
    });
  });

  describe('Backend tests for estados', () => {

    it('should get all the estados', done => {
      chai.request(app)
        .get('/api/estados')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          done();
        });
    });

    it('should get estados count', done => {
      chai.request(app)
        .get('/api/estados/count')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('number');
          res.body.should.be.eql(0);
          done();
        });
    });

    it('should create new estado', done => {
      const estado = { name: 'São Paulo', UF: 'SP', codIBGE: 2 };
      chai.request(app)
        .post('/api/estado')
        .send(estado)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.a.property('name');
          res.body.should.have.a.property('UF');
          res.body.should.have.a.property('codIBGE');
          done();
        });
    });

    it('should get a estado by its id', done => {
      const estado = new Estado({ name: 'Estado', UF: 'SP', codIBGE: 4 });
      estado.save((error, newEstado) => {
        chai.request(app)
          .get(`/api/estado/${newEstado.id}`)
          .end((err, res) => {
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

    it('should update a estado by its id', done => {
      const estado = new Estado({ name: 'Estado', UF: 'SP', codIBGE: 4 });
      estado.save((error, newEstado) => {
        chai.request(app)
          .put(`/api/estado/${newEstado.id}`)
          .send({ UF: 5 })
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
      });
    });

    it('should delete a estado by its id', done => {
      const estado = new Estado({ name: 'Estado', UF: 'SP', codIBGE: 4 });
      estado.save((error, newEstado) => {
        chai.request(app)
          .delete(`/api/estado/${newEstado.id}`)
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
      });
    });
  });

});