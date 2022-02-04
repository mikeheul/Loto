window.addEventListener("DOMContentLoaded", () => {

    const choices = document.querySelector(".choices") 
    const tirage = document.querySelector(".tirage")
    const result = document.querySelector(".result")
    const button = document.querySelector(".button")
    
    const MAX = 5
    const NBCHOICES = 49

    // Random array numbers 1 -> NBCHOICES
    let numbers = Array.from({length: NBCHOICES}, (k, v) => v + 1)
    let shuffle = numbers.sort(() => Math.random() - 0.5)
    let computerChoices = []
    let userChoices = []
    let commonElements  = []

    j = 0
    while(j < MAX) {
        computerChoices.push(shuffle[j])
        j++
    }

    // Display computer choices
    console.log(computerChoices)

    // Display the grid of numbers
    for(let i = 1; i <= NBCHOICES; i++) {

        let choice = document.createElement("div")
        choice.classList.add("choice")
        choice.innerHTML = i
        choices.appendChild(choice)

        choice.addEventListener("click", () => {
            let e = parseInt(choice.innerHTML)
            
            // User choices
            if(userChoices.length < MAX) {
                userChoices.push(e)
                choice.style.pointerEvents = "none"
                choice.classList.add("disabled")
                
                // Get the common values between computer and user
                commonElements = computerChoices.filter(value => userChoices.includes(value))
                console.log(commonElements)
            } 

            // Display compputer choices when user choices are done
            if(userChoices.length == MAX) {
                displayComputer()

                // Disable all numbers
                for(i = 1; i <= NBCHOICES; i++) {
                    choices.children[i-1].style.pointerEvents = "none"
                }
            }
        })
    }

    function displayComputer() {
        
        let title = document.createElement("p")
        title.innerHTML = "<h2>Tirage</h2>"
        tirage.appendChild(title)
        let div = document.createElement("div")
        div.classList.add("details")

        computerChoices.forEach(c => {
            let tirageComputer = document.createElement("div")
            tirageComputer.classList.add("tirageComputer")

            if(commonElements.includes(c)){
                tirageComputer.classList.add("tirageComputerOK")
            }

            tirageComputer.innerHTML += c
            div.appendChild(tirageComputer)
        })
        
        tirage.appendChild(div)

        let term = (commonElements.length > 1) ? "s" : ""
        let congrats = (commonElements.length >= 1) ? "Bravo, v" : "V"
        result.innerHTML = congrats + "ous avez trouvé " + commonElements.length + " numéro" + term + " ! <br>"

        switch(commonElements.length) {
            case 0 :    
                result.innerHTML += "<span class='emoji'>" + String.fromCodePoint(0x1F625) + "</span>";
                break
            case MAX :    
                result.innerHTML += "<span class='emoji'>" + String.fromCodePoint(0x1F60E) + "</span>";
                break
        }

        commonElements.sort(function(a, b) {return a - b;});

        // result.innerHTML += commonElements.join(" - ")

        let button = document.createElement("button")
        button.classList.add("button")
        button.innerHTML = "<i class='fa-solid fa-repeat'></i>" + "&nbsp;Rejouer"
        // result.appendChild(document.createElement("br"))
        result.appendChild(button)

        button.addEventListener("click", () => {
            window.location.reload()
        })
    }
})