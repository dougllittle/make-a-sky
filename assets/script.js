var generate = document.querySelector(".grid-outer-button[name=generate]");
generate.addEventListener("click",generateRange);

function generateRange(e){
  
  document.querySelector(".grid-inner").innerHTML = "";
  
  //grid is 128 by 32 ; create fragment cuz it's faster.
  var c = document.createDocumentFragment();
  for(var i=0;i<4096;i++){
    baby = document.createElement("div");
    baby.classList.add("cell");
    baby.classList.add("sky");
    appendBaby = c.appendChild(baby);
  }

  document.querySelector(".grid-inner").appendChild(c);
  var cells = document.querySelectorAll(".cell");
  
  for(var t=0;t<cells.length;t++){
    flagClouds(cells[t],t);
  }

  function flagClouds(cell,index){
    // Each cell has 8 'neighbors' that come before and after it. Flag the center of the cloud.
    var next = cells[ (index + 1) % cells.length];
    var prev = cells[ (index - 1) % cells.length];
    var top = cells[ (index - 128) % cells.length];
    var topleft = cells[ (index - 129) % cells.length];
    var topright = cells[ (index - 127) % cells.length];
    var bottom = cells[ (index + 128) % cells.length];
    var bottomleft = cells[ (index + 127) % cells.length];
    var bottomright = cells[ (index + 129) % cells.length];
    var neighbors = [next,prev,top,topleft,topright,bottom,bottomleft,bottomright];
    // make flagging of cloud less likely to happen towards the horizon. Pass flagged and neighbors
    if(cell.classList.contains("sky") && ((Math.random()) + (index/10000)) < .4){
      cell.classList.add("cloud");
      cell.style.background="white";
      return makeClouds(cell,index,neighbors);
    }
  }
  
  function makeClouds(cell,index,neighbors){
    var cloudCluster = 0;
    // if two flagged clouds are neighbors, we got a cluster going.
    for(var i=0; i<neighbors.length;i++){
      if(neighbors[i] == null){
      } else if (neighbors[i].classList.contains("cloud")){
        cloudCluster++;
      }
    };
    // turn all neighbors of confirmed cluster into cloud. Otherwise turn into sky.
    if(cloudCluster >= 1){
      for(var x=0; x<neighbors.length;x++){
        if(neighbors[x] == null){
        } else {
        neighbors[x].style.background = "white";
        }
      }
    } else {
      for(var t=0; t<neighbors.length;t++){
        if(neighbors[t] == null){
        } else{
        cell.style.background = "#87ceeb";
        neighbors[t].style.background = "#87ceeb";
        }
       }
     }
   }
}

var flash = document.querySelector(".grid-outer-button[name=flash]");
flash.addEventListener("click",startFlash);
var interval;

function startFlash(e){
  interval = setInterval(generateRange,300);
  flash.innerText = "Stop Flash";
  flash.removeEventListener("click", startFlash);
  flash.addEventListener("click", stopFlash);
}

function stopFlash(e){
  clearInterval(interval);
  flash.innerText = "Start Flash";
  flash.removeEventListener("click", stopFlash);
  flash.addEventListener("click", startFlash);
}
