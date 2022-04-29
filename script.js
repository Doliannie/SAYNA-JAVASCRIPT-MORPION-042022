
var player = "", CPU = "";
let tour = true;


let board = ["", "", "", "", "", "", "", "", ""];

function choixPion(id) {
	if (id == "idX") {
		player = "X";
		CPU = "O"
	} else {
		CPU = "X"
		player = "O"
	}
	document.querySelector(".layer").classList.toggle("d-none");
}

function isempty(id) {
	var choix = document.getElementById(id).textContent;
	if (choix == "") {
		return true;
	} else {
		return false;
	}
}

function updateboard(id, player) {

	let index = parseInt(id[4]) - 1;
	board[index] = player;
}
// Récupération des cases à clicker

const items = document.getElementsByClassName("grid-item");

function choiseCase(id) {
	var choix = document.getElementById(id);
	if (isempty(id)) {
		if (tour == true) {
			choix.textContent = player;
			updateboard(id, player);
			if (verifierboard(player)) {
				afficherResultat(player);
			}
			else {
				if (placeVide().length == 0) {
					afficherResultat("draw ")
				}
				else {
					tour = false;
					setTimeout(cpuTurn, 700)
				}
			}
		}
	}
}

function placeVide() {
	let i,
		empty = [];
	for (i = 0; i < board.length; i++) {
		if (board[i] == "") {
			empty.push(i);
		}
	}
	return empty;
}




function cpuTurn() {
	let emptyPlace = placeVide();
	let move = Math.floor(Math.random() * emptyPlace.length);
	let index = emptyPlace[move];
	let id = "item" + (index + 1);
	document.getElementById(id).textContent = CPU;
	updateboard(id, CPU)
	tour = true;

	if (verifierboard(CPU)) {
		afficherResultat(CPU);
	}
	else {
		if (placeVide().length == 0) {
			afficherResultat("draw")
		}
		else {
			tour = true;
		}
	}
}


//verification de gagnant 
function verifierboard(player) {
	let line = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8]
	];


	colone = [
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8]
	];

	diago = [
		[0, 4, 8],
		[2, 4, 6]
	];
	let win = player.repeat(3), i = 0, now='';

	for (i = 0; i < line.length; i++) {
		now = board[line[i][0]] + board[line[i][1]] + board[line[i][2]]
		if (now == win) {
			return true;
		}
	}

	for (i = 0; i < colone.length; i++) {
		now = board[colone[i][0]] + board[colone[i][1]] + board[colone[i][2]]
		if (now == win) {
			return true;
		}
	}

	for (i = 0; i < diago.length; i++) {
		now = board[diago[i][0]] + board[diago[i][1]] + board[diago[i][2]]
		if (now == win) {
			return true;
		}
	}
	return false;
}


function afficherResultat(result) {
	if (result == player) {
		text = "Win";
	}
	else if (result = CPU) {
		text = "Defeat";
	}
	else {
		text = "Draw";
	}
	document.getElementById("result").textContent = 'text'
	document.querySelector('.layer2').classList.toggle('d-none')
}



// Vide le contenu de toute les cases
function rest() {
	for (var i = 0; i < items.length; i++) {
		items[i].textContent = ''
	}
}

