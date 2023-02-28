let number = 1;
let code = [];
let numberp2 = 1;
let codep2 = [];

code.lenght = 0;
codep2.lenght = 0;

function insert(object){
        document.getElementById('socket' + number).className = "socket" + " " + object.id;
        code[number-1] = object.value;
        number++;
        if(number === 5){
            nextCode();
        }
    }

function deleteLast() {
    if (number !== 0 && number !== 5) {
      number--;
      document.getElementById('socket' + number).className = "socket";
      code[number] = '';
    }
  }



function nextCode(){
    document.getElementById("guesses").style.visibility = "hidden";
}
function nextCodep2(){
    document.getElementById("guessesp2").style.visibility = "hidden";
}



function insertp2(object){
    document.getElementById('socketp2' + numberp2).className = "socketp2" + " " + object.id;
    codep2[numberp2-1] = object.value;
    numberp2++;
    if(numberp2 === 5){
        nextCodep2();
    }
}

function deleteLastp2() {
    if (numberp2 !== 0 && numberp2 !== 5) {
      numberp2--;
      document.getElementById('socketp2' + numberp2).className = "socketp2";
      codep2[numberp2] = '';
    }
  }


function check(){
    if(code.lenght < 4 || codep2.lenght < 4){
	document.getElementById("buttonStart").style.pointerEvents="none";
        document.getElementById("buttonStart").style.cursor="default";

}
    else{
	document.getElementById("buttonStart").style.pointerEvents="auto";
        document.getElementById("buttonStart").style.cursor="pointer";
}

}


function save(){
    localStorage.setItem('myStorage1', JSON.stringify(code));
    localStorage.setItem('myStorage2', JSON.stringify(codep2));
    document.getElementById("buttonStart").style.display = "block";  
}


