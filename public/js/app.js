// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })



// FORM 
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

//by class ('.className)
const messageOne = document.querySelector('#message-1') //targetting by ID 
const messageTwo = document.querySelector('#message-2')


// messageOne.textContent  = 'From JavaScript'

//e is event
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault() //this prevent the 'default' behavior, in this case avoids refreshing the browser on submit

    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''



    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error

            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
                console.log(data.location)
                console.log(data.forecast)
            }

        })
    })
})