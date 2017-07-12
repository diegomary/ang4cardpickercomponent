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
    maximum: 52,
    cards: {
        'hearts': Array.from(new Array(13), (x,i) => i + 1),
        'spades': Array.from(new Array(13), (x,i) => i + 14),
        'clubs':  Array.from(new Array(13), (x,i) => i + 27),
        'diamonds': Array.from(new Array(13), (x,i) => i + 40)
     },
     //Object Literal lookup technique
     getFace:function(cardnumber) {
       let faces=  {
         '11':'Jack',
         '12':'Queen',
         '13':'King'
       }
       return (faces[cardnumber.toString()] || null);
     },
     createCardPicker: function():any {
       return function() {
             let suits = Object.getOwnPropertyNames(this.cards);
             let pickedCard = Math.floor(Math.random() * (this.maximum - this.minimum + 1)) + this.minimum;
             for (let suit of suits) {
             let pos = this.cards[suit].indexOf(pickedCard);
             if(pos > -1) {
               //console.log(pickedCard);
               //console.log(suit,'---',this.cards[suit]);
               let cardNumber = pos+1;
               let isFace = this.getFace(cardNumber)
               if(isFace) return (isFace + ' ' + suit );
               else return (cardNumber + ' ' + suit );
               }
            }
         }.bind(this)
      }
   }

  public pick(){
        this.card = (this.guesser.createCardPicker())();
  }

}
