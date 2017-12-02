import * as mongoose from 'mongoose';

const paisSchema = new mongoose.Schema({
  name: String,
  codBACEN: Number
});

const Pais = mongoose.model('Pais', paisSchema);

export default Pais;
