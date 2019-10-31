const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


messageOne.textContent = 'Loading...'
messageTwo.textContent = ''


weatherForm.addEventListener('submit', (e)=> {
    e.preventDefault();

    const location = search.value
    fetch('/weather?address='+ location +'').then((response) => {
        response.json().then((data) => {
            if(data.error){
                messageOne.textContent = data.error
                messageTwo.textContent=''
            }else {
                messageOne.textContent = data.place
                messageTwo.textContent = data.condition+'. '+data.temperature+' There is a ' + data.rain + '% chance of rain.'


            }
        })
    })
})
