import { ImageStyle } from 'react-native'

import Parser from '../'
import isAnimationValue from '../../helpers/isAnimationValue'
import Compose from '../../typings/compose'

const Border: Parser<Border.Attributes, ImageStyle> = attributes => {
  const { border, radius, ...rest } = attributes

  const style: Compose.StyleWithAnimation<ImageStyle> = {}

  if ( border !== undefined )

    if ( typeof border === 'object' && !isAnimationValue( border ) ) {

      style.borderWidth = border.width

      style.borderColor = border.color

      // ------------- BORDER TOP -------------

      if ( border.top !== undefined )

        style.borderTopWidth = border.top

      // ------------- BORDER BOTTOM -------------

      if ( border.bottom !== undefined )

        style.borderBottomWidth = border.bottom

      // ------------- BORDER LEFT -------------

      if ( border.left !== undefined )

        style.borderLeftWidth = border.left

      // ------------- BORDER RIGHT -------------

      if ( border.right !== undefined )

        style.borderRightWidth = border.right

    } else style.borderWidth = border

  if ( radius !== undefined )

    if ( typeof radius === 'object' && !isAnimationValue( radius ) ) {

      if ( radius.bottom !== undefined )

        if ( typeof radius.bottom === 'object' && !isAnimationValue( radius.bottom ) ) {

          style.borderBottomLeftRadius = radius.bottom.left
          style.borderBottomRightRadius = radius.bottom.right

        } else

          style.borderBottomLeftRadius =
          style.borderBottomRightRadius = radius.bottom

      if ( radius.top !== undefined )

        if ( typeof radius.top === 'object' && !isAnimationValue( radius.top ) ) {
  
          style.borderTopLeftRadius = radius.top.left
          style.borderTopRightRadius = radius.top.right
  
        } else
          
          style.borderTopLeftRadius =
          style.borderTopRightRadius = radius.top

    } else style.borderRadius = radius

  return { rest, style }
}

namespace Border {
  export namespace Attributes {
    export type Border =
      | Compose.AcceptAnimation<number>
      | {
        width?: Compose.AcceptAnimation<number>
        color?: Compose.AcceptAnimation<string>
        top?: Compose.AcceptAnimation<number>
        right?: Compose.AcceptAnimation<number>
        bottom?: Compose.AcceptAnimation<number>
        left?: Compose.AcceptAnimation<number>
      }
    export type Radius =
      | Compose.AcceptAnimation<number>
      | {
        top?:
         | Compose.AcceptAnimation<number>
         | {
           end?: Compose.AcceptAnimation<number>
           left?: Compose.AcceptAnimation<number>
           right?: Compose.AcceptAnimation<number>
           start?: Compose.AcceptAnimation<number>
          }
        bottom?:
          | Compose.AcceptAnimation<number>
          | {
            end?: Compose.AcceptAnimation<number>
            left?: Compose.AcceptAnimation<number>
            right?: Compose.AcceptAnimation<number>
            start?: Compose.AcceptAnimation<number>
          }
      }
  }
  export interface Attributes {
    border?: Attributes.Border
    radius?: Attributes.Radius
  }
}

export default Border
