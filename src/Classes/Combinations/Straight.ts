import {Card} from "../Calculation";

export default class Straight{

  static checkCombination(combinationCard : Card[][]){

    const cardValued : string[] = ["A", "K", "Q", "J", "10", "9", "8", "7", "6", "5", "4", "3", "2", "aa"];
    if(combinationCard[0][0].value == "A") combinationCard.push([{value : "aa", symbol : ""}]);//add ace to check straight 5-4-3-2-A

    let serie = 1;
    if(combinationCard.length < 5) return false;
    for(let i = 1; i < combinationCard.length; i++){
      if((cardValued.indexOf(combinationCard[i-1][0].value)) - (cardValued.indexOf(combinationCard[i][0].value)) === -1){ serie++ } else { serie = 1};
      if(serie > 4) return true;
    }
    return false;
  }

  static calcul(combinationCard : Card[][]) : number{

    const cardValued : string[] = ["A", "K", "Q", "J", "10", "9", "8", "7", "6", "5", "4", "3", "2", "aa"];
    const cardValuedReverse : string[] = ["aa","2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];

    if(combinationCard[0][0].value == "A") combinationCard.push([{value : "aa", symbol : ""}]);//add ace to calcul straight 5-4-3-2-A

    let result = 4 * 10000000000;
    let leadStraight = cardValuedReverse.indexOf(combinationCard[0][0].value)
    let serie = 1;

    for(let i = 1; i < combinationCard.length; i++){
      if((cardValued.indexOf(combinationCard[i-1][0].value)) - (cardValued.indexOf(combinationCard[i][0].value)) === -1){ serie++ } else { serie = 1};
      if(serie === 1) leadStraight = cardValuedReverse.indexOf(combinationCard[i][0].value);
      if(serie > 4) break;
    }
    result += leadStraight * 100000000;
    return result;
  }
}