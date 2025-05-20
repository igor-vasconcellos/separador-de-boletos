document.getElementById('uploadForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);

  const res = await fetch('/upload', {
    method: 'POST',
    body: formData
  });

  const nomeZip = await res.text();

  document.getElementById('resultado').innerHTML = `
    <a href="/zips/${nomeZip}" download>Baixar boletos separados (.zip)</a>
  `;
});
