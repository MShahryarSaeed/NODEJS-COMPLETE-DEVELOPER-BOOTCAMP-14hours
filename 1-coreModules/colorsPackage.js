const colors= require("colors");


const age=22;
const name="Shahryar";

if(age>=18){
   console.log(colors.green(`Hello ${name}. You are ${age} years old.You can drive the Bike`));
}else{
    console.log(colors.red(`Hello ${name}. You are ${age} years old.You can't drive the Bike`));
}  

console.log('shahryar'.bgBlack);

