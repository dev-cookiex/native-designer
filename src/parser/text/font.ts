import { TextStyle } from 'react-native'

import Parser from '../'
import isAnimationValue, { isReAnimatedAnimationNode } from '../../helpers/isAnimationValue'
import Compose from '../../typings/compose'

const Font: Parser<Font.Attributes, TextStyle> = attributes => {
  const { color, family, size, italic, bold, weight, spacing, text, align, ...rest } = attributes

  const style: Compose.StyleWithAnimation<TextStyle> = {}

  style.color = color
  style.fontFamily = family
  style.fontSize = size

  if ( italic ) style.fontStyle = 'italic'

  if ( bold ) style.fontWeight = 'bold'

  if ( weight ) style.fontWeight = weight

  if ( spacing !== undefined )

    if ( typeof spacing === 'object' && !isAnimationValue( spacing ) ) {
      style.letterSpacing = spacing.letter
      style.lineHeight = spacing.line
    } else style.letterSpacing = spacing

  if ( typeof align === 'boolean' )

    if ( align ) style.textAlign = 'center'

    else void 0

  else style.textAlign = align

  if ( text !== undefined ) {
    style.textTransform = text.transform

    if ( text.shadow !== undefined )

      if ( typeof text.shadow === 'object' ) {
        if ( isAnimationValue( text.shadow ) )
          if ( isReAnimatedAnimationNode( text.shadow ) ) { /* empty */ }
          else {
            style.textShadowColor = '#000'
            style.textShadowOffset = {
              width: 0,
              height: text.shadow.interpolate( {
                inputRange: [ 1, 24 ],
                outputRange: [ 1, 12 ]
              } )
            }
            style.textShadowRadius = text.shadow.interpolate( {
              inputRange: [ 1, 24 ],
              outputRange: [ 1, 16 ],
            } )
          }

        else {
          style.textShadowColor = text.shadow.color

          if ( typeof text.shadow.offset === 'object' && !isAnimationValue( text.shadow.offset ) )
            style.textShadowOffset = text.shadow.offset

          else style.textShadowOffset = {
            width: 0,
            height: text.shadow.offset
          }

          style.textShadowRadius = text.shadow.radius
        }
      } else {
        style.textShadowColor = '#000'
        style.textShadowOffset = {
          width: 0,
          height: Math.trunc( text.shadow / 2 )
        }
        style.textShadowRadius = text.shadow / 24 * 16
      }
  }

  return { rest, style }
}

namespace Font {
  export interface Attributes {
    color?: Compose.AcceptAnimation<string>
    family?: string
    size?: Compose.AcceptAnimation<number>
    italic?: boolean
    bold?: boolean
    weight?: 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900'
    spacing?: Compose.AcceptAnimation<number> | {
      letter?: Compose.AcceptAnimation<number>
      line?: Compose.AcceptAnimation<number>
    }
    align?: boolean | 'auto' | 'left' | 'right' | 'center' | 'justify'
    text?: {
      transform?: 'none' | 'capitalize' | 'uppercase' | 'lowercase'
      shadow?: Compose.AcceptAnimation<number> | {
        color?: Compose.AcceptAnimation<string>
        offset?: Compose.AcceptAnimation<number> | {
          width?: Compose.AcceptAnimation<number>
          height?: Compose.AcceptAnimation<number>
        }
        radius?: Compose.AcceptAnimation<number>
      }
    }
  }
}

export default Font
