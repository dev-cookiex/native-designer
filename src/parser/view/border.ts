import { ViewStyle } from 'react-native'

import Parser from '../'
import isAnimationValue from '../../helpers/isAnimationValue'
import Compose from '../../typings/compose'

const Border: Parser<Border.Attributes, ViewStyle> = attributes => {
  const { border, radius, ...rest } = attributes ?? {} as any

  const style: Compose.StyleWithAnimation<ViewStyle> = {}

  if ( border !== undefined )

    if ( typeof border === 'object' && !isAnimationValue( border ) ) {

      style.borderWidth = border.width

      style.borderColor = border.color

      // ------------- BORDER TOP -------------

      if ( border.top !== undefined )

        if ( typeof border.top === 'object' && !isAnimationValue( border.top ) ) {

          style.borderTopWidth = border.top.width

          style.borderTopColor = border.top.color

        } else style.borderTopWidth = border.top

      // ------------- BORDER BOTTOM -------------

      if ( border.bottom !== undefined )

        if ( typeof border.bottom === 'object' && !isAnimationValue( border.bottom ) ) {

          style.borderBottomWidth = border.bottom.width

          style.borderBottomColor = border.bottom.color

        } else style.borderBottomWidth = border.bottom

      // ------------- BORDER LEFT -------------

      if ( border.left !== undefined )

        if ( typeof border.left === 'object' && !isAnimationValue( border.left ) ) {

          style.borderLeftWidth = border.left.width

          style.borderLeftColor = border.left.color

        } else style.borderLeftWidth = border.left

      // ------------- BORDER RIGHT -------------

      if ( border.right !== undefined )

        if ( typeof border.right === 'object' && !isAnimationValue( border.right ) ) {

          style.borderRightWidth = border.right.width

          style.borderRightColor = border.right.color

        } else style.borderRightWidth = border.right

    } else style.borderWidth = border

  if ( radius !== undefined )

    if ( typeof radius === 'object' && !isAnimationValue( radius ) ) {

      if ( radius.bottom !== undefined )

        if ( typeof radius.bottom === 'object' && !isAnimationValue( radius.bottom ) ) {

          style.borderBottomEndRadius = radius.bottom.end
          style.borderBottomLeftRadius = radius.bottom.left
          style.borderBottomRightRadius = radius.bottom.right
          style.borderBottomStartRadius = radius.bottom.start

        } else
          style.borderBottomEndRadius =
          style.borderBottomLeftRadius =
          style.borderBottomRightRadius =
          style.borderBottomStartRadius = radius.bottom

      if ( radius.top !== undefined )

        if ( typeof radius.top === 'object' && !isAnimationValue( radius.top ) ) {
  
          style.borderTopEndRadius = radius.top.end
          style.borderTopLeftRadius = radius.top.left
          style.borderTopRightRadius = radius.top.right
          style.borderTopStartRadius = radius.top.start
  
        } else
          style.borderTopEndRadius =
          style.borderTopLeftRadius =
          style.borderTopRightRadius =
          style.borderTopStartRadius = radius.top

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
        top?:
          | Compose.AcceptAnimation<number>
          | { width?: Compose.AcceptAnimation<number>, color?: Compose.AcceptAnimation<string> }
        right?:
          | Compose.AcceptAnimation<number>
          | { width?: Compose.AcceptAnimation<number>, color?: Compose.AcceptAnimation<string> }
        bottom?:
          | Compose.AcceptAnimation<number>
          | { width?: Compose.AcceptAnimation<number>, color?: Compose.AcceptAnimation<string> }
        left?:
          | Compose.AcceptAnimation<number>
          | { width?: Compose.AcceptAnimation<number>, color?: Compose.AcceptAnimation<string> }
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
