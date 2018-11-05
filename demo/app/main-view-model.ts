import { Observable } from 'tns-core-modules/data/observable';
import { Authorizenet } from 'nativescript-authorizenet';

export class HelloWorldModel extends Observable {
  public message: string;
  private authorizeNet: Authorizenet;

  constructor() {
    super();

    this.authorizeNet = new Authorizenet({apiLoginId: 'testing', clientKey: 'testKey'});
    let card= this.authorizeNet.createCardNumber({cardNumber: '1234567891234', cardExpirationMonth: '06', cardExpirationYear:  '21', ccvCode: '123'})
      console.log(card.getCardNumber())
    //  console.log(card.validateCardData(this))
    console.log(this.authorizeNet)    // this.message = this.yourPlugin.message;
  }

  OnValidationSuccessful() {

  }

  OnValidationFaield(object) {
      console.log(object)
  }


}
