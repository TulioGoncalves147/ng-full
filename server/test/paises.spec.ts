import * as chai from 'chai';
import * as chaiHttp from 'chai-http';

process.env.NODE_ENV = 'test';
import { app } from '../app';
import Pais from '../models/pais';

const should = chai.use(chaiHttp).should();

describe('Paises', () => {

  beforeEach(done => {
    Pais.remove({}, err => {
      done();
    });
  });

  describe('Backend tests for paises', () => {

    it('should get all the paises', done => {
      chai.request(app)
        .get('/api/paises')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          done();
        });
    });

    it('should get paises count', done => {
      chai.request(app)
        .get('/api/paises/count')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('number');
          res.body.should.be.eql(0);
          done();
        });
    });

    it('should create new pais', done => {
      const pais = { name: 'BRASIL', codBACEN: 2 };
      chai.request(app)
        .post('/api/pais')
        .send(pais)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.a.property('name');
          res.body.should.have.a.property('codBACEN');
          done();
        });
    });

    it('should get a pais by its id', done => {
      const pais = new Pais({ name: 'Pais', codBACEN: 4 });
      pais.save((error, newPais) => {
        chai.request(app)
          .get(`/api/pais/${newPais.id}`)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('name');
            res.body.should.have.property('codBACEN');
            res.body.should.have.property('_id').eql(newPais.id);
            done();
          });
      });
    });

    it('should update a pais by its id', done => {
      const pais = new Pais({ name: 'Pais', codBACEN: 4 });
      pais.save((error, newPais) => {
        chai.request(app)
          .put(`/api/pais/${newPais.id}`)
          .send({ codBACEN: 5 })
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
      });
    });

    it('should delete a pais by its id', done => {
      const pais = new Pais({ name: 'Pais', codBACEN: 4 });
      pais.save((error, newPais) => {
        chai.request(app)
          .delete(`/api/pais/${newPais.id}`)
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
      });
    });
  });

});