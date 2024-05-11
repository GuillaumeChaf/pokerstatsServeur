import {Card} from "../Calculation";

export default class ThreeOfAKind{

  //combinationCard must be an array of multiple array sort by value and the first one is the longest one
  static checkCombination(combinationCard : Card [][]) : boolean{

    return combinationCard[0].length > 2
  }

  static calcul(combinationCard : Card [][]) : number{

    const cardValued : string[] = ["aa", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];

    let result = 3 * 10000000000;

    result += cardValued.indexOf(combinationCard[0][0].value) * 100000000;
    if(combinationCard[1] !== undefined) return result + cardValued.indexOf(combinationCard[1][0].value) * 1000000;
    if(combinationCard[2] !== undefined) return result + cardValued.indexOf(combinationCard[2][0].value) * 10000;

    return result;
  }
}