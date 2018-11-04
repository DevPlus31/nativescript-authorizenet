import { Observable } from 'tns-core-modules/data/observable';
import { Authorizenet } from 'nativescript-authorizenet';

export class HelloWorldModel extends Observable {
  public message: string;
  private authorizeNet: Authorizenet;

  constructor() {
    super();

    this.authorizeNet = new Authorizenet({apiLoginId: 'testing', clientKey: 'testKey'});
    console.log(this.authorizeNet)    // this.message = this.yourPlugin.message;
  }
}
