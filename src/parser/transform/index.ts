import { TransformsStyle } from 'react-native'

import combineParsers from '../../helpers/combineParsers'
import TransformTransform from './transform'

const Transform = combineParsers<Transform.Attributes, TransformsStyle>(
  TransformTransform
)

namespace Transform {
  export interface Attributes extends TransformTransform.Attributes {}
}

export default Transform
