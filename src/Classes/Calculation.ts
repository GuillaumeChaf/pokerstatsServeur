import ArrayGestion from "./ArrayGestion";
import Flush from "./Combinations/Flush";
import Straight from "./Combinations/Straight";
import FourOfAKind from "./Combinations/FourOfAKind";
import FullHouse from "./Combinations/FullHouse";
import ThreeOfAKind from "./Combinations/ThreeOfAKind";
import Pair from "./Combinations/Pair";
import StraightFlush from "./Combinations/StraightFlush";
import TwoPair from "./Combinations/TwoPair";
import HighCard from "./Combinations/HighCard";
import FormatAndMath from "./FormatAndMath";

type Input = {
    precision : number;
    freeCards : Card[];
    table : Table;
    players : any[];
}
type Table = {
    cardsTable : Card[];
    numberActivateCard : number;
}
export type Card = {
    value : string;
    symbol : string;
}

export type Player = {
    id : number,
    cards : Card[];
    score : number;
}
export default class Calculation{

    nbLoop : number = 0;
    nbRecursion : number = 4;
    freeCards : Card[];
    table : Table;
    players : Player[];
    splitScore : number;

    constructor(obj : Input ){
        this.freeCards = obj.freeCards;
        this.table = obj.table;
        this.players = [];
        obj.players.forEach(element => {
            this.players.push({id : element.id, cards : [element.card1, element.card2], score : 0})
        });
        this.splitScore = 0;
        this.nbRecursion = obj.precision;
    }

    //test calculation of cards here
    static test(){
        const arrayTest : Card[]= [
        {value : "2", symbol : "heart"},
        {value : "8", symbol : "diamond"},
        /*{value : "2", symbol : "diamond"},
        {value : "7", symbol : "heart"},
        {value : "5", symbol : "spade"},
        {value : "Q", symbol : "club"},
        {value : "A", symbol : "spade"},*/
        {value : "10", symbol : "diamond"},
        {value : "A", symbol : "club"},
        {value : "9", symbol : "spade"},
        {value : "5", symbol : "spade"},
        {value : "Q", symbol : "club"}
    ];
        //console.log(ArrayGestion.splitArrayForStraight(arrayTest));
        //console.log(ArrayGestion.splitArrayValue(arrayTest));
        //console.log(ArrayGestion.splitArraySymbol(arrayTest));
        //console.log(this.score(arrayTest));
    }

    //process of calculation
    fullCalculation(){
        //format cards table
        let cards = this.table.cardsTable
        cards.splice(this.table.numberActivateCard)
        cards = cards.filter(card => card.value !== "0")

        //format nbLoop to make (max : this.nbRecursion)
        const nbLoop = this.table.numberActivateCard - cards.length > this.nbRecursion?  this.nbRecursion : this.table.numberActivateCard - cards.length;
        this.nbLoop = FormatAndMath.nbLoopCalcul(this.freeCards, nbLoop);
        //calcul
        this.loopRecursion(this.freeCards, cards, nbLoop);
    }

    //recursivity of each combination we can find in the table 
    loopRecursion(freeCards : Card[], pickedCards : Card[],loop : number){
        if(loop == 0){
            this.scoreEach(pickedCards);
            return;
        } else {
            while(freeCards.length > 0){ 
                let pickedCardsCopy = pickedCards.slice();    
                pickedCardsCopy.push(freeCards[0]);
                freeCards = ArrayGestion.removeCard(freeCards, freeCards[0])
                if(freeCards.length < loop-1){return;}
                this.loopRecursion(freeCards, pickedCardsCopy, loop-1)
            }
        }
    }
    
    //for one combination in table, calcul which player one, or splitpot if they are more than one
    scoreEach(cards : Card[]){
        let bestScore = 0;
        let bestPlayersIndex : number[] = [];
        this.players.forEach((player, index) => {
            //calcul
            let cardArray = player.cards.concat(cards);
            let score = this.score(cardArray);
            //
            //score checking one by one
            if(score > bestScore){
                bestScore = score;
                bestPlayersIndex = [index];
            } else if(score === bestScore){
                bestPlayersIndex.push(index)
            }
        });
        //points attribution
        (bestPlayersIndex.length > 1)? this.splitScore ++ : this.players[bestPlayersIndex[0]].score ++;
    }

    //score a combination of cards from 4 to 7 cards
    score(cards : Card[]) : number{
       
        const sordOrdValue = ArrayGestion.splitArrayValue(cards);
        const sordOrdSymbol = ArrayGestion.splitArraySymbol(cards);
        const sordOrdStraight = ArrayGestion.splitArrayForStraight(cards);

        const flush = Flush.checkCombination(sordOrdSymbol)//check the player have 5 cards of the sme symbol
        const straight = Straight.checkCombination(sordOrdStraight);//check the player have 5 cards straighted
        const three = ThreeOfAKind.checkCombination(sordOrdValue);//check the player have 3 or more cards of the same value
        const two = Pair.checkCombination(sordOrdValue);//check the player have 2 cards (only two) of the same value

        //check quintFlush
        if(flush && straight){
            if(StraightFlush.checkCombination(sordOrdSymbol)){
                return StraightFlush.calcul(sordOrdSymbol)
            }
        }
        //check full and square
        if(three){
            if(FourOfAKind.checkCombination(sordOrdValue)) return FourOfAKind.calcul(sordOrdValue);
            if(FullHouse.checkCombination(sordOrdValue)) return FullHouse.calcul(sordOrdValue); 
        }
        //check flush
        if(flush) return Flush.calcul(sordOrdSymbol);
        //check straight
        if(straight) return Straight.calcul(sordOrdStraight); 
        //check threeOfAKind
        if(three) return ThreeOfAKind.calcul(sordOrdValue);
        //check2pair
        if(two){
            if(TwoPair.checkCombination(sordOrdValue)) return TwoPair.calcul(sordOrdValue);
            return Pair.calcul(sordOrdValue);
        }
        return HighCard.calcul(sordOrdValue);
    }

    //return the final score formatted
    getFinalScore () : Object {
        return FormatAndMath.formatResult(this.players, this.splitScore, this.nbLoop);
    }
}