export const findMatches = (options, searchTerm) =>
  // question marks break the regex
  (searchTerm.indexOf('?') > -1)
    ? []
    :  options.filter(option => {
        const foundIndex = option.toLowerCase().indexOf(
          searchTerm.toLowerCase()
        )

        return foundIndex > -1
      })

export const boldSearchLetters = (option, searchTerm) => {
  const regex = new RegExp(searchTerm, 'gi')
  const spanWrappedLetters = `<span>${searchTerm}</span>`
  
  return option.replace(regex, spanWrappedLetters)
}
