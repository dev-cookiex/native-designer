import { TextStyle } from 'react-native'

import combineParsers from '../../helpers/combineParsers'
import FlexAlign from '../flex/align'
import FlexSize from '../flex/size'
import View from '../view'
import TextFont from './font'

const Text = combineParsers<Text.Attributes, TextStyle>(
  TextFont,
  View.clone().unregister( FlexSize, FlexAlign )
)

namespace Text {
  export interface Attributes extends
    Omit<View.Attributes, 'size' | 'height' | 'width' | 'align'>,
    TextFont.Attributes {}
}

export default Text
