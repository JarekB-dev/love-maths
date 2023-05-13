// Wait for the DOM to finish loading before running the Game
// Get the button elements and add event listeners to them

document.addEventListener("DOMContentLoaded", function() {
    let buttons = document.getElementsByTagName("button");

    for (let button of buttons) {
        button.addEventListener("click", function() {
            if (this.getAttribute("data-type") === "submit") {
                checkAnswer();        
            } else {
                let gameType = this.getAttribute("data-type");
                runGame(gameType);
            }
        })
    }

    runGame("addition");
})


/**
 * The main game "loop", called when the script is first loaded
 * after the user's answer has been processed.
 */
function runGame(gameType) {
    // Creates random number between 1 and 25
    let num1 = Math.floor(Math.random() * 25) + 1;
    let num2 = Math.floor(Math.random() * 25) + 1;

    if (gameType === "addition") {
        displayAdditionQuestion(num1, num2);
    } else if (gameType === "multiply") {
				displayMultiplyQuestion(num1, num1);
		} else if (gameType === "subtract") {
			displaySubtractQuestion(num1, num2);
		}	else {
        alert(`Unknown game type: ${gameType}`);
        throw(`Unknown game type ${gameType}. Aborting!`);
    }

}
/**
 * Checks the answer against the first element in
 * the returned calculateCorrectAnswer array
 */
function checkAnswer() {
    let userAnswer = parseInt(document.getElementById('answer-box').value);
    let correctAnswer = calculateCorrectAnswer();
    // let isCorrect = userAnswer === correctAnswer[0];

    // if(isCorrect) {
    //     alert("You got it right!")
    // } else {
    //     alert("You got it wrong!")
    // }
    if (userAnswer === correctAnswer[0]) {
        alert(`Your answer ${userAnswer} is correct!`);
				incrementScore();
    } else {
        alert(`Unfortunately, your answer ${userAnswer} is incorrect. Correct answer is ${correctAnswer[0]}`);
				incrementWrongAnswer();
    }

		runGame(correctAnswer[1]);

}
/**
 * Get the operands (the numbers) and the operator (plus, minus, etc)
 * directly from the DOM and returns the correct answer.
 */
function calculateCorrectAnswer() {
    let operand1 = parseInt(document.getElementById('operand1').innerText);
    let operand2 = parseInt(document.getElementById('operand2').innerText);
    let operator = document.getElementById('operator').innerText;

    if (operator === "+") {
        return [operand1 + operand2, "addition"];
    } else if (operator === "x") {
				return [operand1 * operand2, "multiply"];
		}	else if (operator === "-") {
			return [operand1 - operand2, "subtract"];
		} else {
        alert(`Unimplemented operator ${operator}`);
        throw(`Unimplemented operator ${operator}. Aborting!`);
    }
}
/**
 * Gets the current score from the DOM and increments by 1.
 */
function incrementScore() {
	
	let oldScore = parseInt(document.getElementById('score').innerText);
	document.getElementById('score').innerText = ++oldScore; //oldScore + 1


}
/**
 * Gets the current tally if incorrect answers from the DOM and increments by 1.
 */
function incrementWrongAnswer() {

	let oldScore = parseInt(document.getElementById('incorrect').innerText);
	document.getElementById('incorrect').innerText = ++oldScore; //oldScore + 1
}

function displayAdditionQuestion(operand1, operand2) {

    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = "+";

}

function displaySubtractQuestion(operand1, operand2) {
	document.getElementById('operand1').textContent = operand1 > operand2 ? operand1 : operand2;
	document.getElementById('operand2').textContent = operand1 > operand2 ? operand2 : operand1;
	document.getElementById('operator').textContent = "-";
}

function displayMultiplyQuestion(operand1, operand2) {
	document.getElementById('operand1').textContent = operand1;
	document.getElementById('operand2').textContent = operand2;
	document.getElementById('operator').textContent = "x";
}

