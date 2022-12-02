function Formulario({
  botao,
  eventoTeclado,
  cadastrar,
  obj,
  cancelar,
  excluir,
  alterar
}) {
  return (
    <form>
      <input
        type="text"
        value={obj.nome}
        onChange={eventoTeclado}
        name="nome"
        className="form-control"
        placeholder="Nome"
      />
      <input
        type="text"
        value={obj.marca}
        onChange={eventoTeclado}
        name="marca"
        className="form-control"
        placeholder="Marca"
      />

      {botao ? (
        <input type="button"
          className="btn btn-primary"
          value="Cadastrar"
          onClick={cadastrar} />
      ) : (
        <div>
          <input type="button"
            className="btn btn-warning"
            value="Alterar"
            onClick={alterar} />
          <input type="button"
            className="btn btn-danger"
            value="Excluir"
            onClick={excluir} />
          <input type="button"
            className="btn btn-secondary"
            onClick={cancelar}
            value="Cancelar" />
        </div>
      )}
    </form>
  );
}

export default Formulario;
