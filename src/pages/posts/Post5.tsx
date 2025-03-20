import React from 'react';
import './post.css'; // Reutilizando os estilos do post anterior

const Post5: React.FC = () => {
    return(
        <div className="blog-post">
      {/* Cabeçalho */}
      <header className="blog-header">
        <h1>Configurar PHP com Nginx no Docker</h1>
      </header>

      {/* Conteúdo Principal */}
      <main className="blog-main">
        {/* Seção de Introdução */}
        <section>
          <h2>Introdução</h2>
          <p>
            Este guia mostra como configurar um ambiente de desenvolvimento para PHP com Nginx usando
            Docker. A estrutura do projeto é simples e eficiente, permitindo que você execute
            aplicações PHP com facilidade.
          </p>
        </section>

        {/* Seção de Estrutura do Projeto */}
        <section>
          <h2>Estrutura do Projeto</h2>
          <p>Antes de começar, organize o projeto com a seguinte estrutura:</p>
          <pre>
            <code>
              {`
├── ningx
|   └── conf.d
|       └──
├── src
│   └── index.php
└── docker-compose.yml
`}
            </code>
          </pre>
        </section>

        {/* Passo 1: Configurar o docker-compose.yml */}
        <section>
          <h2>Passo 1: Configurar o docker-compose.yml</h2>
          <p>
            No arquivo <code>docker-compose.yml</code>, defina os serviços para Nginx e PHP:
          </p>
          <pre>
            <code>
              {`services:
  server:
    image: nginx:alpine
    container_name: server-php
    restart: unless-stopped
    ports:
      - "7000:80"
    volumes:
      - ./nginx/conf.d/default.conf:/etc/nginx/conf.d/default.conf
      - ./src:/var/www/html/
    networks:
      - nginx

  php:
    image: php:8.3-fpm
    container_name: php
    restart: unless-stopped
    expose:
      - "9000"
    volumes:
      - ./src:/var/www/html/
    networks:
      - nginx

networks:
  nginx:
    driver: bridge`}
            </code>
          </pre>
        </section>

        {/* Passo 2: Configurar o Nginx */}
        <section>
          <h2>Passo 2: Configurar o Nginx</h2>
          <p>
            No arquivo <code>nginx/conf.d/default.conf</code>, configure o servidor Nginx para
            trabalhar com PHP:
          </p>
          <pre>
            <code>
              {`server {
    listen 80;
    server_name localhost;
    root /var/www/html/;

    index index.php index.html index.html;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \.php$ {
        include fastcgi_params;
        fastcgi_pass php:9000;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        fastcgi_param PATH_INFO $fastcgi_path_info;
    }
}`}
            </code>
          </pre>
        </section>

        {/* Passo 3: Criar o Arquivo PHP */}
        <section>
          <h2>Passo 3: Criar o Arquivo PHP</h2>
          <p>
            No arquivo <code>src/index.php</code>, crie um exemplo simples de página PHP:
          </p>
          <pre>
            <code>
              {`<!DOCTYPE html>
<html lang="pt">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PHP + Docker</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            text-align: center;
            background: #f4f4f4;
            margin: 0;
            padding: 20px;
        }
        h1 {
            color: #4F5D95;
        }
        .container {
            background: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
            display: inline-block;
            margin-top: 20px;
        }
        .icons {
            font-size: 50px;
        }
        button {
            background: #4F5D95;
            color: white;
            border: none;
            padding: 10px 20px;
            font-size: 16px;
            cursor: pointer;
            border-radius: 5px;
            margin-top: 10px;
        }
        button:hover {
            background: #35465d;
        }
        .output {
            margin-top: 10px;
            font-size: 18px;
            color: #333;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <h1>🚀 PHP + Docker 🐘🐳</h1>
    <div class="container">
        <p class="icons">🐘 PHP + 🐳 Docker</p>
        <p>Rodando PHP com Nginx no Docker</p>
    </div>
</body>
</html>`}
            </code>
          </pre>
        </section>

        {/* Passo 4: Executar o Projeto */}
        <section>
          <h2>Passo 4: Executar o Projeto</h2>
          <p>Para iniciar o ambiente, execute o seguinte comando:</p>
          <pre>
            <code>docker-compose up -d</code>
          </pre>
          <p>
            Acesse o projeto no navegador em <code>http://localhost:7000</code>.
          </p>
        </section>

        {/* Conclusão */}
        <section>
          <h2>Conclusão</h2>
          <p>
            Este guia mostrou como configurar um ambiente de desenvolvimento para PHP com Nginx usando
            Docker. Agora você pode rodar aplicações PHP de forma eficiente e escalável.
          </p>
        </section>
      </main>

      {/* Rodapé */}
      <footer className="blog-footer">
        <p>&copy; 2025, Criado por Pedro Nguinamau</p>
        <a href="https://github.com/pedro-nguinamau" target="_blank" rel="noopener noreferrer">
          <img src="./g.svg" alt="GitHub" width="30px" />
        </a>
      </footer>
    </div>
  );
    

}

export default Post5

