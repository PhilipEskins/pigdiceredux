function Player (playerType, name, score) {
  this.playerType = playerType;
  this.name = name;
  this.score = score;
}

Player.prototype.calculate = function(total) {
  this.score = total + this.score;
}

// Dice functions
function diceRoll () {
  var random = Math.floor(Math.random() * 6)
  return random+1;
}
function diceCheck (roll1, roll2) {
  if (roll1 === 1 || roll2 === 1) {
    return false;
  } else {
    return true;
  }
}

// AI functions
function aiPlayer(computer) {
  function AIRecords(total, roll) {
    this.total = total;
    this.roll = roll;
  }
  var aiResults = new AIRecords (0, []);
  for (var i = 0; i <= 1; i++) {
    var rollAI = diceRoll();
    var rollCheck = diceCheck(rollAI);
    if (rollCheck === false) {
      aiResults.total = 0;
      aiResults.roll.push(rollAI);
    } else {
      aiResults.roll.push(rollAI);
      aiResults.total += rollAI;
    }
  }
  computer.calculate(aiResults.total);
  return (aiResults);
}

// UI interface beginning
$(document).ready(function() {
  var player1 = new Player("player1", "Billy Bob", 0);
  var player2 = new Player("player2", "Emma Jane", 0);
  var computer = new Player("computer", "Wintermute", 0);
  var total = 0;
  var computerTurn;
  var currentPlayer = "player1"
  $("#player1").text(player1.name);
  $("#player2").text(player2.name);
  $("#computerName").text(computer.name);

  function computerDisplay() {
    for (var k = 0; k < computerTurn.roll.length; k++) {
      if(k === 0) {
        $("#ai-rolls").append(computerTurn.roll[k]);
      } else {
        $("#ai-rolls").append(", " + computerTurn.roll[k] + ", ");
      }
    }
  }
  $("#Play").click(function(event) {
    var playerPick = $("input:radio[name=playerOption]:checked").val();
    if (playerPick === "Solo") {
      $("#singlePlayer").show();
      $("#computer").show();
      $("#buttons").show();
      $("#startScreen").hide();
    } else if (playerPick === "Two") {
      $("#singlePlayer").show();
      $("#secondPlayer").show();
      $("#buttons").show();
      $("#startScreen").hide();
    }
  })

// Rolling UI Logic
if (currentPlayer === "player1") {
  $("#roll").click(function(event) {
        roll = diceRoll();
        var rollCheck = diceCheck(roll);
      $("#player1-results").append(roll + ", ");
      if (rollCheck === false) {
        total=0;
        currentPlayer = "player2";
      } else {
        total += roll;
      }
    })
  $("#hold").click(function(event) {
    player1.calculate(total)
    $("#player1-score").text(player1.score);
    total = 0;
    currentPlayer = "player2"
    console.log(currentPlayer);
  });
}
else if (currentPlayer === "player2") {
  $("#roll").click(function(event) {
        roll = diceRoll();
        var rollCheck = diceCheck(roll);
      $("#player2-results").append(roll + ", ");
      if (rollCheck === false) {
        total=0;
        currentPlayer = "player1";
      } else {
        total += roll;
      }
    })
  $("#hold").click(function(event) {
    player2.calculate(total)
    $("#player2-score").text(player2.score);
    total = 0;
    currentPlayer = "player1"
  });
}
  // computerTurn = aiPlayer(computer);
  // computerDisplay();
  // $("#ai-score").text(computer.score);
  // computerTurn = aiPlayer(computer);
  // computerDisplay();
  // $("#ai-score").text(computer.score);

});
