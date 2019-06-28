
module.exports = class createStatistics{

  allCardsTable(){

    let cards = [];
    const values = ["2","3","4","5","6","7","8","9","10","J","Q","K","A"];
    const symbols = ["Clover","Spade","Heart","Diamond"];
    for(const val of values){
      for(const sym of symbols){
        cards.push({value : val, symbol : sym, child : []})
      }
    }
    return cards;
  }

  allCardsWithRecursion(nbLoop, card){

    if(nbLoop == 0){
      return null;
    } else {
      card.child = allCardsTable();
      for(const oneCard of card.child){
        allCardsWithRecursion(nbLoop - 1, oneCard);
      }
    }
    return card;
  }

  allCardsTableStringed(onlyOneSymbol = null){
    let cards = [];
    const values = ["2","3","4","5","6","7","8","9","10","11","12","13","14"];
    const symbols = ["C","S","H","D"];
    for(const val of values){
      if(onlyOneSymbol !== null){
        cards.push(val + onlyOneSymbol)
      } else {
        for(const sym of symbols){
          cards.push(val + sym)
        }
      }
    }
    return cards;
  }

  allCardsWithRecursionStringed(nbLoop, currentTable){

    if(nbLoop == 0){
      return currentTable
    } else {

      let newTable = [];
      if(nbLoop == 4){
        newTable = allCardsTableStringed("C");
      } else {
        newTable = allCardsTableStringed();
      }

      for(const oneCard of newTable){
        let obj = {}
        obj[oneCard] = allCardsWithRecursionStringed(nbLoop - 1, [])
        currentTable.push(obj)
      }
    }
    return currentTable
  }
}
