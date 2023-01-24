export interface AppointmentInf{
    id:string,
    appointment_date: Date,
    reason:string,
    description:string,
    created?: Date,
    updateAt?: Date,
    deleteAt?: Date,
}

export interface AppointmentInfContext{
    appointment: AppointmentInf,
    visibleAppointmentEdit: boolean,
    appointmentList: AppointmentInf[],
    appointmentSelected: AppointmentInf,
    loadingAppointmentList: boolean,
    loadingFormAppointment:boolean,
    msjSuccessAppointment : "",
    msjErrorAppointment : "",
    setVisibleAppointmentEditFn(visible:boolean):void,
    setSelectedAppointmentFn(appointment:AppointmentInf):void,
    updateAppointmentListFn():void,
    deleteAppointmentFn():void,
    updateAppointmentFn(appointment:AppointmentInf):void,
    // deleteAppointmentFn(id:number):void,
    createAppointmentFn(appointment:any):void,
}