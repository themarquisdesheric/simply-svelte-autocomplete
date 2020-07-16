# Simply Svelte Autocomplete

A lightweight, zero-dependency component that supports theming and incorporating new entries. Built with [SvelteJS](http://svelte.dev/) and a11y (accessibility) in mind ❤️

## Demo 

TODO

## Installation

TODO

## Usage

```
import AutoComplete from 'simply-svelte-autocomplete'

let options = ['Jorge Luis Borges', 'Voltaire', 'Oscar Wilde', 'Julio Cortazar', 'T.S. Eliot']

const handleSubmit = () => { ... }

<Autocomplete {options} onSubmit={handleSubmit} />
```

## Options

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| options | Array | [] | List of autocomplete results to display
| className | String | '' | Container class
| onSubmit | Function | () => {} | Called upon clicking an autocomplete result or hitting the `Enter` key
| themeColor | String | '#333' | Color of chevron icon and highlight background
| highlightTextColor | String | '#FFF' | Highlight text color

## Running Locally

To run this app locally, clone this repository and run `npm run dev`

## Tests

This component is tested with [Jest](https://jestjs.io/). To run tests, run `npm test`

## Contributing

Contributions are always welcome! Open a pull request or file an issue. 
