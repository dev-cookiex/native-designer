import { FlexStyle } from 'react-native'

import Parser from '../'
import isAnimationValue from '../../helpers/isAnimationValue'
import Compose from '../../typings/compose'

const Border: Parser<Border.Attributes, FlexStyle> = attributes => {
  const { border, ...rest } = attributes

  const style: Compose.StyleWithAnimation<FlexStyle> = {}

  if ( border !== undefined )

    if ( typeof border === 'object' && !isAnimationValue( border ) ) {

      style.borderWidth = border.width

      style.borderTopWidth = border.top

      style.borderBottomWidth = border.bottom

      style.borderLeftWidth = border.left

      style.borderRightWidth = border.right

    } else style.borderWidth = border

  return { rest, style }
}

namespace Border {
  export namespace Attributes {
    interface ComplexBorder {
      width?: Compose.AcceptAnimation<number>
      color?: Compose.AcceptAnimation<string>
      top?: Compose.AcceptAnimation<number>
      right?: Compose.AcceptAnimation<number>
      bottom?: Compose.AcceptAnimation<number>
      left?: Compose.AcceptAnimation<number>
    }
    export type Border = Compose.AcceptAnimation<number> | ComplexBorder
  }
  export interface Attributes {
    border?: Attributes.Border
  }
}

export default Border
