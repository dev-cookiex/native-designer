import Common from '.'
import Parser from '../'
import Compose from '../../typings/compose'

const Background: Parser<Background.Attributes, Common.Style> = attributes => {
  const { bg, ...rest } = attributes
  const style: Compose.StyleWithAnimation<Common.Style> = {}
  style.backgroundColor = bg
  
  return { rest, style }
}

namespace Background {
  export interface Attributes {
    bg?: Compose.AcceptAnimation<string>
  }
}

export default Background
