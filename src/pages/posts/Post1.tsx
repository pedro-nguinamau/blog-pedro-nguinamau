import React from 'react';
import './post.css'; // Estilos específicos para o post

const Post1: React.FC = () => {
  return (
    <div className="blog-post">
      {/* Cabeçalho */}
      <header className="blog-header">
        <h1>API com Bun, Prisma e SQLite</h1>
      </header>

      {/* Conteúdo Principal */}
      <main className="blog-main">
        {/* Seção de Introdução */}
        <section>
          <h2>Introdução</h2>
          <p>
            Este guia mostra como criar uma API usando <strong>Bun</strong> como runtime,{' '}
            <strong>Prisma</strong> para gerenciar o banco de dados e <strong>SQLite</strong> como
            banco de dados local. A API permite listar usuários e inserir dados iniciais.
          </p>
        </section>

        {/* Passo 1: Configurar o Projeto */}
        <section>
          <h2>Passo 1: Configurar o Projeto</h2>
          <p>Primeiro, instale as dependências necessárias:</p>
          <pre>
            <code>
              {`bun init -y
bun add prisma @prisma/client`}
            </code>
          </pre>
          <p>Inicialize o Prisma:</p>
          <pre>
            <code>npx prisma init --datasource-provider sqlite</code>
          </pre>
        </section>

        {/* Passo 2: Definir o Esquema do Prisma */}
        <section>
          <h2>Passo 2: Definir o Esquema do Prisma</h2>
          <p>No arquivo <code>schema.prisma</code>, defina os modelos de dados:</p>
          <pre>
            <code>
              {`generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

model User {
  id        Int      @id @default(autoincrement())
  name      String
  username  String
  email     String   @unique
  phone     String
  website   String
  address   Address? // Relação 1:1 com Address
  company   Company? // Relação 1:1 com Company
}

model Address {
  id       Int    @id @default(autoincrement())
  street   String
  suite    String
  city     String
  zipcode  String
  geo      Geo?   // Relação 1:1 com Geo
  userId   Int    @unique
  user     User   @relation(fields: [userId], references: [id])
}

model Geo {
  id        Int     @id @default(autoincrement())
  lat       String
  lng       String
  addressId Int     @unique
  address   Address @relation(fields: [addressId], references: [id])
}

model Company {
  id          Int    @id @default(autoincrement())
  name        String
  catchPhrase String
  bs          String
  userId      Int    @unique
  user        User   @relation(fields: [userId], references: [id])
}`}
            </code>
          </pre>
        </section>

        {/* Passo 3: Criar o Servidor com Bun */}
        <section>
          <h2>Passo 3: Criar o Servidor com Bun</h2>
          <p>Crie um arquivo <code>index.ts</code> para configurar o servidor:</p>
          <pre>
            <code>
              {`import { serve } from "bun";
import Users from "./services/users";

const server = serve({
    routes: {
        "/api": {
            async GET() {
                const listUsers = await Users();
                return Response.json(listUsers);
            }
        }
    }
});

console.log(\`🚀 Server running at \${server.url}\`);`}
            </code>
          </pre>
        </section>

        {/* Passo 4: Inserir Dados Iniciais */}
        <section>
          <h2>Passo 4: Inserir Dados Iniciais</h2>
          <p>No arquivo <code>seed.ts</code>, insira os dados iniciais no banco de dados:</p>
          <pre>
            <code>
              {`import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const usersData = [
  // Cole o JSON fornecido aqui
  {
    id: 1,
    name: "Leanne Graham",
    username: "Bret",
    email: "Sincere@april.biz",
    address: {
      street: "Kulas Light",
      suite: "Apt. 556",
      city: "Gwenborough",
      zipcode: "92998-3874",
      geo: {
        lat: "-37.3159",
        lng: "81.1496",
      },
    },
    phone: "1-770-736-8031 x56442",
    website: "hildegard.org",
    company: {
      name: "Romaguera-Crona",
      catchPhrase: "Multi-layered client-server neural-net",
      bs: "harness real-time e-markets",
    },
  },
  // Adicione os outros objetos do JSON aqui
];

async function main() {
  for (const userData of usersData) {
    await prisma.user.create({
      data: {
        name: userData.name,
        username: userData.username,
        email: userData.email,
        phone: userData.phone,
        website: userData.website,
        address: {
          create: {
            street: userData.address.street,
            suite: userData.address.suite,
            city: userData.address.city,
            zipcode: userData.address.zipcode,
            geo: {
              create: {
                lat: userData.address.geo.lat,
                lng: userData.address.geo.lng,
              },
            },
          },
        },
        company: {
          create: {
            name: userData.company.name,
            catchPhrase: userData.company.catchPhrase,
            bs: userData.company.bs,
          },
        },
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.log('Dados iniciais inseridos com sucesso!');
  });`}
            </code>
          </pre>
        </section>

        {/* Passo 5: Executar o Projeto */}
        <section>
          <h2>Passo 5: Executar o Projeto</h2>
          <p>Execute o servidor e insira os dados iniciais:</p>
          <pre>
            <code>
              {`bun run index.ts
npx prisma migrate dev --name init
bun run seed.ts`}
            </code>
          </pre>
        </section>

        {/* Conclusão */}
        <section>
          <h2>Conclusão</h2>
          <p>
            Este guia mostrou como criar uma API usando Bun, Prisma e SQLite. Agora você pode
            expandir o projeto adicionando mais funcionalidades, como atualização e exclusão de
            usuários.
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

export default Post1;