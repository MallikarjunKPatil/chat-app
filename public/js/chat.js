const socket = io()

// socket.on('countUpdated', (count) => {
//     console.log('Count has been updated', count);
// })

// document.querySelector('#increment').addEventListener('click', () => {
//     console.log('Clicked');
//     socket.emit('increment')
// })

socket.on('message', (message) => {
    console.log(message);
})