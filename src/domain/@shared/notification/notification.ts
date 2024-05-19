export type NotificationErrorProps = {
    message: string;
    context: string;
}


export default class Notification{

    private _errors: NotificationErrorProps[] = [];


    get errors() : NotificationErrorProps[] {
        return this._errors;
    }


    public addError(error: NotificationErrorProps): void {
        this._errors.push(error);
    }


    public messages(context?: string): string {
        let message = "";
        this.errors.forEach((error) => {
            if(context == undefined || error.context === context){
                message += `${error.context}: ${error.message},`;
            }
        });
        return message;
    }


    public hasErrors(): boolean {
        return this.errors.length > 0;
    }    
}