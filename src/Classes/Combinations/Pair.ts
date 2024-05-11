import {Card} from "../Calculation";

export default class Pair{

  static checkCombination(combinationCard : Card[][]) : boolean{

    for(let array of combinationCard){
      if(array.length === 1) return false
      if(array.length === 2) return true;
    }
    return false;
  }

  static calcul(combinationCard : Card[][]) : number{
    const cardValued : string[] = ["aa", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
    
    let result = 1 * 10000000000;

    result += cardValued.indexOf(combinationCard[0][0].value) * 100000000;
    if(combinationCard[1] !== undefined) result += cardValued.indexOf(combinationCard[1][0].value) * 1000000;
    if(combinationCard[2] !== undefined) result += cardValued.indexOf(combinationCard[2][0].value) * 10000;
    if(combinationCard[3] !== undefined) result += cardValued.indexOf(combinationCard[3][0].value) * 100;

    return result;
  }
}