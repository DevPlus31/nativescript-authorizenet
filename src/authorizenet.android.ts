import { Common } from './authorizenet.common';
import * as app from "tns-core-modules/application";

declare const net: any;

export class Authorizenet extends Common {

    apiClient  = null
    apiLoginId = null
    clientKey  = null

    constructor(props) {
        super();
        this.apiLoginId = props.apiLoginId
        this.clientKey = props.clientKey
        console.log('Authorizenet starting')
        let activity = app.android.startActivity || app.android.foregroundActivity;
        this.apiClient = new net.authorize.acceptsdk.AcceptSDKApiClient.Builder(activity, net.authorize.acceptsdk.AcceptSDKApiClient.Environment.SANDBOX)
            .connectionTimeout(props.Timeout)
            .build()
    }

    private getMerchantAuthentication() {
        return net.authorize.acceptsdk.datamodel.merchant
                .ClientKeyBasedMerchantAuthentication.createMerchantAuthentication(this.apiLoginId, this.clientKey)
    }

    fetchToken(options) {
        let merchantAuthentication = this.getMerchantAuthentication()
        let transactionObject = net.authorize.acceptsdk.datamodel.transaction.TransactionObject
            .createTransactionObject(net.authorize.acceptsdk.datamodel.transaction.TransactionType.SDK_TRANSACTION_ENCRYPTION)
            .cardData(options.cardData)
            .merchantAuthentication(merchantAuthentication)
            .build()

        let vm = this
        return new Promise(function (resolve, reject) {
            var result
            try {
                result = vm.apiClient.getTokenWithRequest(transactionObject, vm)
            }
            catch(err)
            {
                reject(err)
            }

            resolve(result)
        })

    }

    public onEncryptionFinished: (param: net.authorize.acceptsdk.datamodel.transaction.response.EncryptTransactionResponse) => void
    public onErrorReceived: (param: net.authorize.acceptsdk.datamodel.transaction.response.ErrorTransactionResponse) => void


    public createCardNumber(credentials) {
        return new net.authorize.acceptsdk.datamodel.transaction.CardData.Builder(credentials.cardNumber,
                        credentials.cardExpirationMonth, credentials.cardExpirationYear)
            .cvvCode(credentials.ccvCode)
            .cardHolderName(credentials.cardHolderName)
            .build()

    }

}

 // net.authorize.acceptsdk.datamodel.transaction.callbacks.EncryptTransactionCallback
