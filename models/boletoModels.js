const fs = require('fs');
const path = require('path');
const { PDFDocument } = require('pdf-lib');
const archiver = require('archiver');

exports.separarBoletos = async (caminhoPDF) => {
  const nomeBase = Date.now();
  const pastaTemp = path.join(__dirname, '..', 'uploads', `temp_${nomeBase}`);
  const pastaZip = path.join(__dirname, '..', 'zips');
  const nomeZip = `boletos_${nomeBase}.zip`;
  const caminhoZip = path.join(pastaZip, nomeZip);

  // Cria pasta temporária para salvar boletos
  fs.mkdirSync(pastaTemp, { recursive: true });

  // Lê o PDF original
  const pdfBytes = fs.readFileSync(caminhoPDF);
  const pdfDoc = await PDFDocument.load(pdfBytes);
  const totalPaginas = pdfDoc.getPageCount();

  let contador = 1;

  // Loop pelas páginas ímpares (0 = página 1)
  for (let i = 0; i < totalPaginas; i += 2) {
    const novoPdf = await PDFDocument.create();
    const [paginaExtraida] = await novoPdf.copyPages(pdfDoc, [i]);
    novoPdf.addPage(paginaExtraida);

    const nomeArquivo = `boleto_${String(contador).padStart(4, '0')}.pdf`;
    const caminhoArquivo = path.join(pastaTemp, nomeArquivo);
    const pdfFinal = await novoPdf.save();

    fs.writeFileSync(caminhoArquivo, pdfFinal);
    contador++;
  }

  // Criação do ZIP
  await new Promise((resolve, reject) => {
    const output = fs.createWriteStream(caminhoZip);
    const archive = archiver('zip', { zlib: { level: 9 } });

    output.on('close', () => {
      // Limpa a pasta temporária após zipar
      fs.rmSync(pastaTemp, { recursive: true, force: true });
      resolve();
    });

    archive.on('error', reject);

    archive.pipe(output);
    archive.directory(pastaTemp, false);
    archive.finalize();
  });

  return nomeZip;
};
