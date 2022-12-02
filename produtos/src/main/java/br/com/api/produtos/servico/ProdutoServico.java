package br.com.api.produtos.servico;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import br.com.api.produtos.modelo.ProdutoModelo;
import br.com.api.produtos.modelo.RespostaModelo;
import br.com.api.produtos.repositorio.ProdutoRepositorio;

@Service
public class ProdutoServico {
    @Autowired
    private RespostaModelo resposta;

    @Autowired
    private ProdutoRepositorio prodRepo;

    public Iterable<ProdutoModelo> listarProdutos() {
        return prodRepo.findAll();
    }

    public ResponseEntity<?> cadastrarAlterarProduto(ProdutoModelo novoProduto, String operacao) {
        if (novoProduto.getNome().equals("")) {
            resposta.setMensagem("O nome do produto é obrigatório!");
            return new ResponseEntity<RespostaModelo>(resposta, HttpStatus.BAD_REQUEST);
        } else if (novoProduto.getMarca().equals("")) {
            resposta.setMensagem("A marca do produto é obrigatória!");
            return new ResponseEntity<RespostaModelo>(resposta, HttpStatus.BAD_REQUEST);
        } else {
            if (operacao.equals("cadastrar")) {
                return new ResponseEntity<ProdutoModelo>(prodRepo.save(novoProduto), HttpStatus.CREATED);
            } else {
                return new ResponseEntity<ProdutoModelo>(prodRepo.save(novoProduto), HttpStatus.OK);
            }
        }
    }

    public ResponseEntity<RespostaModelo> excluirProduto(long codigoProduto) {
        prodRepo.deleteById(codigoProduto);
        resposta.setMensagem("O produto foi excluído com sucesso!");
        
        return new ResponseEntity<RespostaModelo>(resposta,HttpStatus.OK);
    }
}
