import { FlexStyle } from 'react-native'

import Parser from '../'
import isAnimationValue from '../../helpers/isAnimationValue'
import Compose from '../../typings/compose'

const Size: Parser<Size.Attributes, FlexStyle> = attributes => {
  const { width, height, size, ...rest } = attributes
  const style: Compose.StyleWithAnimation<FlexStyle> = {}

  if ( size !== undefined )

    if ( typeof size === 'object' && !isAnimationValue( size ) ) {

      style.minHeight = style.minWidth = size.min
      style.maxHeight = style.maxWidth = size.max
      style.height = style.width = size.normal

    } else style.width = style.height = size

  if ( width !== undefined )

    if ( typeof width === 'object' && !isAnimationValue( width ) ) {

      style.minWidth = width.min
      style.maxWidth = width.max
      style.width = width.normal

    } else style.width = width

  if ( height !== undefined )

    if ( typeof height === 'object' && !isAnimationValue( height ) ) {

      style.minHeight = height.min
      style.maxHeight = height.max
      style.height = height.normal

    } else style.height = height

  return { rest, style }
}

namespace Size {
  export namespace Attributes {
    export type Size =
      | Compose.AcceptAnimation<number | string>
      | {
        min?: Compose.AcceptAnimation<number | string>
        max?: Compose.AcceptAnimation<number | string>
        normal?: Compose.AcceptAnimation<number | string>
      }
  }
  export interface Attributes {
    width?: Attributes.Size
    height?: Attributes.Size
    size?: Attributes.Size
  }
}

export default Size
