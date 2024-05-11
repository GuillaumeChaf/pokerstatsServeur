import {Card} from "../Calculation";

class FullHouse{

  static checkCombination(combinationCard : Card[][]) : boolean {
    return combinationCard[0].length === 3 && combinationCard[1] !== undefined && combinationCard[1].length >= 2
  }

  static calcul(combinationCard : Card[][]) : number{

    const cardValued : string[] = ["aa", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
    let result = 6 * 10000000000;
    result += cardValued.indexOf(combinationCard[0][0].value) * 100000000 + cardValued.indexOf(combinationCard[1][0].value) * 1000000
    
    return result;
  }
}


export default FullHouse
