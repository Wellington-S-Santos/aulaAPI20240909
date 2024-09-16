const express = require('express');
const morgan = require('morgan');

const app = express();
const port = 3000;

// Middleware para parsing de parâmetros de consulta
app.use(express.json());

// Configuração personalizada do morgan para incluir o IP do cliente
morgan.format('custom', ':remote-addr :method :url :status :response-time ms');
app.use(morgan('custom')); // Usa o formato personalizado para o log

// Rota para a documentação Swagger



app.get('/formas', (req, res, next) => {
    try {
        const { lado1, lado2,lado3,lado4} = req.query;

        // Verifica se todos os parâmetros estão presentes
        if (lado1 === undefined || lado2 === undefined || lado3 === undefined || lado4 === undefined) {
            throw new Error('Parâmetros insuficientes!');
        }

        // Converte os parâmetros para números
        const ladon1 = parseFloat(lado1);
        const ladon2 = parseFloat(lado2);
        const ladon3 = parseFloat(lado3);
        const ladon4 = parseFloat(lado4);

        // Verifica se os parâmetros são números válidos
        if (isNaN(ladon1) || isNaN(ladon2) || isNaN(ladon3) || isNaN(ladon4)) {
            throw new Error('Parâmetros inválidos!');
        }

        let result;
        let area;
        let alerta;
        


        if (ladon1 === ladon2 && ladon2 === ladon3 && ladon3 === ladon4 ) {
            area=lado1 * lado2;
            result= `A forma é um quadrado !!                   A área do quadrado é de: ${area}`;
            alerta=("A forma é um quadrado !!");
        }else if ((ladon1 === ladon3 && ladon2 === ladon4 && ladon1 !== ladon2) ||
            (ladon1 == ladon4 && ladon2 == ladon3 && ladon1 !== ladon2)) {
            area = ladon1 * ladon2;
            result= `A forma é um retangulo !!                A área do retangulo é de: ${area}`;
            alerta=("A forma é um retangulo !!"); 
        }else if ((ladon1 == ladon2 && ladon4 == ladon3 && ladon1 !==ladon4)) {
            area =ladon1 * ladon4;
            result= `A forma é um retangulo !!                A área do retangulo é de: ${area}`;
            alerta=("A forma é um retangulo !!"); 
        }else if ((ladon1 == ladon2  && ladon1 == ladon3 && ladon1!= ladon4)|| 
           (ladon1 == ladon2 && ladon1== ladon4 && ladon1 != ladon3) ||
            (ladon1 == ladon4 && ladon1 == ladon3 && ladon1 != ladon2)) {
            result=("A forma não é um quadrado, nem um retangulo !!"); 
        }

        
        res.json({ alerta,result });
    } catch (error) {
        next(error); // Passa o erro para o middleware de tratamento
    }
});



// Middleware de tratamento de erros
app.use((err, req, res, next) => {
    console.error(err.stack); // Log do erro
    res.status(400).json({ error: err.message }); // Responde com a mensagem de erro
});

app.listen(port, () => {
    console.log(`API rodando em http://localhost:${port}`);
});