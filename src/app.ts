import express, {Request, Response, Application} from "express";
import  bodyParser from "body-parser";
import Calculation from "./Classes/Calculation";
var cors = require('cors')

const app : Application = express();

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

//système de calcul pour éviter les erreur lorsqu'il y a moins de 4 cartes
app.post('/', (req : Request,res : Response) => {
    const calc = new Calculation(req.body);
    calc.fullCalculation()
    res.setHeader('Content-type', 'application/json');
    res.json(calc.getFinalScore());
    console.log("Done")
})

app.listen(5000, () => {console.log("Server running")}
)