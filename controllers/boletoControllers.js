const boletoModel = require('../models/boletoModel');

exports.processar = async (req, res) => {
  try {
    const nomeZip = await boletoModel.separarBoletos(req.file.path);
    res.send(nomeZip); // retorna nome do arquivo zip pro front usar no link
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao processar o PDF');
  }
};
