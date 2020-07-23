import { FlexStyle } from 'react-native'

import Parser from '../'

const Overflow: Parser<Overflow.Attributes, FlexStyle> = attributes => {
  const { overflow, ...rest } = attributes

  const style: FlexStyle = {}

  if ( overflow !== undefined )

    if ( typeof overflow === 'string' )

      style.overflow = overflow

    else if ( overflow ) style.overflow = 'hidden'

  return { rest, style }
}

namespace Overflow {
  export interface Attributes {
    overflow?: boolean | 'visible' | 'hidden' | 'scroll'
  }
}

export default Overflow
