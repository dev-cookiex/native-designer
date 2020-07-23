import { ImageStyle } from 'react-native'

import combineParsers from '../../helpers/combineParsers'
import Flex from '../flex'
import FlexBorder from '../flex/border'
import ImageBorder from './border'
import ImageImage from './image'
import ImageShadow from './shadow'

const Image = combineParsers<Image.Attributes, ImageStyle>(
  Flex.clone().unregister( FlexBorder ),
  ImageImage,
  ImageShadow,
  ImageBorder
)

namespace Image {
  export interface Attributes extends
    Omit<Flex.Attributes, 'border'>,
    ImageBorder.Attributes,
    ImageImage.Attributes,
    ImageShadow.Attributes
  {}
}

export default Image
