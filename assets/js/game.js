// Game States
//"WIN" - Player robot has defeated all enemy-robots
  // * Fight all enemy-robots
  // * Defeat each enemy-robot
//"LOSE" -Player robot's health is zero or less

// function to generate a random numeric value
var randomNumber = function(min, max) {
  var value = Math.floor(Math.random() * (max - min +1)) + min;

  return value;
}

// use enemy.Names[enemyInfo.length -1] to return the last element of an array
// console.log(enemyInfo.length);

// fight function
var fight = function(enemy) {
  while(playerInfo.health > 0 && enemy.health > 0) {
  
    // ask player if they'd like to fight or run
    var promptFight = window.prompt('Would you like to FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.');
  
    // if player choses to skip
    if (promptFight === "skip" || promptFight === "SKIP") {
      // confirm player wants to skip
      var confirmSkip = window.confirm("Are you sure you'd like to quit?");

      // if yes (true), leave fight
      if (confirmSkip) {
        window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");
        // subtract money from playerInfo.money for skipping
        playerInfo.money = Math.max(0, playerInfo.money - 10);
        console.log("playerInfo.money", playerInfo.money);
        break;
      }
    }

    // remove enemy's health by subtracting the amount set in the playerInfo.attack variable
    var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);

    enemy.health = Math.max(0, enemy.health - playerInfo.attack);
    console.log(
      playerInfo.name + " attacked " + enemy.Name + ". " + enemy.Name + " now has " + enemy.health + " health remaining."
    );

    // check enemy's health
    if (enemy.health <= 0) {
      window.alert(enemy.Name + " has died!");

      //award player money for winning
      playerInfo.money = playerInfo.money + 20;

      break;
    } else {
      window.alert(enemy.Name + " still has " + enemy.health + " health left.");
    }

    // remove players's health by subtracting the amount set in the enemy.Attack variable
    var damage = randomNumber(enemy.Attack -3, enemy.Attack);
    
    playerInfo.health = Math.max(0, playerInfo.health - enemy.Attack);
    console.log(
      enemy.Name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining."
    );

    // check player's health
    if (playerInfo.health <= 0) {
      window.alert(playerInfo.name + " has died!");
      break;
    } else {
      window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
    }
  } // end of while loop
}; // end of fight function
    
// function to start a new game
var startGame = function() {
  // reset player stats
  playerInfo.reset();

    // run fight function to start game
  for (var i = 0; i < enemyInfo.length; i++) {
    
    // let player know what round they are in, remember that arrays start at 0 so it needs to have 1 added to it
    if (playerInfo.health > 0) {
        window.alert("Welcome to Robot Gladiators! Round " + (i+1));

      // pick new enemy to fight based on the index of the enemy.Names array
      var pickedEnemyObj = enemyInfo [i];

      // reset enemy.health before starting new fight
      pickedEnemyObj.health = randomNumber(40, 60);

      // use debugger to pause script from running and check what's going on at that moment in the code
      // debugger;

      // pass the pickedenemy.Name variable's value into the fight function, where it will assume the value of the enemy.Name parameter
      fight(pickedEnemyObj);

      // if player is still alive and we're not at the last enemy in the array
      if (playerInfo.health> 0 && i < enemyInfo.length - 1){
        var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");

        // if yes, take them to the store() function
        if (storeConfirm) {
          shop();
        }
      }
    } 
    // if player is not alive, break out of the loop and let endGame function run
    else {
      window.alert("You have lost your robot in battle! Game Over!");
      break;
    }
  }

  //play again
  endGame();
};

var endGame = function() {

  //if lpayer is still alive, player wins!
  if (playerInfo.health > 0) {
    window.alert("The game has now ended. Let's see how you did!");
  } else {
    window.alert("You've lost your robot in battle.");
  }


  //ask payer if they'd like to play again
  var playAgainConfirm = window.confirm("Would you liek to play again?");

  if (playAgainConfirm) {
    
    //restart the game
    startGame();
  } else {
    window.alert("Thank you for playing Robot Gladiators! Come back soon!");
  }
};

var shop = function() {
  // ask player what they'd like to do
  var shopOptionPrompt = window.prompt(
    "Would you liek to REFILL your health, UPGRADE your attack, or LEAVE the store? Please entier one: 'REFILL', 'UPGRADE' , or 'Leave' to make a choice."
  );
  
  //use switch case to carry out action
  switch (shopOptionPrompt) {
    case 'REFILL':
    case 'refill':
      playerInfo.refillHealth();
      break;

    case 'UPGRADE':
    case 'upgrade':
      playerInfo.upgradeAttack();
      break;

    case 'LEAVE':
    case 'leave':
      window.alert('Leaving the store.');

      // do nothing, so function will end
      break;
    default:
      window.alert('You did not pick a valid option. Try again.');

      // call shop() again to force player to pick a valid option
      shop();
      break;
  }
};

var playerInfo = {
  name: window.prompt("What is your robot's name?"),
  health: 100,
  attack: 10,
  money: 10,

  reset: function() {
    this.health = 100;
    this.money = 10; 
    this.attack = 10;
  },

  refillHealth: function() {
    if (this.money >= 7) {
      window.alert("Refilling player's health by 20 for 7 dollars.")
    
    this.health += 20;
    this.money-= 7;
    } else {
        window.alert("You don't have enough money!")
    }
},

  upgradeAttack: function() {
    if (this.money >= 7) {
      window.alert("Upgrading player's attack by 6 for 7 dollars.")
    
    this.attack += 6;
    this.money -= 7;
    } else {
      window.alert("You don't have enough money!");
    }
  }
};

// console.log(playerInfo.name, playerInfo.attack, playerInfo.health);

var enemyInfo = [
  {
    name: "Roberto",
    attack: randomNumber(10, 14)
  },
  {
    name: "Amy Android",
    attack: randomNumber(10, 14)
  },
  {
    name: "Robo Trumble",
    attack: randomNumber(10, 14)
  }
];

console.log(enemyInfo);
console.log(enemyInfo[0]);
console.log(enemyInfo[0].name);
console.log(enemyInfo[0]['attck']);