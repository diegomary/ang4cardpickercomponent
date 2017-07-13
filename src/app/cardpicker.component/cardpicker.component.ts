import { Component } from '@angular/core';
@Component({
  selector: 'card-picker',
  templateUrl: './cardpicker.component.html',
  styleUrls: ['./cardpicker.component.css']
})
export class CardPickerComponent {
  public card:string = '';
  public title:string = 'cp';
  public guesser:any = {
    minimum: 1,
    maximum: 54,
    pickedCard: 0,
    cards: {
        'hearts': Array.from(new Array(13), (x,i) => i + 1),
        'spades': Array.from(new Array(13), (x,i) => i + 14),
        'clubs':  Array.from(new Array(13), (x,i) => i + 27),
        'diamonds': Array.from(new Array(13), (x,i) => i + 40),
        'jokers' : Array.from(new Array(2), (x,i) => i +53)
     },
     //Object Literal lookup technique
     getFace:function(cardnumber):string {
       let faces=  {
         '11':'Jack of',
         '12':'Queen of',
         '13':'King of',
         '1':'Ace of'
       }
       return (faces[cardnumber.toString()] || null);
     },
     createCardPicker: function():any {
       return function() {

             let suits:string[] = Object.getOwnPropertyNames(this.cards);
             this.pickedCard = Math.floor(Math.random() * (this.maximum - this.minimum + 1)) + this.minimum;
             for (let suit of suits) {
             let pos = this.cards[suit].indexOf(this.pickedCard);
             if(pos > -1) {
               //console.log(pickedCard);
               //console.log(suit,'---',this.cards[suit]);
               let cardNumber:number = pos + 1;
               if(suit === 'jokers') return ('Joker' );
               let isFace:string = this.getFace(cardNumber)
               if(isFace) return (isFace + ' ' + suit );
               else return (cardNumber + ' of ' + suit );
               }
            }
         }.bind(this)
      }
   }

  public pick(){
        this.card = (this.guesser.createCardPicker())();
  }

}
