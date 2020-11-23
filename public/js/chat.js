const socket = io()

socket.on('message', (message) => {
    console.log(message);
})

document.querySelector('#message-form').addEventListener('submit', (e) => {
    e.preventDefault()
    const data = e.target.elements.message.value
    socket.emit('sendMessage', data)
})

document.querySelector('#send-location').addEventListener('click', () => {
    if (!navigator.geolocation) {
        return alert('Geolocaion not supported')
    }

    navigator.geolocation.getCurrentPosition((position) => {

        const locationData = {
            lat: position.coords.latitude,
            long: position.coords.longitude
        }

        socket.emit('sendLocation', locationData)
    })
})