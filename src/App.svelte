<script>
	import ChevronIcon from './ChevronIcon.svelte'
	import { boldSearchLetters, findMatches } from './utils'

	const options = ['Jorge Luis Borges', 'Voltaire', 'Oscar Wilde', 'Julio Cortazar', 'T.S. Eliot']
	let selectedValue = ''
	let showModal = true
	let highlightIndex = 0

	const handleInput = () => {
		highlightIndex = 0
		showModal = true
	}

	const handleKeyDown = ({ key }) => {
		switch(key) {
			case 'Escape':
				showModal = false
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
					selectedValue = highlightedOption
					showModal = false
				}
				break

			default:
				return
		}
	}

	const highlight = (index) =>
		showResultsList && index === highlightIndex

	$: matches = findMatches(options, selectedValue)
	$: showResultsList = showModal && selectedValue && matches.length
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
				<li class:highlight={showResultsList && index === highlightIndex}>
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
		color: #595959;
    border-radius: 0 0 2px 2px;
		padding-left: 0;
		margin: 0;
		z-index: -1;
	}

	.results-list li { padding: .5rem; }

	:global(.results-list li span) {
		font-weight: bold;
		color: #111;
	}
	
	.highlight,
	:global(.results-list .highlight span) {
		font-weight: normal;
		background: #333;
		color: #fff;
	}

	:global(.svelte-autocomplete svg) {
		width: 1.5rem;
    position: absolute;
    top: .25rem;
    right: .35rem;
	}
</style>
