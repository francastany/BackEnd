/* const list = [2,3,5,7];

list.map(x => x * x).forEach(x => console.log(x)); */
let getNumAleat = (maxNum) => Math.floor(Math.random() * maxNum);

class Color {
    get(){
        return `rgb(${getNumAleat(255)}, ${getNumAleat(255)}, ${getNumAleat(255)}, 1)`;
    };

}

const color = new Color();

console.log(`The random color is: ${color.get()}`);