<script>
	import ChevronIcon from './ChevronIcon.svelte'
	import { boldSearchTerm, findMatches } from './utils'

	const options = ['Jorge Luis Borges', 'Voltaire', 'Oscar Wilde', 'Julio Cortazar', 'T.S. Eliot']
	export let onSubmit = () => {}
	export let selectedValue = ''
	export let showResults = true
	let highlightIndex = 0

	const handleInput = () => {
		highlightIndex = 0
		showResults = true
	}

	const handleKeyDown = ({ key }) => {
		switch(key) {
			case 'Escape':
				showResults = false
				break

			case 'ArrowUp':
				if (
					showResultsList &&
					highlightIndex === 0
				) {
					highlightIndex = matches.length - 1
				} else {
					highlightIndex -= 1
				}
				break

			case 'ArrowDown':
				if (
					showResultsList &&
					highlightIndex === matches.length - 1
				) {
					highlightIndex = 0
				} else {
					highlightIndex += 1
				}
				break

			case 'Enter':
				const highlightedOption = matches[highlightIndex]

				if (highlightedOption) {
					selectValue(highlightedOption)
				} else {
					onSubmit(selectedValue)
				}
				break
				
			default:
				return
		}
	}
			
	const selectValue = (value) => {
		selectedValue = value
		showResults = false

		onSubmit(selectedValue)
	}

	const highlight = (index) =>
		showResultsList && index === highlightIndex

	$: matches = findMatches(options, selectedValue)
	$: showResultsList = showResults && selectedValue && matches.length
</script>


<div class="svelte-autocomplete">
	<input
		bind:value={selectedValue}
		on:keydown={handleKeyDown}
		on:input={handleInput}
	/>
	<ChevronIcon />

	{#if showResultsList}
		<ul class="results-list">
			{#each matches as match, index (match)}
				<li
					on:click={() => selectValue(match)}
					class:highlight={showResultsList && index === highlightIndex}
				>
					{@html boldSearchTerm(match, selectedValue)}
				</li>
			{/each}
		</ul>
	{/if}
</div>


<style>
	.svelte-autocomplete {
		display: inline-block;
		position: relative;
	}
	
	input {
		height: 2.25rem;
    min-width: 200px;
    padding: .25rem .5rem;
		font-size: 1rem;
		color: #333;
		border-radius: .25rem;
    box-shadow: inset 0 1px 2px rgba(10, 10, 10, 0.1);
	}

	input,
	.results-list { border: 1px solid #dbdbdb; }

	.results-list {
    width: calc(100% - 2px);
		position: absolute;
    left: 1px;
    top: 35px;
		list-style-type: none;
		background-color: #fff;
		color: #595959;
    border-radius: 0 0 2px 2px;
		padding-left: 0;
		margin: 0;
		z-index: 10;
	}

	.results-list li { padding: .5rem; }

	:global(.results-list li span) {
		font-weight: bold;
		color: #111;
	}
	
	.highlight,
	.results-list li:hover,
	:global(.results-list li:hover span),
	:global(.results-list .highlight span) {
		background: #333;
		color: #fff;
		font-weight: normal;
	}

	:global(.svelte-autocomplete svg) {
		width: 1.5rem;
    position: absolute;
    top: .25rem;
    right: .35rem;
	}
</style>
