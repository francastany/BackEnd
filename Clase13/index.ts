let getNumAleatTs = (maxNum:number):number => Math.floor(Math.random() * maxNum);

class ColorTs {
    get():string{
        return `rgb(${getNumAleatTs(255)}, ${getNumAleatTs(255)}, ${getNumAleatTs(255)}, 1)`;
    };
}

const colorTs:ColorTs = new ColorTs();

console.log(`The random color is: ${colorTs.get()}`);