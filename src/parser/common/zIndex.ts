import Common from '.'
import Parser from '../'
import Compose from '../../typings/compose'

const ZIndex: Parser<ZIndex.Attributes, Common.Style> = attributes => {
  const { index, ...rest } = attributes
  const style: Compose.StyleWithAnimation<Common.Style> = {}

  style.zIndex = index
  
  return { rest, style }
}

namespace ZIndex {
  export interface Attributes {
    index?: Compose.AcceptAnimation<number>
  }
}

export default ZIndex
