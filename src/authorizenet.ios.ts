import { Common } from './authorizenet.common';
import * as app from "tns-core-modules/application";


export class Authorizenet extends Common {

    apiClient  = null
    apiLoginId = null
    clientKey  = null


    constructor(props) {
        super()

        let handler = AcceptSDKHandler()
    }


}