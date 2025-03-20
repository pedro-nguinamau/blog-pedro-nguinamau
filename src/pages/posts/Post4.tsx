import React from 'react';
import './post.css'; // Reutilizando os estilos do post anterior

const Post4: React.FC = () => {
  return (
    <div className="blog-post">
      {/* Cabeçalho */}
      <header className="blog-header">
        <h1>Como Criar uma API REST com TypeScript e Fastify</h1>
      </header>

      {/* Conteúdo Principal */}
      <main className="blog-main">
        {/* Seção de Estrutura do Projeto */}
        <section>
          <h2>Estrutura do Projeto</h2>
          <p>Antes de começar, organize o projeto com a seguinte estrutura:</p>
          <pre>
            <code>
              {`project-root
├── src
│   ├── server.ts
│   └── user.ts
└── package.json`}
            </code>
          </pre>
        </section>

        {/* Passo 1: Configuração do Projeto */}
        <section>
          <h2>Passo 1: Configuração do Projeto</h2>
          <h3>1.1 Inicializar o Projeto</h3>
          <p>Comece inicializando o projeto com <code>npm</code>:</p>
          <pre>
            <code>npm init -y</code>
          </pre>
          <h3>1.2 Instalar Dependências</h3>
          <p>Instale as dependências principais:</p>
          <pre>
            <code>npm install fastify axios</code>
          </pre>
          <p>Instale as dependências de desenvolvimento:</p>
          <pre>
            <code>npm install -D typescript @types/node tsx</code>
          </pre>
          <p>Configurar o tsconfig.json:</p>
          <pre>
            <code>npx tsc --init</code>
          </pre>
          <pre>
            <code>
              {`{
    "compilerOptions": {
        "target": "ES6",
        "module": "NodeNext",
        "strict": true,
        "esModuleInterop": true,
    },
    "include": ["src/**/*"],
}`}
            </code>
          </pre>
        </section>

        {/* Passo 2: Criar o Servidor com Fastify */}
        <section>
          <h2>Passo 2: Criar o Servidor com Fastify</h2>
          <p>No arquivo <code>server.ts</code>, configure o servidor e registre as rotas:</p>
          <pre>
            <code>
              {`import fastify from "fastify";
import { userRoutes } from "./user";

const server = fastify();

server.get('/', (request, reply) => {
    reply.send('Consumindo-Api-com-TYpescript-e-Fastify');
});

server.register(userRoutes);

server.listen({ port: 3333 }, async (err, address) => {
    if (err) {
        console.log(err);
    }
    console.log(\`Server listening at \${address}\`);
});`}
            </code>
          </pre>
        </section>

        {/* Passo 3: Criar Rotas para Consumir a API JSONPlaceholder */}
        <section>
          <h2>Passo 3: Criar Rotas para Consumir a API JSONPlaceholder</h2>
          <p>No arquivo <code>user.ts</code>, implemente as rotas para interagir com os dados:</p>
          <pre>
            <code>
              {`import { FastifyInstance } from "fastify";
import axios from "axios";

export async function userRoutes(app: FastifyInstance) {
    const API_URL = 'https://jsonplaceholder.typicode.com/users';

    app.get('/users', async (request, reply) => {
        try {
            const { data } = await axios.get(API_URL);
            reply.send(data);
        } catch (error) {
            reply.status(500).send({ error: 'Erro ao buscar os usuários.' });
        }
    });
}`}
            </code>
          </pre>
        </section>

        {/* Conclusão */}
        <section>
          <h2>Conclusão</h2>
          <p>
            Este guia mostrou como criar uma API REST eficiente com Fastify e TypeScript. Explore mais
            recursos para melhorar seu projeto!
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

export default Post4;