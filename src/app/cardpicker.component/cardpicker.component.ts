import { Component,OnInit,AfterViewInit } from '@angular/core';
import { CardModel, CardHelper } from './cardmodel';
import {Observable} from 'rxjs/Rx';
import * as d3 from 'd3';

@Component({
  selector: 'card-picker',
  templateUrl: './cardpicker.component.html',
  styleUrls: ['./cardpicker.component.css']
})

export class CardPickerComponent implements OnInit, AfterViewInit  {

  public title:string = 'cp';
  public results:CardModel[] = [];
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
       let faces = {
         '11':'Jack of',
         '12':'Queen of',
         '13':'King of',
         '1':'Ace of'
       }
       return (faces[cardnumber.toString()] || null);
     },
     createCardPicker: function():any {
       return function():string {

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

  public ngAfterViewInit():void {

    var source = Observable.interval(100).timeInterval().take(2);
    var subscription = source.subscribe(
         (x) => {
          this.pick();
          console.log('Next: ' + JSON.stringify(x));
        },
        function (err) {
            console.log('Error: ' + err);
        },
        function () {
            console.log('Completed');
        });
  }


  public ngOnInit():void {}
  public pick(){
    this.results = [];
      for(let i = 0; i < 25000; i++ ) {
        let entry = new CardModel((this.guesser.createCardPicker())(),this.guesser.pickedCard)
        this.results.push(entry);
      }
     this.results.sort(function(x, y){ return (x.cardNumber) - (y.cardNumber);})
     let cardNumbers:CardHelper[] = [];
     for (let n = 0; n < 54; n++) { cardNumbers.push(new CardHelper(n+1,0));}
     let c:number = 0;
     let q:number = 0;
     for (let res of this.results) {
        q = res.cardNumber;
        if( q === cardNumbers[c].cn ) {
           cardNumbers[c].count ++ ;
           continue;
          }
        cardNumbers[c+1].count ++;
        c++;
     }
     let relevantValues = cardNumbers.map(function(x) {
        return x.count;
     });
     console.log(relevantValues);
     let clearer = d3.select(".bar");
     clearer.selectAll("*").remove();
     let dv = d3.select(".bar")
     .selectAll("div")
     .data(relevantValues)
     dv.enter().append("div")
     .text(function(d) { return d; })
     //.attr("class","isto")
     .style("display","inline-block")
     .style("background-color", function(d) {
       var x = Math.floor(Math.random() * 256);
       var y = Math.floor(Math.random() * 256);
       var z = Math.floor(Math.random() * 256);
       let bgColor = "rgb(" + x + "," + y + "," + z + ")";
       return bgColor
      })
     .style("vertical-align","bottom")
     .style("color","yellow")
     .style("font-family","verdana")
     .style("margin-right","0.1%")
     .style("width","1.75%")
     .style("font-size","xx-small")
     .style("text-align","center")
     .style("padding-top","50px")
     .style("height", function(d) {
           var barHeight = d ;
           return barHeight + "px";
         });
     dv.exit().remove();

     var data = [2,3,17,10,10,10,10,10,10,12];

     var width = 500,
         height = 500,
         radius = Math.min(width, height) / 2;

     var arc = d3.arc()
         .outerRadius(radius - 10)
         .innerRadius(0);

     var labelArc = d3.arc()
         .outerRadius(radius - 40)
         .innerRadius(radius - 40);

     var pie = d3.pie()
         .sort(null)
         .value(function(d:any) { return d; });


         let clearer1 = d3.select(".piechart");
         clearer1.selectAll("*").remove();


     var svg = d3.select(".piechart").append("svg")
         .attr("width", width)
         .attr("height", height)
         .append("g")
         .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

       var g = svg.selectAll(".arc")
           .data(pie(data))
         .enter().append("g")
           .attr("class", "arc");

       g.append("path")
           .attr("d", <any> arc)
           .style("fill", function(d:any) {
             var x = Math.floor(Math.random() * 256);
             var y = Math.floor(Math.random() * 256);
             var z = Math.floor(Math.random() * 256);
             let bgColor = "rgb(" + x + "," + y + "," + z + ")";
             return bgColor
            });

       g.append("text")
           .attr("transform", function(d:any) { return "translate(" + labelArc.centroid(d) + ")"; })
           .attr("dy", ".35em")
           .text(function(d:any) { return d.data; });



  }
}
