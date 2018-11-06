import { Common } from './authorizenet.common';
import * as app from "tns-core-modules/application";

declare const AcceptSDKHandler : any
declare const AcceptSDKRequest : any


export class Authorizenet extends Common {

    handler = null
    request = null

    constructor(props) {
        super()

        this.handler = AcceptSDKHandler()
        this.request = AcceptSDKRequest()

        if (props.apiLoginId === undefined || props.clientKey === undefined) {
            throw "You must enter apiKey and Client key"
        }

        this.request.merchantAuthentication.name = props.apiLoginId
        this.request.merchantAuthentication.clientKey = props.clientKey

    }


    public createCardNumber(credentials) {
        this.request.securePaymentContainerRequest.webCheckOutDataType.token.cardNumber = credentials.cardNumber
        this.request.securePaymentContainerRequest.webCheckOutDateType.token.expirationMonth = credentials.cardExpirationMonth
        this.request.securePaymentContainerRequest.webCheckOutDataType.token.cardCode = credentials.ccvCode
    }

    fetchToken(options) {
        let vm = this
        return new Promise(function (resolve, reject) {
            vm.handler.getTokenWithRequest(vm.request, function (arg) {
               //  arg
            })
        })

    }

    public onEncryptionFinished: () => void
    public onErrorReceived: () => void



}