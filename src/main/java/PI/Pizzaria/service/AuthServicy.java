package PI.Pizzaria.service;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import PI.Pizzaria.repository.ColaboradorRepository;
import PI.Pizzaria.model.Colaborador;
import java.util.Optional;

@Service
public class AuthServicy{
    private final ColaboradorRepository colaboradorRepository;
    public AuthServicy(ColaboradorRepository colaboradorRepository){
        this.colaboradorRepository = colaboradorRepository;
    }
    public Optional<Colaborador> autenticar(String matricula, String senha){
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        return colaboradorRepository.findByMatricula(matricula).filter(colaborador->encoder.matches(senha, colaborador.getSenha()));
    }
    public boolean isAdmnistrador(Colaborador colaborador){
        return colaborador.getPerfil() == Colaborador.Perfil.admnistrador; 
    }
}
