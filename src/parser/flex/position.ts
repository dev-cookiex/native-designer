import { FlexStyle } from 'react-native'

import Parser from '../'
import isAnimationValue from '../../helpers/isAnimationValue'
import Compose from '../../typings/compose'

const Position: Parser<Position.Attributes, FlexStyle> = attributes => {
  const { absolute, relative, position, ...rest } = attributes

  const style: Compose.StyleWithAnimation<FlexStyle> = {}

  if ( relative ) {
    style.position = 'relative'

    if ( typeof relative === 'object' )

      if ( isAnimationValue( relative ) )

        style.top = style.bottom = style.left = style.right = relative

      else {
        style.start = relative.start
        style.end = relative.end

        style.top = relative.top ?? relative.vertical
        style.bottom = relative.bottom ?? relative.vertical
        style.left = relative.left ?? relative.horizontal
        style.right = relative.right ?? relative.horizontal
      }

    else if ( typeof relative === 'number' || typeof relative === 'string' )
      style.top = style.bottom = style.left = style.right = relative
  }

  if ( absolute ) {
    style.position = 'absolute'

    if ( typeof absolute === 'object' )

      if ( isAnimationValue( absolute ) )

        style.top = style.bottom = style.left = style.right = absolute

      else {
        style.start = absolute.start
        style.end = absolute.end

        style.top = absolute.top ?? absolute.vertical
        style.bottom = absolute.bottom ?? absolute.vertical
        style.left = absolute.left ?? absolute.horizontal
        style.right = absolute.right ?? absolute.horizontal
      }

    else if ( typeof absolute === 'number' || typeof absolute === 'string' )
      style.top = style.bottom = style.left = style.right = absolute
  }

  if ( position !== undefined ) {

    if ( typeof position === 'object' )

      if ( isAnimationValue( position ) )

        style.top = style.bottom = style.left = style.right = position

      else {
        style.position = position.type
        style.start = position.start
        style.end = position.end
        style.top = position.top ?? position.vertical
        style.bottom = position.bottom ?? position.vertical
        style.left = position.left ?? position.horizontal
        style.right = position.right ?? position.horizontal
      }

    else style.top = style.bottom = style.left = style.right = position
  }

  return { rest, style }
}

namespace Position {
  export namespace Attributes {
    export type Position =
      | Compose.AcceptAnimation<number | string>
      | {
        start?: Compose.AcceptAnimation<number | string>
        end?: Compose.AcceptAnimation<number | string>

        top?: Compose.AcceptAnimation<number | string>
        bottom?: Compose.AcceptAnimation<number | string>
        left?: Compose.AcceptAnimation<number | string>
        right?: Compose.AcceptAnimation<number | string>
        horizontal?: Compose.AcceptAnimation<number | string>
        vertical?: Compose.AcceptAnimation<number | string>
      }
  }
  export interface Attributes {
    absolute?: boolean | Attributes.Position
    relative?: boolean | Attributes.Position
    position?:
      | Compose.AcceptAnimation<number | string>
      | {
        type?: 'absolute' | 'relative'
        start?: Compose.AcceptAnimation<number | string>
        end?: Compose.AcceptAnimation<number | string>

        top?: Compose.AcceptAnimation<number | string>
        bottom?: Compose.AcceptAnimation<number | string>
        left?: Compose.AcceptAnimation<number | string>
        right?: Compose.AcceptAnimation<number | string>
        horizontal?: Compose.AcceptAnimation<number | string>
        vertical?: Compose.AcceptAnimation<number | string>
      }
  }
}

export default Position
