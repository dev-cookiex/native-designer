import { FlexStyle } from 'react-native'

import Parser from '../'
import isAnimationValue from '../../helpers/isAnimationValue'
import Compose from '../../typings/compose'

const Margin: Parser<Margin.Attributes, FlexStyle> = attributes => {
  const { margin, ...rest } = attributes

  const style: Compose.StyleWithAnimation<FlexStyle> = {}

  if ( margin !== undefined )

    if ( typeof margin === 'object' && !isAnimationValue( margin ) ) {

      style.marginLeft = margin.left ?? margin.horizontal
      style.marginRight = margin.right ?? margin.horizontal

      style.marginTop = margin.top ?? margin.vertical
      style.marginBottom = margin.bottom ?? margin.vertical

      style.marginStart = margin.start
      style.marginEnd = margin.end

    } else style.margin = margin

  return { rest, style }
}

namespace Margin {
  export namespace Attributes {
    export type Margin =
      | Compose.AcceptAnimation<number | string>
      | {
        top?: Compose.AcceptAnimation<number | string>
        bottom?: Compose.AcceptAnimation<number | string>
        left?: Compose.AcceptAnimation<number | string>
        right?: Compose.AcceptAnimation<number | string>
        end?: Compose.AcceptAnimation<number | string>
        start?: Compose.AcceptAnimation<number | string>
        vertical?: Compose.AcceptAnimation<number | string>
        horizontal?: Compose.AcceptAnimation<number | string>
      }

  }
  export interface Attributes {
    margin?: Attributes.Margin
  }
}

export default Margin
