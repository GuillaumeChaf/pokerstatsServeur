import {Player, Card} from "./Calculation";

export default class FormatAndMath{

    //format the result of the calculation
    static formatResult(playersCalc : Player[], splitScore : number, nbLoop : number) : Object{
        const players =  playersCalc.map((player) => {return {id : player.id, score : FormatAndMath.formatScorePerc(player.score,nbLoop)}});
        return {players : players,
            splitScore : FormatAndMath.formatScorePerc(splitScore,nbLoop)}
    }

    //format a statistic in percentage with the nbDecimals after coma
    static formatScorePerc(score : number, nbLoop : number) : number{
        const nbDecimals : number = 2;
        const round : number = 100 * Math.pow(10,nbDecimals);
        return Math.round(((score) * round/ nbLoop)) * 100 / round;
    }

    //number of loops of calculation made to calcul one stats
    static nbLoopCalcul(cards : Card[], nbLoop : number) : number{
        const totCard = cards.length;
        return FormatAndMath.fact(totCard, totCard - nbLoop)/FormatAndMath.fact(nbLoop);
    }

    //return the factorielle of a number (fact 5 = 5*4*3*2*1)
    //tot : the number you want the fact
    //lim : the limit of the fact (exemple : (tot = 6, lim = 4) return 6*5*4)
    static fact(tot : number, lim : number = 0) : number{
        let result = 1;
        while(tot > lim){
            result *= tot;
            tot--;
        }
        return result;
    }
}