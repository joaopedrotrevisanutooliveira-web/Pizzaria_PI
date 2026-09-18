package PI.Pizzaria.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "colaboradores")
public class Colaborador {
    @Id
    private String id;
    private String nome;
    private String matricula;
    private String senha;
    private Perfil perfil;

    public enum Perfil{
        admnistrador,
        funcionario
    }

    public String getMatricula(){
        return matricula;
    }

    public String getNome(){
        return nome;
    }

    public String getSenha(){
        return senha;
    }

    public Perfil getPerfil(){
        return perfil;
    }
}
