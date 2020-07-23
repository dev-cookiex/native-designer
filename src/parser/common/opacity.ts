import Common from '.'
import Parser from '../'
import Compose from '../../typings/compose'

const Opacity: Parser<Opacity.Attributes, Common.Style> = attributes => {
  const { opacity, ...rest } = attributes
  const style: Compose.StyleWithAnimation<Common.Style> = {}

  style.opacity = opacity

  return { rest, style }
}

namespace Opacity {
  export interface Attributes {
    opacity?: Compose.AcceptAnimation<number>
  }
}

export default Opacity
