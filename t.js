// Posting a resource

let form = document.getElementById('0rder-form')

form.addEventListener('submit', e =>  {

    // prevent form for reloading
    e.preventDefault()
    console.log(e)
    
    // getting form inputs
    let name = document.getElementById('name').value
    let address = document.getElementById('address').value
    let phone = document.getElementById('phone').value
    let products = document.getElementById('productsList').value

    // creating object from form input
    const formData = {
        name : name,
        address : address,
        phone: phone,
        productsList: products
    }
    console.log(formData)
    
   
    // sending data to the server using fetch api
    fetch(apiUrl, {
        method : "POST",
        headers : {
            "Content-Type" : "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(formData)
    })
    .then(res => res.json())
    // .then(photo => console.log(photo))

    // Resetting form inputs
    document.getElementById('name').value = ""
    document.getElementById('address').value = ""
    document.getElementById('phone').value = ""
    document.getElementById('productsList').value = ""
})
