import AbstractEntity from "../../@shared/entity/entity.abstract";
import { CustomerValidatorFactory } from './../factory/customer-validation.factory';
import EventDispatcherInterface from "../../@shared/event/event-dispatcher.interface";
import NotificationError from "../../@shared/notification/notification.error";
import AddressChangedEvent from "../event/address-changed-event";
import CustomerCreatedEvent from "../event/customer-created.event";
import { Address } from "../value-object/address";


export class Customer extends AbstractEntity{
    private _name: string;
    private _address!: Address;
    private _active: boolean = false;
    private _rewardPoints: number = 0;
    private _eventDispatcher: EventDispatcherInterface;


    constructor(id: string, name: string, 
        eventDispatcher?: EventDispatcherInterface) {
            super();

            this._name = name;
            this._id = id;
            this.validate();

            if(this.notification.hasErrors()){
                throw new NotificationError(this.notification.errors);
            }
            
            this._eventDispatcher = eventDispatcher;

            if(this._eventDispatcher){
                const customerCreatedEvent = new CustomerCreatedEvent(this);
                this._eventDispatcher.notify(customerCreatedEvent);
            }
        }

   
    get rewardPoints() : number {
        return this._rewardPoints;
    }


    get name() {
        return this._name;
    }


    get address(){
        return this._address;
    }


    addRewardPoints(points: number) {
        this._rewardPoints += points;
    }


    isActive() {
        return this._active;
    }


    validate() {
        CustomerValidatorFactory.create().validate(this);
    }


    changeName(name: string) {
        this._name = name;
        this.validate();
    }


    activate() {    
        if(this._address === undefined){
            throw new Error("Address is mandatory to activate a customer");
        }
        this._active = true;
    }


    changeAddress(address: Address) {
        this._address = address;
        if(this._eventDispatcher){
            this._eventDispatcher.notify(new AddressChangedEvent(this));
        }
    }


    deactivate() {
        this._active = false;
    }   
}