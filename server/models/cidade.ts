import * as mongoose from 'mongoose';

const cidadeSchema = new mongoose.Schema({
  name: String,
 // weight: Number,
  codIBGE: Number
});

const Cidade = mongoose.model('Cidade', cidadeSchema);

export default Cidade;