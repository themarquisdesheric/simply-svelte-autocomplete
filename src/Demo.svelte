<script>
  import Autocomplete from './Autocomplete.svelte'

  const tagColors = ['#000', '#3298dc', '#f14668', '#48c774', '#3273dc']
  const searchModifiers = ['books', 'philosophy']
  let options = ['Jorge Luis Borges', 'Voltaire', 'Oscar Wilde', 'Julio Cortazar', 'T.S. Eliot']
  let selectedOptions = []

  const handleSubmit = (selectedValue, category) => {
    if (options.indexOf(selectedValue) === -1) {
      options = [...options, selectedValue]
    }

    if (selectedOptions.indexOf(selectedValue) === -1) {
      selectedOptions = [...selectedOptions, selectedValue]
    }
  }
  
  let singleValueSelectedOption;
</script>


<div class="wrapper">
  <h1>Simply Svelte Autocomplete</h1>
  <small>
    A lightweight, zero-dependency component that supports theming and incorporating new entries
  </small>

  <Autocomplete {options} {searchModifiers} onSubmit={handleSubmit} />

  <div>
    {#each selectedOptions as option, index}
      <button style="background-color: {tagColors[index % 5]}" tabindex="-1" class="tag">
        {option}
      </button>
    {/each}
  </div>

  <h2>It supports theming 😍</h2>

  <Autocomplete
    {options}
    {searchModifiers}
    onSubmit={() => alert("hey that's some sweet theming!")}
    themeColor={tagColors[4]}
  />

  <h2>And also supports binding/persisting single values ✅</h2>

  <Autocomplete
    {options}
    {searchModifiers}
    keepValueOnSubmit
    themeColor={tagColors[4]}
    bind:selectedValue={singleValueSelectedOption}
  />

  {#if singleValueSelectedOption}
    <p>You have selected: {singleValueSelectedOption}!</p>
  {/if}

  <div>
    <img src="github-logo.png" alt="github">
  </div>
  <a
    href="https://github.com/themarquisdesheric/simply-svelte-autocomplete"
    target="_blank"
    rel="noopener noreferrer"
  >
    https://github.com/themarquisdesheric/simply-svelte-autocomplete
  </a>
</div>


<style>
  :global(body) {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 60vh;
    margin: 0;
    color: #333;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
  }
  .wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  small {
    font-style: italic;
    margin-bottom: 2rem;
  }

  .tag {
    border: none;
    border-radius: .25rem;
    color: #fff;
    font-size: .75rem;
    height: 2em;
    line-height: 1.5;
    padding-left: .75em;
    padding-right: .75em;
    white-space: nowrap;
    margin: .5rem .5rem .5rem 0;
  }

  h2 {
    margin: 4rem auto 2rem;
    font-size: 1.125rem;
  }

  div { margin: 2rem 0 .5rem; }

  img { width: 4rem; }
</style>