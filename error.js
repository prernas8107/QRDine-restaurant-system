



// const error = new Error("Token is expired") ;
// error.name = 'TokenExpiredError'
// error.name = 'Mongoose Duplicate key error'
// if(error.name === "TokenExpiredError"){
//     console.log(error.message)
// }else if(error.name ==== "")

console.log(new Date())
const date = new Date() ;
console.log(date.getHours()) ;
console.log(date.setHours(24));
import os from 'os' ;

console.log(os.networkInterfaces()['Wi-Fi'])

const data = os.networkInterfaces()['Wi-Fi']
let ipAddress = null
for(const el of data){
if(el.family === "IPv4")
    ipAddress = el.address
}
console.log(ipAddress)