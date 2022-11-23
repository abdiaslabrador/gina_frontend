export function isBrowser() {
  return typeof window !== "undefined";
}
// const authToken = (token: string | null)  => {
//     if(token){
//         customAxios.defaults.headers.common["authorization"]= "Bearer " + token
//     }
//     else{
//         delete customAxios.defaults.headers.common["authorization"]
//     }
// }
