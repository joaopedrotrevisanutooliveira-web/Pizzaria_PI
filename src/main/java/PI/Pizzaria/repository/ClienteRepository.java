package PI.Pizzaria.repository;


import org.springframework.data.mongodb.repository.MongoRepository;
import PI.Pizzaria.model.Cliente;

import java.util.List;

public interface ClienteRepository extends MongoRepository<Cliente, String> {

    List<Cliente> findByNomeContainingIgnoreCase(String nome);

    List<Cliente> findByTelefoneContaining(String telefone);

    List<Cliente> findByNomeContainingIgnoreCaseOrTelefoneContaining(String nome, String telefone);

}
