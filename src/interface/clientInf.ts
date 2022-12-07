export interface ClientInf {
    id: number;
    name : string;
    last_name: string;
    ci_rif: string;
    phone_number?:string;
    direction?:string;
    createdAt?: Date;
    updateA?: Date;
}

export interface ClientContextInf {
    selectedClient: ClientInf;
    clientList: ClientInf[];
    msjSuccess : string;
    msjError : string;
    loadingForm: boolean;
    searchClientByCiFn(ci_rif : string):void;
    cleanClientsFn():void;
    createClientFn(client : any):void;
    setSelectedClientFn(client:ClientInf): void;
    deleteClientFn(clientId: number):void;
    updateClientFn(client: ClientInf):void;
  }
  