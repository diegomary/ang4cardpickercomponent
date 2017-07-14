export class CardModel{
  public pick:string;
  public cardNumber:number;
  constructor(_pick: string,_cardNumber:number) {
          this.pick = _pick;
          this.cardNumber = _cardNumber;
      }
}


export class CardHelper {
  public cn:number;
  public count:number;
  constructor(_cn: number,_count:number) {
          this.cn = _cn;
          this.count = _count;
      }
}
