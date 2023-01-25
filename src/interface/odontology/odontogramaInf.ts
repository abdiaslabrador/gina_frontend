export interface ToothPartInf{
    id:number| null,
    one: string | null,
    two: string | null,
    three: string | null,
    four: string | null,
    five: string | null,
    created?: Date,
    updateAt?: Date,
    deleteAt?: Date,
}
export interface ToothInf{
    id:number| null,
    number: number,
    e: string | null,
    m: string | null,
    question: boolean | null,
    line: string | null,
    circle: string | null,
    ring: string | null,
    x: string | null,
    toothParts:ToothPartInf | null,
    created?: Date,
    updateAt?: Date,
    deleteAt?: Date,
}

export interface OdontogramaInfContext{
    tooth: ToothInf,
    odontogramaEditable: any,
    visibleToothOptions: boolean, 
    loadingTeethList: boolean,
    setVisibleToothOptionsModalFn(visible : boolean):void,
    setSelectedToothFn(tooth:any):void,
    createOrToothFn(tooth:any):void,
    getTeethFn():void,
}