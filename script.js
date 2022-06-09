class Card {
  constructor(suit, rank, score) {
    this.suit = suit
    this.rank = rank
    this.score = score
  }
}

class Deck {
  constructor() {
    this.cards = []
    this.createDeck();
  }

  createDeck() {
    let suits = ['heart', 'club', 'diamond', 'spade'];
    let ranks = ['Ace', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King',
    ]

    for (let i = 0; i < suits.length; i++) {
      for (let j = 0; j < ranks.length; j++) {
        this.cards.push(new Card(suits[i], ranks[j], j + 1))
      }
    }
    this.shuffle()

  }

  shuffle() {
    this.cards = this.cards.sort((a, b) => 0.5 - Math.random());
  }

}

class BattleTime {
  constructor() {
    this.playerOneDeck = []
    this.playerTwoDeck = []
    this.pile = []
    this.gameSetup()
    this.playGame()
  }

  gameSetup() {
    let pokerDeck = new Deck()

    let middleIndex = Math.ceil(pokerDeck.cards.length / 2);
    this.playerOneDeck.push(...pokerDeck.cards.splice(0, middleIndex));
    this.playerTwoDeck.push(...pokerDeck.cards.splice(-middleIndex));
  }

  playGame() {
    while (this.playerOneDeck.length > 0 && this.playerTwoDeck.length > 0) {
      const p1Card = this.playerOneDeck.pop()
      const p2Card = this.playerTwoDeck.pop()
      if (p1Card.score === p2Card.score) {
        if (this.playerOneDeck.length < 4 && this.playerTwoDeck.length < 4) {
          const p1Pot = this.playerOneDeck.splice(0, this.playerOneDeck.length - 1)
          const p2Pot = this.playerTwoDeck.splice(0, this.playerTwoDeck.length - 1)
          this.pile.push(...p1Pot, ...p2Pot, p1Card, p2Card)
        } else if (this.playerOneDeck.length < 4) {
          const p1Pot = this.playerOneDeck.splice(0, this.playerOneDeck.length - 1)
          const p2Pot = this.playerTwoDeck.splice(this.playerTwoDeck.length - 3, 3)
          this.pile.push(...p1Pot, ...p2Pot, p1Card, p2Card)
        } else if (this.playerTwoDeck.length < 4) {
          const p1Pot = this.playerOneDeck.splice(this.playerOneDeck.length - 3, 3)
          const p2Pot = this.playerTwoDeck.splice(0, this.playerTwoDeck.length - 1)
          this.pile.push(...p1Pot, ...p2Pot, p1Card, p2Card)
        } else {
          const p1Pot = this.playerOneDeck.splice(this.playerOneDeck.length - 3, 3)
          const p2Pot = this.playerTwoDeck.splice(this.playerTwoDeck.length - 3, 3)
          this.pile.push(...p1Pot, ...p2Pot, p1Card, p2Card)
        }
      } else if (p1Card.score > p2Card.score) {
        console.log('P1 Score: ' + p1Card.score + ' ' + 'P2 Score: ' + p2Card.score + '...Player 1 wins this battle!')
        this.playerOneDeck.unshift(p2Card, p1Card, ...this.pile)
        this.pile.length = 0
      } else if (p2Card.score > p1Card.score) {
        console.log('P1 Score: ' + p1Card.score + ' ' + 'P2 Score: ' + p2Card.score + '...Player 2 wins this battle!')
        this.playerTwoDeck.unshift(p1Card, p2Card, ...this.pile)
        this.pile.length = 0
      }
    }
    console.log(this.playerOneDeck.length, this.playerTwoDeck.length)
  }
}

let game = new BattleTime()
console.log(game.playGame())

