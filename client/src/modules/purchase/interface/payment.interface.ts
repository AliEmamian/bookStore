export interface paymentInterface {
    
    createPaymentLink(
        purchaseId: string,
        amount: number,
        callbackUrl: string,
    ): Promise<payment>;

    handlePaymentCallback(
        purchaseId: string,
        isOk: boolean,
    ): Promise<void>;

    verifyPayment(
        purchaseId: string,
    ): Promise<boolean>;
}

export interface payment{
    link:string,
    authority:number
}