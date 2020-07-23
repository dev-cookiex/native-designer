import { FlexStyle } from 'react-native'

import Parser from '../'
import Compose from '../../typings/compose'

const Align: Parser<Align.Attributes, FlexStyle> = attributes => {
  const { ratio, ...rest } = attributes

  const style: Compose.StyleWithAnimation<FlexStyle> = {}

  style.aspectRatio = ratio

  return { rest, style }
}

namespace Align {
  export namespace Attributes {}
  export interface Attributes {
    ratio?: Compose.AcceptAnimation<number>
  }
}

export default Align
