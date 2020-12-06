import React from 'react';
import PaypalExpressBtn from 'react-paypal-express-checkout';
 
export default class Paypal extends React.Component {
    render() {
        //결제 성공시 호출
        const onSuccess = (payment) => {
            console.log("The payment was succeeded!", payment);
            this.props.onSuccess(payment);
        }
        //결제 취소시 호출
        const onCancel = (data) => {
            console.log('The payment was cancelled!', data);
        }
        //결제 에러시 호출
        const onError = (err) => {
            console.log("Error!", err);
        }
 
        let env = 'sandbox'; // you can set here to 'production' for production
        let currency = 'USD'; // or you can set this value from your props or state
        let total = this.props.total; // same as above, this is the total amount (based on currency) to be paid by using Paypal express checkout
        // Document on Paypal's currency code: https://developer.paypal.com/docs/classic/api/currency_codes/
 
        const client = {
            // client ID를 넣는곳
            sandbox:    'Adv9JUZe5x_W0jypZC56xfoQSTDUGnEpan5yJZGF_g4njTsIkMcFtuJUtOwN3z0rckzIbaMoSDcvzjOp',
            production: 'YOUR-PRODUCTION-APP-ID',
        }
        // In order to get production's app-ID, you will have to send your app to Paypal for approval first
        // For sandbox app-ID (after logging into your developer account, please locate the "REST API apps" section, click "Create App"):
        //   => https://developer.paypal.com/docs/classic/lifecycle/sb_credentials/
        // For production app-ID:
        //   => https://developer.paypal.com/docs/classic/lifecycle/goingLive/
 
        // NB. You can also have many Paypal express checkout buttons on page, just pass in the correct amount and they will work!
        return (
            <PaypalExpressBtn 
                env={env} 
                client={client} 
                currency={currency}
                total={total}
                onError={onError} 
                onSuccess={onSuccess} 
                onCancel={onCancel} 
                style={{
                    size: 'large',
                    color: 'blue',
                    shape: 'rect',
                    label: 'checkout'
                }}
            />
        );
    }
}