
package PI.Pizzaria.service;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import PI.Pizzaria.model.Cliente;
import PI.Pizzaria.model.Endereco;
import PI.Pizzaria.repository.ClienteRepository;

@Service
public class ClienteService {

    private final ClienteRepository clienteRepository;

    public ClienteService(ClienteRepository clienteRepository) {
        this.clienteRepository = clienteRepository;
    }

    public Cliente cadastrar(Cliente cliente) {
        if (cliente.getNome() == null
                || cliente.getNome().isBlank()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "O nome do cliente é obrigatório.");
        }

        if (cliente.getTelefone() == null
                || cliente.getTelefone().isBlank()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "O telefone do cliente é obrigatório.");
        }
        Endereco endereco = cliente.getEndereco();

        if (endereco == null
                || endereco.getRua() == null || endereco.getRua().isBlank()
                || endereco.getNumero() == null || endereco.getNumero().isBlank()
                || endereco.getBairro() == null || endereco.getBairro().isBlank()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "O endereço (rua, número e bairro) é obrigatório.");
        }

        cliente.setId(null);

        return clienteRepository.save(cliente);
    }

    public List<Cliente> buscar(String termo) {
        if (termo == null || termo.isBlank()) {
            return clienteRepository.findAll();
        }

        String pesquisa = termo.trim();

        return clienteRepository
                .findByNomeContainingIgnoreCaseOrTelefoneContaining(
                        pesquisa,
                        pesquisa);
    }
}
