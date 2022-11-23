export interface ErrorServerInf {
    errorFromServer: boolean;
    saveErrorFromServerFn(errorFromServer: boolean): void;
}