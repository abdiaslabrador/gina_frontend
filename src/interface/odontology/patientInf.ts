export interface BackgroundInf {
    id: number,
    rm: string,
    app: string,
    ah: string,
    apf: string,
    habits:string,
    created?: Date,
    updateAt?: Date,
    deleteAt?: Date,
}

export interface PatientInf {
    id: number,
    name: string,
    last_name: string,
    ci_rif: string,
    sex: string,
    birthday: Date,
    phone_number: string,
    direction: string,
    background: BackgroundInf,
    created?: Date,
    updateAt?: Date,
    deleteAt?: Date,
}

export interface PatientInfContext{
    selectedPatient : PatientInf,
    patientList : PatientInf[],
    msjSuccessPatient : string,
    msjErrorPatient : string,
    loadingFormPatient: boolean,
    loadingPatientList: boolean,
    selectOption: string,
    createPatientFn(patient: any):void,
    updatePatientFn(patient: PatientInf):void,
    deletePatientFn(patientId : number):void,
    setSelectOptionFn(optionSelected : string):void,
    setSelectedPatientFn(patient: PatientInf):void,
    searchPatientByCiFn(ci_rif:string):void,
    searchPatientByNamesFn(name : string, last_name : string):void,
    searchPatientByDateFn(birthday : string):void,
}