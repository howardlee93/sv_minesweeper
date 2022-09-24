<script>
    import { onMount } from "svelte";
	import {click} from './util';

	export let difficulty;
	
    let grid;

    const level = 10 
	let bombAmount = 20 //levels[difficulty] * levels[difficulty] - (2 * levels[difficulty])
	console.log(bombAmount); 
	let cells = [];
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

	onMount(()=>{
		createGame();
	})

</script>
	<div id="game_container" bind:this={grid}></div>
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
</style>