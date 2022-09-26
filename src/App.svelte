<script>
	import Grid from './Grid.svelte';
	let difficulty = 'easy';
	let options = [
		'easy',
		'medium',
		'hard'
	]

	$:difficulty;

</script>

<main>
	<body>
		<header>
			<h2>Minesweeper</h2>
			<button id='newgame' onClick="window.location.reload();">Reload</button>
		</header>
			<label for="difficulty">Difficulty level</label>
			<select name="difficulty" id="level" bind:value={difficulty} >
				{#each options as value}<option {value}>{value}</option>{/each}
			</select>
		<Grid bind:difficulty={difficulty}/>
		<!-- <div id="status"></div> -->
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
	.bomb > span{
		padding: 9px;
		display: inline-flex;
	}

</style>