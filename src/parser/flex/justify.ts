import { FlexStyle } from 'react-native'

import Parser from '../'

const Justify: Parser<Justify.Attributes, FlexStyle> = attributes => {
  const { justify, ...rest } = attributes

  const style: FlexStyle = {}

  if ( justify !== undefined )

    if ( typeof justify === 'string' )

      if ( justify === 'end' || justify === 'start' )

        style.justifyContent = `flex-${justify}` as 'flex-start' | 'flex-end'

      else if ( justify === 'around' || justify === 'between' || justify === 'evenly' )

        style.justifyContent = `space-${justify}` as 'space-around' | 'space-between' | 'space-evenly'

      else style.justifyContent = justify

    else if ( justify ) style.justifyContent = 'center'

  return { rest, style }
}

namespace Justify {
  export namespace Attributes {
    export type Justify =
      | boolean
      | 'start'
      | 'end'
      | 'center'
      | 'between'
      | 'around'
      | 'evenly'
  }
  export interface Attributes {
    justify?: Attributes.Justify
  }
}

export default Justify
