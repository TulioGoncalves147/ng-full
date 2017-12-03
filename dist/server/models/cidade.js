import * as mongoose from 'mongoose';

const cidadeSchema = new mongoose.Schema({
  name: String,
  codIBGE: Number
});

const Cidade = mongoose.model('Cidade', cidadeSchema);

export default Cidade;
//# sourceMappingURL=cidade.js.map