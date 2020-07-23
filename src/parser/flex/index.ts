import { FlexStyle } from 'react-native'

import combineParsers from '../../helpers/combineParsers'
import FlexAlign from './align'
import FlexBorder from './border'
import FlexFlex from './flex'
import FlexJustify from './justify'
import FlexMargin from './margin'
import FlexOverflow from './overflow'
import FlexPadding from './padding'
import FlexPosition from './position'
import FlexRatio from './ratio'
import FlexSize from './size'

const Flex = combineParsers<Flex.Attributes, FlexStyle>(
  FlexAlign,
  FlexBorder,
  FlexFlex,
  FlexJustify,
  FlexMargin,
  FlexOverflow,
  FlexPadding,
  FlexPosition,
  FlexRatio,
  FlexSize
)

namespace Flex {
  export interface Attributes extends
    FlexAlign.Attributes,
    FlexBorder.Attributes,
    FlexFlex.Attributes,
    FlexJustify.Attributes,
    FlexMargin.Attributes,
    FlexOverflow.Attributes,
    FlexPadding.Attributes,
    FlexPosition.Attributes,
    FlexRatio.Attributes,
    FlexSize.Attributes
  {}
}

export default Flex
