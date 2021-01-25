const socket = io()

//Elements
const $messageForm = document.querySelector('#message-form')
const $messageFormInput = $messageForm.querySelector('input')
const $messageFormButton = $messageForm.querySelector('button')
const $sendlocation = document.querySelector('#send-location')

socket.on('message', (message) => {
    console.log(message);
})

$messageForm.addEventListener('submit', (e) => {
    e.preventDefault()

    $messageFormButton.setAttribute('disabled', 'disabled')

    const data = e.target.elements.message.value

    socket.emit('sendMessage', data, () => {
        $messageFormButton.removeAttribute('disabled')
        $messageFormInput.value = ''
        $messageFormInput.focus()


        console.log('Message delivered!');
    })
})

$sendlocation.addEventListener('click', () => {
    if (!navigator.geolocation) {
        return alert('Geolocaion not supported')
    }

    $sendlocation.setAttribute('disabled', 'disabled')

    navigator.geolocation.getCurrentPosition((position) => {

        const locationData = {
            lat: position.coords.latitude,
            long: position.coords.longitude
        }

        socket.emit('sendLocation', locationData, () => {
            $sendlocation.removeAttribute('disabled')
            console.log('Location shared!');
        })
    })
})