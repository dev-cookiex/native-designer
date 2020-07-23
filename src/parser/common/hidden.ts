import Common from '.'
import Parser from '../'
import Compose from '../../typings/compose'

const Hidden: Parser<Hidden.Attributes, Common.Style> = attributes => {
  const { hidden, ...rest } = attributes
  const style: Compose.StyleWithAnimation<Common.Style> = {}

  style.display = hidden ? 'none' : 'flex'
  
  return { rest, style }
}

namespace Hidden {
  export interface Attributes {
    hidden?: boolean
  }
}

export default Hidden
