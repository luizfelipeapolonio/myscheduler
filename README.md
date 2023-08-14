# myScheduler

O myScheduler é uma aplicação de agenda pensada para desktop, onde podemos gerir os compromissos que surgem na nossa rotina. No back-end deste projeto foram utilizadas tecnologias como NodeJs, ExpressJs, PostgreSQL, Docker, Prisma ORM, Zod. O front-end foi contruído utilizando ReactJs.
<br /><br />

<p align="center">
    <a href="#demonstracao">Demonstração da aplicação</a> •
    <a href="#backend">Back-end</a> •
    <a href="#frontend">Front-end</a> •
    <a href="#pre-requisites">Pré-requisitos</a> •
    <a href="#run">Como rodar a aplicação</a> •
    <a href="#license">Lincença</a> •
    <a href="#author">Autor</a> •
</p>

<br />

<h1 id="demonstracao">Demonstração</h1>

- Criando conta e logando no sistema
<img src="./assets/myScheduler_Register_e_Login.gif" alt="Gif demonstrando criação de conta e login no sistema" />

<br />

- Editando dados do usuário
<img src="./assets/myScheduler_Editar_Usuário.gif" alt="Gif demonstrando a edição de algumas informações do usuário" />

<br />

- Criando compromissos
<img src="./assets/myScheduler_Criação_de_Compromisso.gif" alt="Gif demonstrando a criação dos compromissos" />

<br />

- Editando compromissos
<img src="./assets/myScheduler_Edição_de_Compromisso.gif" alt="Gif demonstrando edição dos compromissos" />

<br />

- Deletando compromissos
<img src="./assets/myScheduler_Deletar_Compromisso.gif" alt="Gif demonstrando a deleção dos compromissos" />

<br />

- Deletando conta do usuário e todos os compromissos
<img src="./assets/myScheduler_Deletar_Conta.gif" alt="Gif demonstrando a exclusão da conta de usuário junto com todos os compromissos" />

<br />

<h1 id="backend">Back-end</h1>
Esta aplicação é uma API desenvolvida em NodeJs em conjunto com o framework ExpressJs, o banco de dados PostgreSQL rodando em um container Docker, e o Prisma ORM. Para o sistema de autenticação de usuário, foi utilizado a biblioteca JSON Web Token (JWT), e bcryptjs para criptografia dos dados. As bibliotecas Morgan e Winston foram utilizadas para criar os logs da aplicação.
<br /><br />

## 💻 Tecnologias utilizadas
As seguintes ferramentas forma utilizadas na construção do projeto:
- [Typescript](https://www.typescriptlang.org/)
- [Node Js](https://nodejs.org/en)
- [Express Js](https://expressjs.com/pt-br/)
- [PostgreSQL](https://www.postgresql.org/)
- [Docker](https://www.docker.com/)
- [Prisma ORM](https://www.prisma.io/)
- [Zod](https://github.com/colinhacks/zod)
- [JSON Web Token (JWT)](https://github.com/auth0/node-jsonwebtoken)
- [bcryptjs](https://github.com/dcodeIO/bcrypt.js)
- [Morgan](https://github.com/expressjs/morgan)
- [Winston](https://github.com/winstonjs/winston)
- [dotenv](https://github.com/motdotla/dotenv)
- [cors](https://github.com/expressjs/cors)

## 🚀 Funções/Recursos
Principais funções e recursos da aplicação:
- **Auntenticação:** autenticação de usuário com [JSON Web Token (JWT)](https://github.com/auth0/node-jsonwebtoken).
- **Validação de dados:** validação de dados fortemente tipada com Typescript em conjunto com o [Zod](https://github.com/colinhacks/zod).
- **Armazenamento:** armazenamento de dados no banco de dados relacional [PostgreSQL](https://www.postgresql.org/) rodando em container [Docker](https://www.docker.com/), que adiciona uma maior portabilidade na implementação da aplicação.
- **Logs do sistema:** sistema de registro de logs com o [Morgan](https://github.com/expressjs/morgan) e [Winston](https://github.com/winstonjs/winston), para monitorar de maneira mais clara o funcionamento da aplicação.

<h1 id="frontend">Front-end</h1>
Esta aplicação é a interface do myScheduler construída em ReactJs com Typescript.
<br /><br />

## 💻 Tecnologias utilizadas
As seguintes ferramentas foram utilizadas na construção do projeto:
- [Typescript](https://www.typescriptlang.org/) | [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML) | [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
- [ReactJS](https://react.dev/)
- [React Router](https://reactrouter.com/en/main)
- [Vite](https://vitejs.dev/)
- [React Icons](https://react-icons.github.io/react-icons/)

## 🚀 Funções/Recursos
Principais funções e recursos da aplicação:
- **Data nativa:** calendários gerados de maneira nativa utilizando o objeto global [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) do Javascript, em conjunto com um hook personalizado para lidar com todas as operações envolvendo data.
- **Hooks Personalizados:** fluxo de funcionamento da aplicação baseado em hooks personalizados, dividindo e centralizando as responsabilidades.
- **Context API:** utilização da [Context API](https://react.dev/reference/react/createContext) do React para compartilhar propriedades de maneira mais escalonável entre os componentes.
<br /><br />

<h1 id="pre-requisites">🛠 Pré-requisitos</h1>

- Ter instalado o [Git](https://git-scm.com/),  [NodeJs](https://nodejs.org/en/) e o [Docker](https://www.docker.com/).

<h1 id="run"> ⚙ Como rodar a aplicação </h1>

Com o auxílio de um terminal, precisamos rodar alguns comandos para executar o projeto:
- Primeiro, clone este repositório:
    ```bash
    $ git clone https://github.com/luizfelipeapolonio/myscheduler
    ```
- Acesse a pasta da aplicação:
    ```bash
    $ cd myscheduler
    ```
- Crie e inicialize o container Docker do banco de dados da aplicação:

    > ⚠ O Docker já deve estar executando antes de rodar este comando
    ```bash
    $ docker compose up -d
    ```
- Back-end
    - Acesse a pasta `backend`:
        ```bash
        $ cd backend
        ```
    - Instale todas as dependências do projeto:
        ```bash
        $ npm install
        ```
    - Na raíz da pasta `backend` crie um arquivo `.env` com as seguintes configurações:
        ```bash
        DATABASE_URL="postgresql://postgres:postgres@localhost:5432/myschedulerdb?schema=public"
        PORT=5000
        ENV=development
        JWT_SECRET= # defina um secret de sua preferência
        ```
    - Rode a migration do Prisma para moldar o banco de dados da aplicação:
        ```bash
        $ npx prisma migrate dev --name init
        ```
    - Agora, basta iniciar a aplicação:
        ```bash
        $ npm run dev
        ```
        > O back-end irá iniciar na porta 5000
- Front-end
    - Agora, volte para a pasta raíz da aplicação `/myscheduler` e acesse a pasta `frontend`:
        ```bash
        $ cd frontend
        ```
    - Instale todas as dependências do projeto:
        ```bash
        $ npm install
        ```
    - Agora, basta iniciar a aplicação:
        ```bash
        $ npm run dev
        ```
    - Após iniciar a aplicação, basta acessar `localhost:5173` no navegador para acessar a aplicação.

<h1 id="license">📝 Licença</h1>

Este repositório está licenciado pela **MIT LICENSE**. Para mais informações detalhadas, leia o arquivo [LICENSE](./LICENSE) contido neste repositório.

<h1 id="author">Autor</h1>

Linkedin: [acesse meu perfil](https://www.linkedin.com/in/luiz-felipe-salgado-31a969273/).

Feito com 💜 por luizfelipeapolonio
    