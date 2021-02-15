const form = document.regForm
const contNickErr = document.getElementById('nickErr')
const contEmailErr = document.getElementById('emailErr')
const contPassErr = document.getElementById('passErr')

form.addEventListener('submit', async (event) => {
  event.preventDefault()
  const username = event.target.username.value.toLowerCase()
  const email = event.target.email.value.toLowerCase()
  const password = event.target.password.value
  const response = await fetch('/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, email, password })
  })
  const json = await response.json()

  if (json.status) {
    window.location.replace('http://localhost:4000/login')
  }
  else if (json.includes('Enter your username')) {
    contNickErr.innerText = 'Enter your username'
    contNickErr.style.color = 'red'
  } else if (json.includes('Enter your email')) {
    contEmailErr.innerText = 'Enter your email'
    contEmailErr.style.color = 'red'
  } else if (json.includes('Enter a password')) {
    contPassErr.innerText = 'Enter a password'
    contPassErr.style.color = 'red'
  } else if (json.includes('Password is too short')) {
    contPassErr.innerText = 'Password is too short'
    contPassErr.style.color = 'red'
  } else if (json.includes('username_1')) {
    contNickErr.innerText = 'Such user already exists'
    contNickErr.style.color = 'red'
  } else if (json.includes('email_1')) {
    contEmailErr.innerText = 'This email is already in use'
    contEmailErr.style.color = 'red'
  } 
})
