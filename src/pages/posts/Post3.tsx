import React from 'react';
import './post.css'; // Reutilizando os estilos do post anterior

const Post3: React.FC = () => {
  return (
    <div className="blog-post">
      {/* Cabeçalho */}
      <header className="blog-header">
        <h1>Validação de Dados com Zod e TypeScript em uma API Fastify</h1>
      </header>

      {/* Conteúdo Principal */}
      <main className="blog-main">
        {/* Seção de Introdução */}
        <section>
          <h2>Introdução</h2>
          <p>
            Este guia mostra como integrar o <strong>Zod</strong> com <strong>TypeScript</strong> para
            validar dados de entrada em uma API Fastify. O Zod é uma biblioteca de validação de
            esquemas que facilita a garantia de que os dados recebidos estão corretos antes de serem
            processados.
          </p>
        </section>

        {/* Passo 1: Configurar o Projeto */}
        <section>
          <h2>Passo 1: Configurar o Projeto</h2>
          <p>Primeiro, instale as dependências necessárias:</p>
          <pre>
            <code>npm install fastify zod @prisma/client</code>
          </pre>
          <p>Se estiver usando Prisma, instale também o Prisma:</p>
          <pre>
            <code>
              {`npm install prisma --save-dev
npx prisma init`}
            </code>
          </pre>
        </section>

        {/* Passo 2: Definir o Esquema de Validação com Zod */}
        <section>
          <h2>Passo 2: Definir o Esquema de Validação com Zod</h2>
          <p>No arquivo <code>user.ts</code>, crie um esquema de validação para os dados do usuário:</p>
          <pre>
            <code>
              {`import z from "zod";

// Esquema de validação para o usuário
const userSchema = z.object({
    nome: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
    email: z.string().email("O e-mail deve ser válido"),
    role: z.enum(["ADMIN", "USER"]).default("USER"),
    activate: z.boolean().default(true)
});`}
            </code>
          </pre>
          <p>Esse esquema define que:</p>
          <ul>
            <li>
              <code>nome</code> deve ser uma string com pelo menos 3 caracteres.
            </li>
            <li>
              <code>email</code> deve ser um e-mail válido.
            </li>
            <li>
              <code>role</code> deve ser "ADMIN" ou "USER" (com "USER" como valor padrão).
            </li>
            <li>
              <code>activate</code> deve ser um booleano (com <code>true</code> como valor padrão).
            </li>
          </ul>
        </section>

        {/* Passo 3: Implementar a Validação na Rota */}
        <section>
          <h2>Passo 3: Implementar a Validação na Rota</h2>
          <p>
            No mesmo arquivo <code>user.ts</code>, use o esquema do Zod para validar os dados
            recebidos na rota de criação de usuários:
          </p>
          <pre>
            <code>
              {`import { FastifyInstance } from "fastify";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function Users(fastify: FastifyInstance) {
    // Rota para criar um usuário
    fastify.post('/create', async (request, reply) => {
        try {
            // Valida os dados recebidos
            const validatedData = userSchema.parse(request.body);

            // Cria o usuário no banco de dados
            const userCreated = await prisma.user.create({
                data: validatedData
            });

            // Retorna o usuário criado
            reply.send({ userCreated });
        } catch (error) {
            // Captura erros de validação
            if (error instanceof z.ZodError) {
                reply.status(400).send({ error: "Dados inválidos", details: error.errors });
            } else {
                reply.status(500).send({ error: "Erro interno no servidor" });
            }
        }
    });
}`}
            </code>
          </pre>
          <p>
            Aqui, o <code>userSchema.parse(request.body)</code> valida os dados recebidos. Se os dados
            forem inválidos, o Zod lança um erro que é capturado e retornado ao cliente.
          </p>
        </section>

        {/* Passo 4: Testar a API */}
        <section>
          <h2>Passo 4: Testar a API</h2>
          <p>
            Para testar a API, você pode usar o <strong>Postman</strong> ou <strong>cURL</strong>.
            Aqui está um exemplo de requisição válida:
          </p>
          <pre>
            <code>
              {`curl -X POST http://localhost:8080/user/create \\
-H "Content-Type: application/json" \\
-d '{
    "nome": "João Silva",
    "email": "joao@example.com"
}'`}
            </code>
          </pre>
          <p>Se os dados forem inválidos, a API retornará um erro detalhado:</p>
          <pre>
            <code>
              {`{
    "error": "Dados inválidos",
    "details": [
        {
            "code": "invalid_string",
            "message": "O e-mail deve ser válido",
            "path": ["email"]
        }
    ]
}`}
            </code>
          </pre>
        </section>

        {/* Conclusão */}
        <section>
          <h2>Conclusão</h2>
          <p>
            Este guia mostrou como integrar o <strong>Zod</strong> com <strong>TypeScript</strong> para
            validar dados de entrada em uma API Fastify. O Zod facilita a garantia de que os dados
            recebidos estão corretos, melhorando a robustez e a segurança da sua aplicação.
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

export default Post3;