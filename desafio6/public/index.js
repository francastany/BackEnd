const socket = io();

const productForm = document.getElementById("productForm");
productForm.addEventListener("submit", evt => {
    evt.preventDefault();
    let product = {
        name: evt.target[0].value,
        price: evt.target[1].value,
        imgURL: evt.target[2].value
    };
    console.log(product);
    socket.emit("addProduct", product);
    productForm.reset();
});

const messageForm = document.getElementById("messageForm");
messageForm.addEventListener("submit", evt => {
    evt.preventDefault();
    let d = new Date()
    let message = {
        date: `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()} - ${d.getHours()} : ${d.getMinutes()}`,
        name: evt.target[0].value,
        email: evt.target[1].value,
        message: evt.target[2].value
    }
    console.log(message)
    socket.emit("sendMessage", message);
    messageForm.reset();
})


socket.on('connect', () => {
    console.log('Conectado al servidor');
});

socket.on('loadProducts', products => {
    fetch('http://localhost:8080/views/products.hbs')
      .then(response => {
        return response.text()
    })
      .then(plantilla => {
        let template = Handlebars.compile(plantilla);
        let html = template({products})
        document.getElementById('productsTable').innerHTML = html;
    })
});

socket.on('loadMessages', messages => {
    fetch('http://localhost:8080/views/messages.hbs')
      .then(response => {
        return response.text()
    })
      .then(plantilla => {
        let template = Handlebars.compile(plantilla);
        let html = template({messages})
        document.getElementById('messagesContainer').innerHTML = html;
    })
});
