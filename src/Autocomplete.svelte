<script>
	import ChevronIcon from './ChevronIcon.svelte'
	import { boldSearchTerm, findMatches } from './utils'

	export let options = []
	export let searchModifiers = []
	let results = [...options, ...searchModifiers]
	let searchModifier = ''
	let inputRef
		
	export let className = ''
	export let onSubmit = () => {}
	export let themeColor = '#333'
	export let highlightTextColor = '#fff'
	
	let showAutocompleteResults = false
	let highlightIndex = 0
	let selectedValue = ''

	const showResults = () => {
		highlightIndex = 0
		showAutocompleteResults = true
	}

	const hideResults = () =>
		showAutocompleteResults = false
	
	const removeSearchModifier = () => {
		searchModifier = ''
		inputRef.focus()
	}

	const handleInput = () => {
		if (!searchModifier) {
			showResults()
		}
	}

	const handleKeyDown = ({ key }) => {
		switch(key) {
			case 'Escape':
				hideResults()
				break

			case 'ArrowUp':
				if (showAutocompleteResults && highlightIndex === 0) {
					highlightIndex = matches.length - 1
				} else {
					highlightIndex -= 1
				}
				break

			case 'ArrowDown':
				if (!selectedValue && !showAutocompleteResults) {
					showResults()
					break
				}

				if (showAutocompleteResults && highlightIndex === matches.length - 1) {
					highlightIndex = 0
				} else {
					highlightIndex += 1
				}
				break
			case 'Tab':
				hideResults()
				break

			case 'Enter':
				const highlightedOption = matches[highlightIndex]
				const value = highlightedOption || selectedValue

				handleSubmit(value)
				break
			case 'Backspace':
				if (!selectedValue) {
					removeSearchModifier()
				}
				break
				
			default:
				return
		}
	}

	const handleSubmit = (value) => {
		if (!value) return

		if (searchModifiers.includes(value)) {
			searchModifier = value
		} else {
			onSubmit(value, searchModifier)
		}
		
		selectedValue = ''
		hideResults()
	}

	const highlight = (index) =>
		index === highlightIndex

	$: matches = findMatches(results, selectedValue)
</script>


<div
	class="svelte-autocomplete {className}"
	style="--theme: {themeColor};
				 --highlightTextColor: {highlightTextColor};"
>
	<input
		bind:value={selectedValue}
		bind:this={inputRef}
		on:keydown={handleKeyDown}
		on:input={handleInput}
		on:click={showResults}
		class:modified-search={searchModifier}
	/>
	<ChevronIcon />
	<span
		class="search-modifier"
		class:hidden={!searchModifier}
		on:click={removeSearchModifier}
	>
		{searchModifier}
	</span>

	{#if !searchModifier}
		<div
			class:showAutocompleteResults
			class="svelte-autocomplete-results-container"
			aria-hidden={showAutocompleteResults}
			autocapitalize="none"
			autocomplete="off"
			aria-autocomplete="list"
			role="combobox"
			aria-expanded={showAutocompleteResults}
		>
			<div class="click-catcher" on:click={hideResults} />
			<ul class="results-list" class:border-none={!matches.length}>
				{#each matches as match, index (match)}
					{#if index === options.length}<hr />{/if}
					<li
						on:click={() => handleSubmit(match)}
						class:highlight={index === highlightIndex}
						aria-selected={index === highlightIndex}
						aria-label={match}
						role="option"
					>
						{#if index >= options.length || searchModifiers.includes(match)}
							Search: 
						{/if}
						{@html boldSearchTerm(match, selectedValue)}
					</li>
				{/each}
			</ul>
		</div>
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

	input.modified-search { padding-left: 3.5rem; }

	input,
	.results-list { border: 1px solid #dbdbdb; }

	.search-modifier {
		position: absolute;
    left: .25rem;
    top: .25rem;
    height: calc(100% - .5rem);
    display: flex;
    align-items: center;
    padding: .25rem;
    border-radius: 3px;
		background-color: var(--theme);
		color: var(--highlightTextColor);
    font-size: 14px;
	}

	.search-modifier.hidden { display: none; }

	.svelte-autocomplete-results-container { display: none; }

	.svelte-autocomplete-results-container.showAutocompleteResults { display: block; }

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
		text-align: left;
	}

	.results-list.border-none { border: none; }

	hr { margin: 0; }

	.click-catcher {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}

	.results-list li {
		padding: .5rem;
		user-select: none;
	}

	:global(.results-list li span) {
		font-weight: bold;
		color: #111;
	}
	
	.highlight,
	.results-list li:hover,
	:global(.results-list li:hover span),
	:global(.results-list .highlight span) {
		background: var(--theme);
		color: var(--highlightTextColor);
		font-weight: normal;
	}

	:global(.svelte-autocomplete svg) {
		width: 1.5rem;
    position: absolute;
    top: .25rem;
		right: .35rem;
		fill: var(--theme);
	}
</style>
