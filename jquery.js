var playing = false;
var score;
var trialsleft;
var step;
var action; //used for setInterval
var fruits = ['apple', 'banana', 'cherry', 'grapes', 'kiwi', 'lemon', 'mango', 'orange', 'peach', 'pear', 'pineapple', 'raspberry', 'strawberry', 'watermelon'];
 
 $(function() {

 	//click on start reset button
 	$("#startreset").click(function() {

 		//we are playing
 		if(playing == true) { //yes
 			//reload page
 			location.reload();
 		}else{
 			//we are not playing
 			playing = true; //game initiated
 			
 			score = 0; //set score to 0
 			$("#scorevalue").html(score); //no

 			//show trials left
 			$("#trialsleft").show();
 			
 			trialsLeft = 20;
 			addHearts();


 			//change button text to "reset game"
 			$("#startreset").html("Reset Game");

 			//start sending fruits
 			startAction();
 		}
 	});
 
$("#fruit1").mouseover(function() {
	score++;
	$("#scorevalue").html(score); //update score
	
	//document.getElementById("slicesound").play();
	$("#slicesound")[0].play(); //played sound

	//stop fruit and hide it
	clearInterval(action);

	//hide fruit
	$("#fruit1").hide("explode", 500); //slice and explode fruit


	//send new fruit
	setTimeout(startAction, 550);

});

//All other functions

function addHearts() {

	$("#trialsLeft").empty();
	for(i = 0; i < trialsLeft; i++){
 		$("#trialsLeft").append('<img src="images/heart.png" class="life">');
	}
}

//start sending fruits

function startAction() {

	//generate a fruit

	$("#fruit1").show();
	chooseFruit(); //choose a random fruit
	$("#fruit1").css( {'left' : Math.round(550*Math.random()), 'top' : -50 });
//random positiion

	//generate a random step
	step = 1+ Math.round(5*Math.random()); //change step

	//move fruit down by one step every 10ms
	action = setInterval(function() {

		//move fruit down by one step 
		$("#fruit1").css('top',
			$("#fruit1").position().top + step);

		//check if the fruit is too low
		if($("#fruit1").position().top > $("#fruitsContainer").height()) {
				//check if we have trials left
		if(trialsLeft > 1) {

			//generate a fruit
			$("#fruit1").show();
			chooseFruit(); //choose a random fruit
			$("#fruit1").css( {'life' : Math.round(550*Math.random()), 'top' : -50 });
		//random positiion

			//generate a random step
			step = 1+ Math.round(5*Math.random()); //change step

			//reduce trials by one
			trialsLeft--;

			//populate trialsLeft box
			addHearts();

			}else { //game over
				playing = false; //we are not playing anymore

				$("#startreset").html("Start Game"); //Change button to Start Game
				$("#gameOver").show();
				$("#gameOver").html('<p>Game Over!</p><p>Your score is ' + score + '</p>'); //no: show game over
				$("#trialsLeft").hide(); 
				stopAction();
			}
		}	
	}, 10);
}
//generate a random fruit

function chooseFruit(){
	$("#fruit1").attr('src', 'images/' + fruits[Math.round(13*Math.random())] + '.png');
}

//Stop dropping fruits

function stopAction() {
	clearInterval(action);
	$("#fruit1").hide();
}

});