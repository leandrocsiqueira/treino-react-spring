package br.com.api.produtos.controle;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import br.com.api.produtos.modelo.ProdutoModelo;
import br.com.api.produtos.modelo.RespostaModelo;
import br.com.api.produtos.servico.ProdutoServico;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@CrossOrigin(origins = "*")
@RestController
public class ProdutoControle {
    @Autowired
    private ProdutoServico prodServ;

    @GetMapping("/")
    public String rota() {
        return "API de produtos funcionando";
    }

    @GetMapping(value="/listar")
    public Iterable<ProdutoModelo> listar() {
        return prodServ.listarProdutos();
    }
    
    @PostMapping("/cadastrar")
    public ResponseEntity<?> cadastrar(@RequestBody ProdutoModelo produto) {
        return prodServ.cadastrarAlterarProduto(produto, "cadastrar");
    }

    @PutMapping("/alterar")
    public ResponseEntity<?> alterar(@RequestBody ProdutoModelo produto) {
        return prodServ.cadastrarAlterarProduto(produto, "alterar");
    }

    @DeleteMapping("/excluir/{codigo}")
    public ResponseEntity<RespostaModelo> excluir(@PathVariable long codigo) {
        return prodServ.excluirProduto(codigo);
    }
    
}
