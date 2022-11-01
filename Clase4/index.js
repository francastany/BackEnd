function mostrarLetras (word, timer){
    let counter = 0;
    let miFunction = setInterval(()=> {
        if (counter != word.length){
            console.log(word.slice(counter, counter +1));
            counter++;
        } else {
            end();
            clearInterval(miFunction);
        }
    }, timer);
}

let end = () => console.log("We're done!");

mostrarLetras('Fabrizio', 1000);