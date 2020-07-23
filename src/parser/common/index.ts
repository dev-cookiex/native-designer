import { ViewStyle, ImageStyle, TextStyle } from 'react-native'

import combineParsers from '../../helpers/combineParsers'
import CommonBackground from './background'
import CommonHidden from './hidden'
import CommonOpacity from './opacity'
import CommonZIndex from './zIndex'

type A<A extends { [key: string]: any }, B extends { [key: string]: any }> = {
  [K in Extract<keyof A, keyof B>]: A[K] | B[K]
}

const Common = combineParsers<Common.Attributes, Common.Style>(
  CommonBackground,
  CommonOpacity,
  CommonHidden,
  CommonZIndex
)

namespace Common {
  export type Style = A<ViewStyle, A<ImageStyle, TextStyle>>
  export interface Attributes extends
    CommonOpacity.Attributes,
    CommonBackground.Attributes,
    CommonHidden.Attributes,
    CommonZIndex.Attributes
  {}
}

export default Common
