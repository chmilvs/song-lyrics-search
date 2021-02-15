const del = document.querySelectorAll('#delete')
for (let i = 0; i < del.length; i++) {
  del[i].addEventListener('click', async (event) => {
    event.preventDefault()
    const urlForDelete = del[i].getAttribute('href')
    const response = await fetch(urlForDelete)
    const json = await response.json()
    if (json.status) {
      location.replace('/lyrics')
    }
  })
}
