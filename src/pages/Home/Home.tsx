import React from 'react';
import './HomePage.css'; // Estilos específicos para a homepage
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div className="homepage">
      {/* Seção de Apresentação */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Pedro Nguinamau</h1>
          <h2>Desenvolvedor FullStack</h2>
          <p>
            Bem-vindo ao meu blog! Aqui compartilho dicas sobre ferramentas de programação web,
            novas tecnologias e tutoriais para ajudar você a se tornar um desenvolvedor melhor.
          </p>
          <a
            href="https://github.com/pedro-nguinamau"
            target="_blank"
            rel="noopener noreferrer"
            className="github-link"
          >
           
            <img
              src="./g.svg"
              alt="GitHub"
            />
            Meu GitHub
          </a>
        </div>
      </section>

      {/* Seção de Destaques */}
      <section className="highlights-section">
        <h2>Artigos</h2>
        <div className="post-grid">
      
          <div className="post-card">
            <h3>API com Bun, Prisma e SQLite</h3>
            <p>
              Descubra como criar uma API rápida e eficiente usando Bun, Prisma e SQLite.
            </p>
            <Link to='/post1' className="read-more">
           
           Ler mais →
           </Link>    
          </div>
          <div className="post-card">
            <h3>Criação do LoadBalancerX</h3>
            <p>
              Demonstração de como escalar orizontalmente uma aplicação web com Nginx e Docker
            </p>
            <Link to='/post2' className="read-more">
           
              Ler mais →
              </Link>
          </div>
          <div className="post-card">
            <h3>Validação de Dados com Zod e TypeScript</h3>
            <p>
              Aprenda a validar dados de forma eficiente usando Zod e TypeScript em APIs modernas.
            </p>
            <Link to='/post3' className="read-more">
           
           Ler mais →
           </Link>
          </div>
          <div className="post-card">
            <h3>Como Consumir Api com Fastify</h3>
            <p>
              Aprenda a fazer o consumo de uma Api externa com Fastify.
            </p>
            <Link to='/post4' className="read-more">
           
           Ler mais →
           </Link>
          </div>

          <div className="post-card">
            <h3>Setup Nginx com Docker e Php</h3>
            <p>
              Aprenda como criar um servidor Nginx e configurar ele para php com Docker.
            </p>
            
             <Link to='/post5' className="read-more">
           
           Ler mais →
           </Link>
          </div>
        </div>
       

      
        
      </section>

      





      {/* Rodapé */}
      <footer className="footer">
        <p>
          &copy; 2025 Pedro Nguinamau. Todos os direitos reservados.
        </p>
      </footer>



    </div>
  );
};

export default HomePage;