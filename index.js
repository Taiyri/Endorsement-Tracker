import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"


const appSettings = {
    databaseURL: "https://endorsement-8db53-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)

const endorsementInDB = ref(database, "endorsement")

const publishBtn = document.getElementById("publish-btn")
const endorsementBox = document.getElementById("endorsement-input-box")
const endorsementFrom = document.getElementById("input-from")
const endorsementTo = document.getElementById("input-to")
const endorsementList = document.getElementById("endorsements-list")

let endorsementObject = {
    endorsementText: "",
    endorsementFrom: "",
    endorsementTo: ""
}

publishBtn.addEventListener("click", function() {
    endorsementObject.endorsementText = endorsementBox.value
    endorsementObject.endorsementFrom = endorsementFrom.value
    endorsementObject.endorsementTo = endorsementTo.value

    push(endorsementInDB, endorsementObject)
    clearInputs()
})

onValue(endorsementInDB, function(snapshot) {

    if (snapshot.exists()){
        let endorsementArray = Object.entries(snapshot.val())

        clearEndorsementList()

        for (let i = 0; i < endorsementArray.length; i++) {
            let currentEndorsement = endorsementArray[i]
            let currentEndorsementValue = currentEndorsement[1] 
            prependEndorsement(currentEndorsementValue)        
        }
    } 
    
})

function prependEndorsement(endorsementValue) {
    let div = document.createElement("div")
    div.setAttribute("class", "endorsement-card")

    div.innerHTML = `<h3>${endorsementValue.endorsementTo}</h3>
        <p class = "endorsement-paragraph">${endorsementValue.endorsementText}</p>
        <h3>${endorsementValue.endorsementFrom}</h3>
    `
    endorsementList.prepend(div)
}

function clearEndorsementList () {
    endorsementList.innerHTML = ""
}

function clearInputs() {
    endorsementBox.value = ""
    endorsementFrom.value = ""
    endorsementTo.value = ""
}

