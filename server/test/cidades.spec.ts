import * as chai from 'chai';
import * as chaiHttp from 'chai-http';

process.env.NODE_ENV = 'test';
import { app } from '../app';
import Cidade from '../models/cidade';

const should = chai.use(chaiHttp).should();

describe('Cidades', () => {

  beforeEach(done => {
    Cidade.remove({}, err => {
      done();
    });
  });

  describe('Backend tests for cidades', () => {

    it('should get all the cidades', done => {
      chai.request(app)
        .get('/api/cidades')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          done();
        });
    });

    it('should get cidades count', done => {
      chai.request(app)
        .get('/api/cidades/count')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('number');
          res.body.should.be.eql(0);
          done();
        });
    });

    it('should create new cidade', done => {
      const cidade = { name: 'Franca', codIBGE: 2 };
      chai.request(app)
        .post('/api/cidade')
        .send(cidade)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.a.property('name');
          //res.body.should.have.a.property('weight');
          res.body.should.have.a.property('codIBGE');
          done();
        });
    });

    it('should get a cidade by its id', done => {
      const cidade = new Cidade({ name: 'Cidade', codIBGE: 4 });
      cidade.save((error, newCidade) => {
        chai.request(app)
          .get(`/api/cidade/${newCidade.id}`)
          .end((err, res) => {
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

    it('should update a cidade by its id', done => {
      const cidade = new Cidade({ name: 'Cidade', codIBGE: 4 });
      cidade.save((error, newCidade) => {
        chai.request(app)
          .put(`/api/cidade/${newCidade.id}`)
          .send({ codIBGE: 5 })
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
      });
    });

    it('should delete a cidade by its id', done => {
      const cidade = new Cidade({ name: 'Cidade', codIBGE: 4 });
      cidade.save((error, newCidade) => {
        chai.request(app)
          .delete(`/api/cidade/${newCidade.id}`)
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
      });
    });
  });

});