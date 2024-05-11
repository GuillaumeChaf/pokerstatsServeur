import {Card} from "./Calculation";

export default class ArrayGestion
{
  //return an array of array sort by value and by number of cards of the same values exemple : [[2,2,2], [A,A], [J,J], [Q], [5]]
  static splitArrayValue(cards : Card[]){
    const cardValued : string[] = ["A", "K", "Q", "J", "10", "9", "8", "7", "6", "5", "4", "3", "2", "aa"];

    //class cards by value
    const sortedValue = cards.sort(function(a, b) {
      return cardValued.indexOf(a.value) - cardValued.indexOf(b.value);
    });

    //create array for each type of value
    let result = [[sortedValue[0]]]
    for(let i = 1 ; i < sortedValue.length; i++){
        if(sortedValue[i].value == sortedValue[i - 1].value){
            result[result.length - 1].push(sortedValue[i])
        } else {
            result.push([sortedValue[i]])
        }
    }

    //sort array from biggest one to lowest one
    return result.sort(function(array1, array2)  {
        return array2.length - array1.length;
    });
  }

  //return an array of array sort by symbol exemple : [[Club, club], [Spade,Spade,Spade],[Diamond]]
  static splitArraySymbol(cards : Card[]){

    const cardValued : string[] = ["A", "K", "Q", "J", "10", "9", "8", "7", "6", "5", "4", "3", "2", "aa"];

    //regroup card by symbol
    const sortedSymbol = cards.sort(function(a, b) {
      return ( a.symbol).localeCompare(b.symbol)
    });

    //create one array for each type of symbol 
    let result = [[sortedSymbol[0]]]
    for(let i = 1 ; i < sortedSymbol.length; i++){
      if(sortedSymbol[i].symbol == sortedSymbol[i - 1].symbol){
          result[result.length - 1].push(sortedSymbol[i])
      } else {
          result.push([sortedSymbol[i]])
      }
    }

    //sort array from biggest one to lowest one
    const symbolSorted = result.sort(function(array1, array2)  {
        return array2.length - array1.length;
    });

    //class by value the first array
    symbolSorted[0].sort(function(card1, card2)  {
      return cardValued.indexOf(card1.value) - cardValued.indexOf(card2.value);
    });

    return symbolSorted;
  }

  //return an array of array. The cards are sort by values : exemple : [[A,A], [K], [J,J]]
  static splitArrayForStraight(cards : Card[]){
    const cardValued : string[] = ["A", "K", "Q", "J", "10", "9", "8", "7", "6", "5", "4", "3", "2", "aa"];

    //class cards by value
    const sortedValue = cards.sort(function(a, b) {
      return cardValued.indexOf(a.value) - cardValued.indexOf(b.value);
    });

    //create array for each type of value
    let result = [[sortedValue[0]]]
    for(let i = 1 ; i < sortedValue.length; i++){
      if(sortedValue[i].value == sortedValue[i - 1].value){
          result[result.length - 1].push(sortedValue[i])
      } else {
          result.push([sortedValue[i]])
      }
    }
    return result;
  }

  // remove a card (2nd parameter) from an array of card(1rd parameter)
  static removeCard(cardTable: Card[], card: Card) : Card[] {
    let copyTable = cardTable.slice(0, cardTable.length);
    let index = copyTable.findIndex((element) => element.symbol === card.symbol && element.value === card.value);

    if (index !== -1) {
        copyTable.splice(index, 1);
    }

    return copyTable;
  }
}