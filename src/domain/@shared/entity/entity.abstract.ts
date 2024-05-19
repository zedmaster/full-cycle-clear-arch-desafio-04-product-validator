import Notification from "../notification/notification";


export default abstract class AbstractEntity {

    protected _id: string;
    protected _notification: Notification


    constructor(){
        this._notification = new Notification();
    }

    
    get notification() : Notification {
        return this._notification;
    }


    get id() : string {
        return this._id;
    }    
}