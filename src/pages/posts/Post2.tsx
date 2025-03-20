import React from 'react';
import './post.css'; // Reutilizando os estilos do post anterior

const Post2: React.FC = () => {
  return (
    <div className="blog-post">
      {/* Cabeçalho */}
      <header className="blog-header">
        <h1>Configurar Servidor Fastify com Docker e Nginx Load Balancer</h1>
      </header>

      {/* Conteúdo Principal */}
      <main className="blog-main">
        {/* Seção de Introdução */}
        <section>
          <h2>Introdução</h2>
          <p>
            Este guia mostra como configurar um servidor Fastify com balanceamento de carga usando
            Docker e Nginx. O objetivo é criar dois servidores Fastify e distribuir as requisições
            entre eles usando um balanceador de carga Nginx.
          </p>
        </section>

        {/* Passo 1: Configurar o Servidor Fastify */}
        <section>
          <h2>Passo 1: Configurar o Servidor Fastify</h2>
          <p>Crie um arquivo <code>server.js</code> com o seguinte conteúdo:</p>
          <pre>
            <code>
              {`// Importar o framework e instanciá-lo
import Fastify from 'fastify'
const fastify = Fastify()

// Declarar uma rota
fastify.get('/', async function handler (request, reply) {
  return { hello: \`A aplicação neste momento está a rodar no: \${process.env.HOSTNAME}\` }
})

// Rodar o servidor
fastify.listen({ port: 3333, host: '0.0.0.0' }, async (err, adress) => {
    if(err) {
        console.log(err)
    }
    console.log(\`Server listen in this \${adress}\`)
});`}
            </code>
          </pre>
        </section>

        {/* Passo 2: Criar o Dockerfile */}
        <section>
          <h2>Passo 2: Criar o Dockerfile</h2>
          <p>Crie um arquivo <code>Dockerfile</code> para configurar o ambiente do servidor:</p>
          <pre>
            <code>
              {`# Usa a imagem node:18-alpine como base
FROM node:18-alpine

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copia os arquivos de dependência
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante do código da aplicação
COPY . .

# Expõe a porta que a aplicação usa
EXPOSE 3333

# Comando para rodar a aplicação em desenvolvimento (com hot-reload usando tsx)
CMD ["npm", "run", "dev"]`}
            </code>
          </pre>
        </section>

        {/* Passo 3: Configurar o Nginx como Load Balancer */}
        <section>
          <h2>Passo 3: Configurar o Nginx como Load Balancer</h2>
          <p>Crie um arquivo <code>nginx.conf</code> para configurar o balanceamento de carga:</p>
          <pre>
            <code>
              {`# Define o upstream (grupo de servidores)
upstream backend {
    server server_1:3333;  # Servidor 1
    server server_2:3333;  # Servidor 2
}

# Configuração do servidor HTTP
server {
    listen 80;

    location / {
        proxy_pass http://backend;  # Encaminha as requisições para o upstream
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}`}
            </code>
          </pre>
        </section>

        {/* Passo 4: Configurar o Docker Compose */}
        <section>
          <h2>Passo 4: Configurar o Docker Compose</h2>
          <p>Crie um arquivo <code>docker-compose.yml</code> para orquestrar os contêineres:</p>
          <pre>
            <code>
              {`version: '3.8'
services:
  server-load-balance:
    image: nginx:alpine
    container_name: server_load_balance_
    restart: always
    ports:
      - "80:80"  # Expõe a porta 80 para o balanceador de carga
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/conf.d/default.conf
    depends_on:
      - server_1
    networks:
      - loadbalancing

  server_1:
    build: ./app  # Usa o Dockerfile no diretório app/
    container_name: server_1
    restart: always
    environment:
      - HOSTNAME=server_1
    volumes:
      - ./app:/app  # Monta o código da aplicação para hot-reload
      - /app/node_modules  # Evita sobrescrever o node_modules no contêiner
    networks:
      - loadbalancing

  server_2:
    build: ./app  # Usa o Dockerfile no diretório app/
    container_name: server_2
    restart: always
    environment:
      - HOSTNAME=server_2
    volumes:
      - ./app:/app  # Monta o código da aplicação para hot-reload
      - /app/node_modules  # Evita sobrescrever o node_modules no contêiner
    networks:
      - loadbalancing

networks:
  loadbalancing:
    driver: bridge`}
            </code>
          </pre>
        </section>

        {/* Conclusão */}
        <section>
          <h2>Conclusão</h2>
          <p>
            Este guia mostrou como configurar um servidor Fastify com balanceamento de carga usando
            Docker e Nginx. Agora você pode escalar sua aplicação distribuindo as requisições entre
            múltiplos servidores.
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
};

export default Post2;