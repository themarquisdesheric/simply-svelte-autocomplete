import { findMatches, spanWrapSearchTerm, boldSearchTerm } from './utils'

describe('findMatches', () => {
  const options = ['Jorge Luis Borges', 'Voltaire', 'Oscar Wilde', 'Julio Cortazar', 'T.S. Eliot']

  it('should find matches', () => {
    const searchTerm = 'g'
    const result = findMatches(options, searchTerm)
    
    expect(result).toEqual(['Jorge Luis Borges'])
  })
  
  it('should find matches of mixed upper/lowercase', () => {
    const searchTerm = 'j'
    const result = findMatches(options, searchTerm)
    const expectedResult = ['Jorge Luis Borges', 'Julio Cortazar']
    
    expect(result).toEqual(expectedResult)
  })

  it('should not find a match', () => {
    const noMatchesHere = ['Marcel Proust']
    const searchTerm = 'Z'
    const result = findMatches(noMatchesHere, searchTerm)

    expect(result).toEqual([])
  })
  
  it('should return an empty array if search term includes question mark', () => {
    const hasAQuestionMark = 'oh god not one of these?'
    const result = findMatches(options, hasAQuestionMark)
    
    expect(result).toEqual([])
  })
})

describe('spanWrapSearchTerm', () => {
  it('should wrap matching substring in a <span> element', () => {
    const option = 'Voltaire'
    const foundIndex = 1
    const searchTermLength = 1
    const result = spanWrapSearchTerm(option, foundIndex, searchTermLength)
    const expectedResult = '<span>o</span>'

    expect(result).toBe(expectedResult)
  })
})

describe('boldSearchTerm', () => {
  const cortazar = 'Julio Cortazar'
  
  it('should wrap matching substrings in a <span> element', () => {
    const option = cortazar
    const searchTerm = 'o'
    const result = boldSearchTerm(option, searchTerm)
    const expectedResult = 'Juli<span>o</span> C<span>o</span>rtazar'

    expect(result).toBe(expectedResult)
  })

  it('should return the span-wrapped search term in the proper case', () => {
    const option = cortazar
    const searchTerm = 'c'
    const result = boldSearchTerm(option, searchTerm)
    const expectedResult = 'Julio <span>C</span>ortazar'

    expect(result).toBe(expectedResult)
  })

  it('should return the option if it does not contain matches', () => {
    const option = cortazar
    const searchTerm = 'Y'
    const result = boldSearchTerm(option, searchTerm)
    const expectedResult = cortazar

    expect(result).toBe(expectedResult)
  })
})
