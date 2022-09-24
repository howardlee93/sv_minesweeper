<script>
	import Grid from './Grid.svelte';

	let difficulty;

	const onChange =(e)=>{
		// difficulty = e.value;
		console.log(difficulty)

	}


</script>

<main>
	<body>
		<header>
			<h2>Minesweeper</h2>
			<button id='newgame' onClick="window.location.reload();">Reload</button>
		</header>
			<label for="difficulty">Difficulty level</label>
			<select name="difficulty" id="level" bind:value={difficulty} on:change={onChange}>
				<option value="easy">Easy</option>
				<option value="medium">Medium</option>
				<option value="hard">Hard</option>
			</select>
		<Grid {difficulty}/>
		<div id="status"></div>
	</body>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}

	body, html
	{
	padding: 1rem;  
	}



	#status
	{
		margin-top:20px;
		text-align: center;
		color: orange;
		font-size: xx-large;
	}

	.bomb > span{
		padding: 9px;
		display: inline-flex;
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