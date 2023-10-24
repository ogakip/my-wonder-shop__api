import app from "./app";
import AppDataSource from "./data-source";

const init = () => {
  let PORT = 8080;

  AppDataSource.initialize()
  .then(() => {
    console.log("Conexão com o banco de dados estabelecida com sucesso");
  })
  .catch((err) => {
    console.error("Erro ao tentar conectar com o banco de dados", err);
  });

  app.listen(PORT, () => {
    console.log(`Application running on port: ${PORT}`);
  });
};

init();