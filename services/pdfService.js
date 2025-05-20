const fs = require('fs');
const { PDFDocument } = require('pdf-lib');
const archiver = require('archiver');
const path = require('path');

exports.extrairBoletos = async (pdfPath, nomeZip) => {
  const boletosDir = path.join(__dirname, '../boletos');
  const zipPath = path.join(__dirname, '../zips', nomeZip);

  // Limpar diretório
  fs.rmSync(boletosDir, { recursive: true, force: true });
  fs.mkdirSync(boletosDir);

  const data = await fs.promises.readFile(pdfPath);
  const pdf = await PDFDocument.load(data);
  const total = pdf.getPageCount();
  let contador = 1;

  for (let i = 0; i < total; i += 2) {
    const novoPDF = await PDFDocument.create();
    const [pagina] = await novoPDF.copyPages(pdf, [i]);
    novoPDF.addPage(pagina);

    const buffer = await novoPDF.save();
    const nomeArquivo = `boleto_${String(contador).padStart(4, '0')}.pdf`;
    const caminho = path.join(boletosDir, nomeArquivo);
    fs.writeFileSync(caminho, buffer);
    contador++;
  }

  // Criar ZIP
  const output = fs.createWriteStream(zipPath);
  const archive = archiver('zip', { zlib: { level: 9 } });

  archive.pipe(output);
  archive.directory(boletosDir, false);
  await archive.finalize();
};
