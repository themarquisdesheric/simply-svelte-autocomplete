<script>
	import ChevronIcon from './ChevronIcon.svelte'
	import { boldSearchLetters, findMatches } from './utils'

	const options = ['Jorge Luis Borges', 'Rene Voltaire', 'Oscar Wilde', 'Julio Cortazar', 'T.S. Eliot']
	let selectedValue = ''

	$: matches = findMatches(options, selectedValue)
</script>


<div class="svelte-autocomplete">
	<input bind:value={selectedValue} />
	<ChevronIcon />

	{#if selectedValue && matches.length}
		<ul class="results-list">
			{#each matches as match (match)}
				<li>
					{@html boldSearchLetters(match, selectedValue)}
				</li>
			{/each}
		</ul>
	{/if}
</div>


<style>
	.svelte-autocomplete { position: relative; }
	
	input {
		height: 2.25rem;
    min-width: 200px;
    padding: .25rem .5rem;
		font-size: 1rem;
		color: #333;
	}

	.results-list {
    width: calc(100% - 2px);
		position: absolute;
    left: 1px;
    top: 35px;
		list-style-type: none;
		border: 1px solid #333;
    border-radius: 0 0 2px 2px;
    padding: .5rem;
		margin: 0;
		z-index: -1;
	}

	.results-list li:not(:last-child) { padding-bottom: .5rem; }

	:global(.results-list li span) {
		font-weight: bold;
		color: #111;
	}

	:global(.svelte-autocomplete svg) {
		width: 1.5rem;
    position: absolute;
    top: .25rem;
    right: .35rem;
	}
</style>
