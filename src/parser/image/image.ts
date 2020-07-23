import { ImageStyle, ImageResizeMode } from 'react-native'

import Parser from '../'
import isAnimationValue from '../../helpers/isAnimationValue'
import Compose from '../../typings/compose'

const Image: Parser<Image.Attributes, ImageStyle> = attributes => {
  const { mode, color, ...rest } = attributes
  const style: Compose.StyleWithAnimation<ImageStyle> = {}

  style.resizeMode = mode

  if ( typeof color === 'object' && !isAnimationValue( color ) ) {

    style.tintColor = color.tint
    style.overlayColor = color.overlay

  } else style.tintColor = color

  return { rest, style }
}

namespace Image {
  export interface Attributes {
    mode?: ImageResizeMode
    color?: Compose.AcceptAnimation<string> | {
      tint?: Compose.AcceptAnimation<string>
      overlay?: Compose.AcceptAnimation<string>
    }
  }
}

export default Image
