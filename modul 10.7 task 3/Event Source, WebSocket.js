const wsUri = "wss://echo-ws-service.herokuapp.com";
const messageInput = document.querySelector('.message');
const sendBtn = document.querySelector('.j-btn-message');
const textWindow = document.querySelector('.text-window');
const geolocBtn = document.querySelector('.j-btn-geo');
const placeholder = 'Здесь вводится текст сообщения';


let websocket = new WebSocket(wsUri); //открытия WebSocket-соединения

websocket.onopen = function(evt) { //onopen — срабатывает, когда соединение готово отсылать и принимать данные;
    console.log("CONNECTED");
};

websocket.onerror = function(evt) { //onerror — срабатывает, когда происходит ошибка соединения.
    console.log("DISCONNECTED")
};

websocket.onmessage = function(evt) { // onmessage — событие, обрабатывающее все получаемые сообщения;
  console.log(evt.data);
  addMessage(evt.data, 'flex-start');
};


sendBtn.addEventListener('click', () => {
    let message = messageInput.value;
    websocket.send(message); // Метод .send позволяет отправить запрос на сервер
    addMessage(message);
    messageInput.value = ''
})


function addMessage(message, position='flex-end') {
    let element = `
        <p class='message-window' style='align-self: ${position}'>
            ${message}
        </p>
    `;
    let chat = textWindow.innerHTML;
    textWindow.innerHTML = chat + element;
}



const error = () => {
    let error = "Гео-локация не может быть определена" 
    addMessage(error);
}

const success = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    let link = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
    addLink(link)
}



function addLink(link) {
    let element = `
    <a  href='${link}'
        target='_blank'
        style='text-decoration: none; color: rgb(0, 110, 255); border: 5px solid rgb(168, 203, 235); border-radius: 5px; width: 85px; padding: 2px 5px; margin-left: 5px; margin-top: 5px;'
        >
        Гео-локация
        </a>
    `;
    let chat = textWindow.innerHTML;
    textWindow.innerHTML = chat + element;
};



geolocBtn.addEventListener('click', () => {
    if (!navigator.geolocation) {
        console.log("Вы не можете использовать гео-локацию")
    } else {
        navigator.geolocation.getCurrentPosition(success, error);
    };
});