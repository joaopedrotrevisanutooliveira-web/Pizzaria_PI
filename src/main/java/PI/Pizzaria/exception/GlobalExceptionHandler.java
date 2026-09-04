// package PI.Pizzaria.exception;

// import org.springframework.http.HttpStatus;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.ExceptionHandler;
// import org.springframework.web.bind.annotation.RestControllerAdvice;

// @RestControllerAdvice   
// public class GlobalExceptionHandler {

//     @ExceptionHandler(PizzaNotFoundException.class)
//     public ResponseEntity <String> tratarPizzaNãoEncontrada(
//         PizzaNotFoundException exception){

//             return ResponseEntity
//             .status(HttpStatus.NOT_FOUND)
//             .body(exception.getMessage());
//         }
// }
