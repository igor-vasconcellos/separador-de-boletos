# Sistema Web de Separação de Boletos PDF

## Descrição

Este projeto tem como objetivo automatizar a separação de boletos a partir de arquivos PDF enviados por condomínios. Cada arquivo PDF contém múltiplas páginas (exemplo: 840 páginas), onde apenas as páginas ímpares correspondem aos boletos válidos. O sistema extrai essas páginas ímpares, renomeia sequencialmente e gera um arquivo ZIP para download, facilitando a distribuição dos boletos.

O sistema é desenvolvido em Node.js com Express.js, arquitetura MVC e front-end em HTML e CSS, permitindo que administradores dos condomínios façam upload dos arquivos e baixem os boletos processados via web, eliminando a necessidade de processamento local.

---

## Tecnologias Utilizadas

- Node.js  
- Express.js  
- pdf-lib (manipulação de PDFs)  
- archiver (geração de arquivos ZIP)  
- HTML / CSS (interface front-end)  
- MVC (arquitetura do projeto)  

---

## Funcionalidades

- Upload de arquivos PDF com múltiplas páginas  
- Extração das páginas ímpares do PDF  
- Renomeação sequencial dos boletos extraídos  
- Compactação dos boletos em um arquivo ZIP para download  
- Interface simples e responsiva para upload e download  
- Estrutura organizada em arquitetura MVC para facilitar manutenção e escalabilidade.

---

## Como Rodar o Projeto

1. Clone este repositório:  
   ```bash
   git clone <URL_DO_REPOSITÓRIO>
   cd nome-do-projeto
