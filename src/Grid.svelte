<script>
	import {level, levels} from './constant';

	export let difficulty;
	let grid;
	let status;
	let cells =[];
	$: bombAmount = levels[difficulty] * levels[difficulty] - (2 * levels[difficulty]);
	let isGameOver = false;
	let flags = 0;

    function createGame(){
		const bombs = Array(bombAmount).fill('B');
		const empty =  Array(level * level - bombAmount).fill('V');
		const game = empty.concat(bombs);
		const shuffleGame = game.sort(()=> Math.random() - 0.5);

		for (let i = 0; i < level * level; i++){
			const cell = document.createElement('div');
			cell.setAttribute('id',i);
			cell.classList.add(shuffleGame[i]);
			grid.appendChild(cell);
			cells.push(cell);

			//add click listener
			cell.addEventListener('click', (e)=>{
				click(cell);
			});
			//add flag click
			cell.oncontextmenu = (e)=>{
				e.preventDefault();
				addFlag(cell);
			}
		};

		//add nums
		for (let i =0; i < cells.length; i++){
			let total = 0;
			const left = (i % level === 0);
			const right = (i % level ===  level - 1);
			if (cells[i].classList.contains('V')){
				if (i > 0 && !left && cells[i-1].classList.contains('B')) total++// left;
				if (i > 9 && !right && cells[i + 1 - level].classList.contains('B')) total++;
				if (i > 10 && cells[i - level].classList.contains('B')) total ++;
				if (i >11 && !left && cells[i - 1 - level].classList.contains('B')) total++;
				if (i < 98 && !right && cells[i+1].classList.contains('B')) total++;
				if (i < 90 && !left && cells[i - 1 +level].classList.contains('B')) total++;
				if (i < 88 && cells[i + 1 + level].classList.contains('B')) total++;
				if (i <89 && cells[i + level].classList.contains('B')) total++;
				cells[i].setAttribute('data', total)
			}
		}

	}
	function click(cell){
		let current = cell.id;
		if (isGameOver) return;
		if (cell.classList.contains('checked') || cell.classList.contains( 'F')){
			return;
		}
		if (cell.classList.contains('B')){
			gameOver(cell);
		}else{
			let total = cell.getAttribute('data');
			if (total != 0){
				cell.classList.add('checked');
				cell.innerHTML = "<span>" +total +"</span>";
				return;
			}
			checkCell(current);
		}
		cell.classList.add('checked');
	};

	function checkCell( currentId){
		const left = (currentId % level === 0);
		const right = (currentId % level ===  level - 1);

		setTimeout(()=>{
			if (currentId > 0 && !left){
				const newId = cells[parseInt(currentId) -1].id;
				const newCell = document.getElementById(newId);
				click(newCell);
			}

			if (currentId > 9 && !right){
				const newId = cells[parseInt(currentId) +1 - level].id;
				const newCell = document.getElementById(newId);
				click(newCell);
			}

			if (currentId > 10){
				const newId = cells[parseInt(currentId)  - level].id;
				const newCell = document.getElementById(newId);
				click(newCell);
			}


			if (currentId > 11 && !left){
				const newId = cells[parseInt(currentId)  -1 - level].id;
				const newCell = document.getElementById(newId);
				click(newCell);
			}


			if (currentId < 99 && !right){
				const newId = cells[parseInt(currentId) +1].id;
				const newCell = document.getElementById(newId);
				click(newCell);
			}

			if (currentId < 90 && !left){
				const newId = cells[parseInt(currentId)  -1 +level].id;
				const newCell = document.getElementById(newId);
				click(newCell);
			}

			if (currentId < 88 && !right){
				const newId = cells[parseInt(currentId) +1 + level].id;
				const newCell = document.getElementById(newId);
				click(newCell);
			}

			if (currentId < 89){
				const newId = cells[parseInt(currentId) + level].id;
				const newCell = document.getElementById(newId);
				click(newCell);
			}

		},10)
	}

	function addFlag(cell){
		if (isGameOver) return;
		if (!cell.classList.contains('checked') && flags < bombAmount){
			if(!cell.classList.contains('F')){
				//add flag
				cell.classList.add('F');
				cell.innerHTML = '<span>F</span>';
				flags++;
				checkWin();
			}else{
				cell.classList.remove('F');
				cell.innerHTML = '';
				flags--;
			}
		}
	};


	function gameOver(){
		status.innerHTML = 'Game over';
		isGameOver = true;
		
		cells.forEach(cell =>{
			if (cell.classList.contains('B')){
				cell.innerHTML = 'B';
			}
		})
	}

	function checkWin(){
		let matches = 0;
		for (let i = 0; i < cells.length; i++){
			if (cells[i].classList.contains('F') && cells[i].classList.contains('B')) matches++;
		}
		if (matches === bombAmount){
			status.innerHTML = "You Won!";
			isGameOver = true;
		}
	}

	$:if (grid && difficulty){
		status.innerHTML = '';		
		grid.textContent = '';
		isGameOver = false;
		cells =[];
		flags = 0;
		createGame();
	}


</script>

<div id="game_container" bind:this={grid}></div>
<div id="status" bind:this={status}></div>

<style>
	#game_container{
		height: 400px;
		width: 400px;
		display: flex;
		margin: 0px auto;
		flex-wrap: wrap;
		background-color: rgb(230, 227, 227);
		-webkit-user-select: none;
		-khtml-user-select: none;
		-moz-user-select: -moz-none;
		-o-user-select: none;
		user-select: none;
	}

	#game_container :global(div){
		height: 38px;
		width: 38px;
		border:1px solid #eee;
	}
	#status
	{
		margin-top:20px;
		text-align: center;
		color: orange;
		font-size: xx-large;
	}
	.checked {
		background-color: #add8e6;
	}
	.checked > span{
		padding: 9px 14px;
		display: inline-flex;
		font-size: large;
		color: #eee;
	}
</style>