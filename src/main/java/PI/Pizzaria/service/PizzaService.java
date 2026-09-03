package PI.Pizzaria.service;

import java.util.List;

import org.springframework.stereotype.Service;

import PI.Pizzaria.model.Pizza;
import PI.Pizzaria.repository.PizzaRepository;

@Service
public class PizzaService {

    private final PizzaRepository pizzaRepository;

    public PizzaService(PizzaRepository pizzaRepository) {
        this.pizzaRepository = pizzaRepository;
    }

    public List<Pizza> listarPizzas(){
        return pizzaRepository.findAll();
    }

}
