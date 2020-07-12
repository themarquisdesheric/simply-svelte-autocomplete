<script>
  import Autocomplete from './Autocomplete.svelte'
  import ChevronIcon from './ChevronIcon.svelte'

  const tagColors = ['#000', '#3298dc', '#f14668', '#48c774', '#3273dc']
  let options = ['Jorge Luis Borges', 'Voltaire', 'Oscar Wilde', 'Julio Cortazar', 'T.S. Eliot']
  let selectedValue = ''
  let selectedOptions = []

  const handleSubmit = () => {
    if (options.indexOf(selectedValue) === -1) {
      options = [...options, selectedValue]
    }

    if (selectedOptions.indexOf(selectedValue) === -1) {
      selectedOptions = [...selectedOptions, selectedValue]
    }
  }
</script>

<div class="wrapper">
  <h1>Simply Svelte Autocomplete</h1>
  <small>
    A lightweight, zero-dependency component that supports theming and incorporating new entries
  </small>

  <p>selectedValue: {selectedValue}</p>

  <Autocomplete
    {options}
    bind:selectedValue
    onSubmit={handleSubmit}
  />

  <div>
    {#each selectedOptions as option, index}
      <button style="background-color: {tagColors[index % 5]}" class="tag">
        {option}
      </button>
    {/each}
  </div>
</div>

<style>
  .wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  small {
    font-style: italic;
    margin-bottom: 2rem;
  }

  p { text-align: center; }

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
</style>