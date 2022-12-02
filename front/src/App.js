import { useEffect, useState } from 'react';

import './App.css';

import Formulario from './Formulario';
import Tabela from './Tabela';

function App() {
  const produto = { codigo: 0, nome: '', marca: '' };
  const [btnCadastrar, setBtnCadastrar] = useState(true);
  const [produtos, setProdutos] = useState([]);
  const [objProduto, setObjProduto] = useState(produto);

  useEffect(() => {
    fetch('http://localhost:8080/listar')
      .then(retorno => retorno.json())
      .then(retorno_convertido => setProdutos(retorno_convertido));
  }, []);

  const aoDigitar = (e) => {
    setObjProduto({
      ...objProduto,
      [e.target.name]: e.target.value
    });
  };

  const cadastrar = () => {
    fetch('http://localhost:8080/cadastrar', {
      method: 'post',
      body: JSON.stringify(objProduto),
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json',
      },
    })
      .then(retorno => retorno.json())
      .then(retorno_convertido => {
        if (retorno_convertido.mensagem !== undefined) {
          alert(retorno_convertido.mensagem);
        } else {
          setProdutos([...produtos, retorno_convertido]);
          alert('Produto cadastrado com sucesso!');
          limparFormulario();
        }
      })
  };

  const alterar = () => {
    fetch('http://localhost:8080/alterar', {
      method: 'put',
      body: JSON.stringify(objProduto),
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json',
      },
    })
      .then(retorno => retorno.json())
      .then(retorno_convertido => {
        if (retorno_convertido.mensagem !== undefined) {
          alert(retorno_convertido.mensagem);
        } else {
          alert('Produto alterado com sucesso!');

          let listaTemporaria = [...produtos];
          let indice = listaTemporaria.findIndex((p) => {
            return p.codigo === objProduto.codigo;
          });
          listaTemporaria[indice] = objProduto;
          setProdutos(listaTemporaria);
          limparFormulario();
        }
      })
  };

  const excluir = () => {
    fetch('http://localhost:8080/excluir/' + objProduto.codigo, {
      method: 'delete',
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json',
      },
    })
      .then(retorno => retorno.json())
      .then(retorno_convertido => {
        alert(retorno_convertido.mensagem);

        let listaTemporaria = [...produtos];
        let indice = listaTemporaria.findIndex((p) => {
          return p.codigo === objProduto.codigo;
        });

        listaTemporaria.splice(indice, 1);
        setProdutos(listaTemporaria);

        limparFormulario();
      })
  };

  const limparFormulario = () => {
    setObjProduto(produto);
    setBtnCadastrar(true);
  };

  const selecionarProduto = (posicao) => {
    setObjProduto(produtos[posicao]);
    setBtnCadastrar(false);
  };

  return (
    <div>
      <Formulario botao={btnCadastrar}
        eventoTeclado={aoDigitar}
        cadastrar={cadastrar}
        obj={objProduto}
        cancelar={limparFormulario}
        excluir={excluir}
        alterar={alterar} />

      <Tabela listaProdutos={produtos}
        selecionar={selecionarProduto} />
    </div>
  );
}

export default App;
