form = document.logForm
const errorCont1 = document.getElementById('unameErr')

const errorCont2 = document.getElementById('pwordErr')

form.addEventListener('submit', async (event) => {
  event.preventDefault()
  const username = event.target.username.value.toLowerCase()
  const password = event.target.password.value
  const response = await fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password })
  })
  const json = await response.json()
  if (json.status) {
    window.location.replace('http://localhost:4000/lyrics')
  } else if (json.message == 'No such user!') {
    errorCont1.innerText = json.message
    errorCont1.style.color = 'red'
  } else if (json.message == 'Wrong password!') {
    errorCont2.innerText = json.message
    errorCont2.style.color = 'red'
  }
})
