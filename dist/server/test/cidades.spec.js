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

  describe('Testes de backend para cidades', () => {

    it('deveria ter todas as cidades', done => {
      chai.request(app)
        .get('/api/cidades')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          done();
        });
    });

    it('deveria ter o destino das cidades', done => {
      chai.request(app)
        .get('/api/cidades/count')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('number');
          res.body.should.be.eql(0);
          done();
        });
    });

    it('deve criar nova cidade', done => {
      const cidade = { name: 'Franca', codIBGE: 2 };
      chai.request(app)
        .post('/api/cidade')
        .send(cidade)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.a.property('name');
          res.body.should.have.a.property('codIBGE');
          done();
        });
    });

    it('deve obter uma cidade por sua id', done => {
      const cidade = new Cidade({ name: 'Cidade', codIBGE: 4 });
      cidade.save((error, newCidade) => {
        chai.request(app)
          .get(`/api/cidade/${newCidade.id}`)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('name');
            res.body.should.have.property('codIBGE');
         //   res.body.should.have.property('age');
            res.body.should.have.property('_id').eql(newCidade.id);
            done();
          });
      });
    });

    it('deve atualizar uma cidade por sua id', done => {
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

    it('deve deletar uma cidade por sua id', done => {
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
//# sourceMappingURL=cidades.spec.js.map