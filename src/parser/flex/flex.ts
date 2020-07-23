import { FlexStyle } from 'react-native'

import Parser from '../'
import isAnimationValue from '../../helpers/isAnimationValue'
import Compose from '../../typings/compose'

const Flex: Parser<Flex.Attributes, FlexStyle> = attributes => {
  const { flex, reverse, ...rest } = attributes

  const style: Compose.StyleWithAnimation<FlexStyle> = {}

  if ( flex !== undefined )

    if ( typeof flex === 'object' )

      if ( isAnimationValue( flex ) )

        style.flex = flex

      else {

        if ( typeof flex.flex !== 'boolean' ) style.flex = flex.flex

        if ( flex.flex === undefined || flex.flex === true ) flex.flex = 1

        style.flexBasis = flex.basis
        style.flexDirection = flex.direction
        style.flexGrow = flex.grow
        style.flexShrink = flex.shrink
        style.flexWrap = flex.wrap
      }

    else if ( typeof flex === 'string' ) {

      style.flex = 1

      if ( reverse ) style.flexDirection = flex === 'row' ? 'row-reverse' : 'column'

      else style.flexDirection = flex

    }

    else if ( typeof flex === 'number' )

      style.flex = flex

    else if ( flex ) style.flex = 1

  return { rest, style }
}

namespace Flex {
  export namespace Attributes {
    export type Flex =
      | boolean
      | Compose.AcceptAnimation<number>
      | 'row'
      | 'column'
      | {
        flex?: boolean | Compose.AcceptAnimation<number>
        basis?: Compose.AcceptAnimation<string | number>
        direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse'
        grow?: Compose.AcceptAnimation<number>
        shrink?: Compose.AcceptAnimation<number>
        wrap?: 'wrap' | 'nowrap' | 'wrap-reverse'
      }
    export type Reverse = boolean
  }
  export interface Attributes {
    flex?: Attributes.Flex
    reverse?: Attributes.Reverse
  }
}

export default Flex
