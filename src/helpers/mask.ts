const DIGIT = '9'
const ALPHA = 'A'
const ALPHANUM = 'S'

const mask = ( text: string, pattern: string | string[] ) => {
  if ( Array.isArray( pattern ) )
    return mask( text, pattern.find( mask => text.length < mask.length ) )
  let index = 0
  let i: number

  const patternChars = pattern.replace( /\W/g, '' )
  const output = pattern.split( '' )
  const values = text.replace( /\W/g, '' )
  const charsValues = values.replace( /\W/g, '' )

  for ( i = 0; i < output.length; i++ )

    if ( index >= values.length )

      if ( patternChars.length === charsValues.length )

        return output.join( '' )

      else break

    else if (
      output[i] === DIGIT && values[index].match( /[0-9]/ ) ||
      output[i] === ALPHA && values[index].match( /[a-zA-Z]/ ) ||
      output[i] === ALPHANUM && values[index].match( /[0-9a-zA-Z]/ )
    ) output[i] = values[index++]
      
    else if ( output[i] === DIGIT || output[i] === ALPHA || output[i] === ALPHANUM )

      return output.slice( 0, i ).join( '' )

    else if ( output[i] === values[index] ) index++

  return output.join( '' ).substr( 0, i )
}

export default mask
