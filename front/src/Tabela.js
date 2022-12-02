function Tabela({ listaProdutos, selecionar }) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>#</th>
          <th>Nome</th>
          <th>Marca</th>
          <th>Selecionar</th>
        </tr>
      </thead>
      <tbody>
        {listaProdutos.map((objeto, posicao) => (
          <tr key={posicao}>
            <td>{posicao + 1}</td>
            <td>{objeto.nome}</td>
            <td>{objeto.marca}</td>
            <td>
              <button className="btn btn-success" onClick={() => { selecionar(posicao) }}>Selecionar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Tabela;
