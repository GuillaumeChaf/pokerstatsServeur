import {Card} from "../Calculation";

export default class Flush{

  //combinationCard must be an array of multiple array sort by symbol and the first one is the longest one
  static checkCombination(combinationCard : Card[][]) : boolean{

    return combinationCard[0].length > 4;
  }

  static calcul(combinationCard : Card[][]) : number{

    const cardValued : string[] = ["aa", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];

    let result = 5 * 10000000000;
    result += cardValued.indexOf(combinationCard[0][0].value) * 100000000
    result += cardValued.indexOf(combinationCard[0][1].value) * 1000000
    result += cardValued.indexOf(combinationCard[0][2].value) * 10000
    result += cardValued.indexOf(combinationCard[0][3].value) * 100
    result += cardValued.indexOf(combinationCard[0][4].value)    
    return result;
  }
}