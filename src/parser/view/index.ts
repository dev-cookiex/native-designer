import { ViewStyle } from 'react-native'

import combineParsers from '../../helpers/combineParsers'
import Common from '../common'
import Flex from '../flex'
import FlexBorder from '../flex/border'
import Transform from '../transform'
import ViewBorder from './border'
import ViewShadow from './shadow'

const View = combineParsers<View.Attributes, ViewStyle>(
  ViewBorder,
  ViewShadow,
  Common,
  Flex.clone().unregister( FlexBorder ),
  Transform
)

namespace View {
  export interface Attributes extends
    ViewBorder.Attributes,
    ViewShadow.Attributes,
    Omit<Flex.Attributes, 'border'>,
    Common.Attributes,
    Transform.Attributes
  {}
}

export default View
