# Simply Svelte Autocomplete

A lightweight, zero-dependency component that supports theming and incorporating new entries. Built with [SvelteJS](http://svelte.dev/) and a11y in mind ❤️

## Demo 

Check out the live demo at [simply-svelte-autocomplete.surge.sh](https://simply-svelte-autocomplete.surge.sh/)

[Demo code](https://github.com/themarquisdesheric/simply-svelte-autocomplete/blob/master/src/Demo.svelte)

## Installation

`npm install simply-svelte-autocomplete`

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
| searchModifiers | Array | [] | Used to restrict searches to a specific category
| className | String | '' | Container class
| onSubmit | Function | () => {} | Called upon clicking an autocomplete result or hitting the `Enter` key
| themeColor | String | '#333' | Color of chevron icon and highlight background
| highlightTextColor | String | '#FFF' | Highlight text color

Note: `options` and `searchModifiers` only accept strings. This is *simply* svelte, with a side of simple.

## a11y (accessibility)

Though the component includes ARIA information, tabbed result navigation needs to be implemented for the component to be truly accessible. 

## Running Locally

To run this app locally, clone this repository and run `npm run dev`

## Tests

This component is tested with [Jest](https://jestjs.io/). To run tests, run `npm test`

## Contributing

Contributions are always welcome! Open a pull request or file an issue. 
