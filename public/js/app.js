// client side javascript
console.log("Client side javascript loaded.")

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const messageOne = document.querySelector('#message-one')
const messageTwo = document.querySelector('#message-two')

// messageOne.textContent = 'From JavaScript'

weatherForm.addEventListener('submit' , (e) => {
    e.preventDefault()
    const location = search.value
    if (!location) {
        console.log('Enter the location')
    } else {

    }
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    fetch('http://0.0.0.0:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                // console.log(data.error)
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.address
                messageTwo.textContent = data.data
                // console.log(data.address)
                // console.log(data.data)
            }
        })
    })
    // console.log(location)

})