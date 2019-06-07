const blocksTall = 50;
const blocksWide = 50;
function setLevel() {
  //   camera.position.levelPadding+=levelPadding-checkpoint[1]*blockWidth;
  //   camera.position.y-=y-checkpoint[0]*blockHeight;
  currentLevel = [];
  for (g = 0; g < blocksTall; g++) {
    currentLevel.push([]);
    for (u = 0; u < blocksWide; u++) {
      if (Math.floor(Math.random() * 3) == 0) {
        currentLevel[g].push(1);
      } else if (Math.floor(Math.random() * 50) == 1) {
        currentLevel[g].push(2);
      } else if (Math.floor(Math.random() * 60) == 1) {
        currentLevel[g].push(3);
      } else if (Math.floor(Math.random()*50)==1){
        currentLevel[g].push(7);
      } else {
        currentLevel[g].push(0);
      }
    }
  }
  
  //   makeRect("rgba(255,255,255,0.8)",[0,150,500,100])
  //   televelPaddingtCtlevelPadding.fillStyle="#000000"
  //     televelPaddingtCtlevelPadding.font="40plevelPadding Georgia";
  // televelPaddingtCtlevelPadding.fillTelevelPaddingt("Press 'R' to start.",100,210);
}
function renderLevel() {
  for (i = 0; i < blocksTall; i++) {
    for (e = 0; e < blocksWide; e++) {
      document.getElementById(i + "," + e).style.backgroundColor = ["white", "black", "#66AAFF", "red", "yellow", "yellow", "yellow", "yellow"][currentLevel[i][e]];
    }
  }
}
function makeTable() {
  let myTable = document.createElement("table");
  myTable.id = "grid";
  for (i = 0; i < blocksTall; i++) {
    let currentThing = document.createElement("tr");
    for (e = 0; e < blocksWide; e++) {
      let currentTile = document.createElement("td");
      currentTile.id = i + "," + e;
      currentTile.width = 10;
      currentTile.height = 10;
      currentTile.onclick=()=>{alert(currentTile.id)};
      currentThing.appendChild(currentTile);
    }
    myTable.appendChild(currentThing);
  }
  document.getElementById("heyy").appendChild(myTable);
}
function count(item, array) {
  return [0].concat(array).reduce((total, nelevelPaddingt) => {
    if (nelevelPaddingt == item) {
      return total + 1;
    }
    else {
      return total;
    }
  })
};
levelPadding=1;
minStone=2;
maxStone=5;
a=document.getElementById("minStone");
b=document.getElementById("maxStone");
minCoin=document.getElementById("minCoin");
function runCavingCycle() {
  minStone=a.value;
  maxStone=b.value;
  let newLevel = JSON.parse(JSON.stringify(currentLevel));//Just for testing for aliasing
  let m=0;
  let newRow = [[levelPadding].concat(currentLevel[0].map(i => {m++;return m<25&&levelPadding})).concat([levelPadding])];
  // for(m=23;m<28;m++){
  //   console.log(newRow.length,"ha ha")
  //   console.log(newRow[m])
  //   newRow[m]=0;
  // }
  let oldLevel = newRow.concat(currentLevel.map(m => [levelPadding].concat(m).concat([levelPadding]))).concat(newRow);
  for (i=0;i<newLevel.length;i++) {
    for (e=0;e<newLevel[i].length;e++) {
      let thisNum = oldLevel[i+1][e+1];
      let adjacents = [oldLevel[i][e+1], oldLevel[i+1][e + 2], oldLevel[i + 2][e+1], oldLevel[i][e+1]];
      let neighbors=[oldLevel[i][e],oldLevel[i][e+1],oldLevel[i][e+2],oldLevel[i+1][e],oldLevel[i+1][e+2],oldLevel[i+2][e],oldLevel[i+2][e+1],oldLevel[i+2][e+2]]
      let total = {
        stones: count(1, neighbors),
        lava: count(3, neighbors),
        water: count(2, neighbors),
        coins: count(7, neighbors),
        air:count(0,neighbors),
      };
      //Air
      if (thisNum == 0) {
        if (total.stones >= maxStone) {
          newLevel[i][e] = 1;
        }
        else if (adjacents[0] == 3) {
          newLevel[i][e]=3;
        }
        else if (adjacents[0] == 2) {
          newLevel[i][e]=2;
        }
      }
      //Stone
      else if (thisNum == 1) {
        if (total.stones <=minStone) {
          newLevel[i][e] = 0;
        }
        else if (adjacents[2] == 3&&oldLevel[i+3][e+1]==1&&oldLevel[i+2][e]==1&&oldLevel[i+2][e+2]==1) {
          newLevel[i][e] = 3;
        }
        else if (total.lava >= 6) {
          newLevel[i][e] = 3;
        }
      }
      //Water
      else if(thisNum==2){
        if(count(3,adjacents)>0){
          newLevel[i][e]=1;
        }
        else if (adjacents[2] == 0&&count(1,adjacents)<=2) {
          newLevel[i][e] = 0;
        }
        else if(adjacents[2]==2&&count(1,adjacents)<=2){
          newLevel[i][e]=0;
        }
      }
      //Lava
      else if (thisNum == 3) {
        if (count(2,adjacents) >0) {
          newLevel[i][e] = 1;
        }
        else if (adjacents[2] == 0&&count(1,adjacents)<=2) {
          newLevel[i][e] = 0;
        }
        else if(count(1,adjacents)==4){
          newLevel[i][e]=1;
        }
        else if(adjacents[2]==3&&count(1,adjacents)<=2){
          newLevel[i][e]=0;
        }
      }
      //Coins
      else if(thisNum == 7) {
        if(total.coins<=2) {
          if(count(1,adjacents)>=minCoin.value){
            newLevel[i][e]=1;
          } else if (adjacents[0]==3) {
            newLevel[i][e]=3;
          }
        }
      }
    }
  }
  currentLevel = newLevel;
  currentLevel[Math.floor(blocksWide / 2)][Math.floor(blocksTall / 2)] = 0;
  currentLevel[Math.floor(blocksWide / 2)][Math.floor(blocksTall / 2) + 1] = 0;
  currentLevel[Math.floor(blocksWide / 2)][Math.floor(blocksTall / 2) - 1] = 0;
  currentLevel[Math.floor(blocksWide / 2) - 1][Math.floor(blocksTall / 2)] = 0;
  currentLevel[Math.floor(blocksWide / 2) - 1][
    Math.floor(blocksTall / 2) + 1
  ] = 0;
  currentLevel[Math.floor(blocksWide / 2) - 1][
    Math.floor(blocksTall / 2) - 1
  ] = 0;
  currentLevel[Math.floor(blocksWide / 2) + 1][Math.floor(blocksTall / 2)] = 1;
  currentLevel[Math.floor(blocksWide / 2) + 1][
    Math.floor(blocksTall / 2) + 1
  ] = 1;
  currentLevel[Math.floor(blocksWide / 2) + 1][
    Math.floor(blocksTall / 2) - 1
  ] = 1; //clear the area around the player, give them a place to stand
}
function doCycles(num_cycles, delay) {
  if (num_cycles>0) {
    runCavingCycle();
    renderLevel();
    hello = setTimeout((i) => { doCycles(num_cycles - 1, delay) }, delay)
  }else{hello=null;document.getElementById("toggleSim").style.display="inline";}
}

function dataToArray(data) {
	newArray = [];
	allStuff = data.split(',');
	for (i in allStuff) {
		newArray.push([]);
		for (e in allStuff[i]) {
			newArray[i].push(parseInt(allStuff[i][e]));
		}
	}
	return newArray;
}

function arrayToData(array){
  newData="";
  firstStep=[];
  for(i in array){
    firstStep.push(array[i].join(""));
  }
  newData=firstStep.join(",");
  return newData;
}

function subForm(){
  document.f.data.value=arrayToData(currentLevel);
  document.getElementById("submit").click();
}

