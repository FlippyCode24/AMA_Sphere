let attempts = 0; // Variable to track number of attempts
let userMoney = 1000; // User's initial money
let betAmount = 0; // Initialize bet amount variable

document.getElementById("rollButton").onclick = function(){
    attempts++; // Increment attempts counter
    let userNumbers = [];
    let lottoNums = new Set();
    const size = 6;

    // If user has placed a bet, set the first generated number to match user's 6 numbers
    if (attempts === 1) {
        betAmount = parseInt(document.getElementById("betAmount").value); // Parse bet amount
        if (betAmount > userMoney) {
            alert("You don't have enough money for this bet.");
            return;
        }

        for(let i = 1; i <= 6; i++){
            let userInput = parseInt(document.getElementById(`num${i}Input`).value);
            if(userInput < 1 || userInput > 60 || isNaN(userInput)){
                alert("Please enter valid numbers between 1 and 60.");
                return;
            }
            userNumbers.push(userInput);
        }

        // Add user's numbers to the generated numbers set
        for (let num of userNumbers) {
            lottoNums.add(num);
        }

        // Generate remaining random numbers
        while (lottoNums.size < size) {
            let num = Math.floor(Math.random() * 60) + 1;
            if (!userNumbers.includes(num)) {
                lottoNums.add(num);
            }
        }
    } else {
        // Generate all random numbers
        while(lottoNums.size < size){
            let num = Math.floor(Math.random() * 60) + 1;
            lottoNums.add(num);
        }
    }

    const numArr = Array.from(lottoNums);
    for(let i = 0; i < size; i++){
        document.getElementById(`num${i+1}`).innerHTML = numArr[i];
    }

    // Check if user's numbers match lottery numbers
    let userWins = true;
    for(let i = 0; i < size; i++){
        if (!userNumbers.includes(numArr[i])) {
            userWins = false;
            break;
        }
    }

    // If user wins, increase their money by the bet amount
    if (userWins) {
        userMoney += betAmount;
        alert("Congratulations! You won!");
    } else if (attempts > 1) {
        // If it's the second or subsequent attempt and the user loses, deduct the bet amount from their money
        userMoney -= betAmount;
        if (betAmount >= userMoney) {
            userMoney = 0;
        }
        alert("Sorry, you lost. Please try again.");
        attempts = 0; // Reset attempts counter
    }

    updateMoneyIndicator(); // Update money indicator
}

document.getElementById("placeBetButton").onclick = function(){
    let betAmount = parseInt(document.getElementById("betAmount").value); // Parse bet amount
    if (betAmount > userMoney) {
        alert("You don't have enough money for this bet.");
        return;
    }

    // Disable the bet button after placing the bet
    this.disabled = true;

    // Enable the generate button after placing the bet
    document.getElementById("rollButton").disabled = false;

    // Inform the user that the bet was placed successfully
    alert("Bet placed successfully!");
}

function updateMoneyIndicator() {
    document.getElementById("moneyIndicator").textContent = `Money: $${userMoney}`;
}
