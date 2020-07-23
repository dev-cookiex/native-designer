import { FlexStyle } from 'react-native'

import Parser from '../'
import isAnimationValue from '../../helpers/isAnimationValue'
import Compose from '../../typings/compose'

const Padding: Parser<Padding.Attributes, FlexStyle> = attributes => {
  const { padding, ...rest } = attributes
  const style: Compose.StyleWithAnimation<FlexStyle> = {}

  if ( padding !== undefined )

    if ( typeof padding === 'object' && !isAnimationValue( padding ) ) {

      style.paddingLeft = padding.left ?? padding.horizontal
      style.paddingRight = padding.right ?? padding.horizontal

      style.paddingTop = padding.top ?? padding.vertical
      style.paddingBottom = padding.bottom ?? padding.vertical

      style.paddingStart = padding.start
      style.paddingEnd = padding.end

    } else style.padding = padding

  return { rest, style }
}

namespace Padding {
  export namespace Attributes {
    export type Padding =
      | Compose.AcceptAnimation<number>
      | {
        top?: Compose.AcceptAnimation<number>
        bottom?: Compose.AcceptAnimation<number>
        left?: Compose.AcceptAnimation<number>
        right?: Compose.AcceptAnimation<number>
        end?: Compose.AcceptAnimation<number>
        start?: Compose.AcceptAnimation<number>
        vertical?: Compose.AcceptAnimation<number>
        horizontal?: Compose.AcceptAnimation<number>
      }

  }
  export interface Attributes {
    padding?: Attributes.Padding
  }
}

export default Padding
