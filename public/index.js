let userName = document.getElementById('users-name')
let usersChamp = document.getElementById('champion')
let submit = document.getElementById('submit-choice')
let list = document.createElement('ul')
let listSection = document.getElementById('list-of-choices')



let baseURL = "http://localhost:5055" || "https://f19-traceability.herokuapp.com"

function displayPredictions(arr){
    list.innerHTML = ''
    for(let i = 0; i < arr.length; i++){
        let {userName, usersChamp} = arr[i]
        
        let newChoice = document.createElement('li')
        
        newChoice.textContent = `${userName} chose ${usersChamp} to win it all!`
        console.log(newChoice)
        
        list.appendChild(newChoice)
    }
    listSection.appendChild(list)
    
}

function submitPrediction () {
    
    // console.log(`button works, user name ${userName.value}, champ ${usersChamp.value}`)
    body = {
        userName: userName.value,
        usersChamp: usersChamp.value
    }
    
    axios.post(`/api/choices`, body)
    .then(res => {
        
        displayPredictions(res.data)
        })

    userName.value = ''
    usersChamp.value = ''
}

submit.addEventListener('click', submitPrediction)