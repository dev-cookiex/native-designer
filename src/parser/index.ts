import { ViewStyle, FlexStyle, ImageStyle, TransformsStyle, TextStyle, ShadowStyleIOS } from 'react-native'

import combineParsers from '../helpers/combineParsers'
import Compose from '../typings/compose'
import ParseCommon from './common'
import ParseFlex from './flex'
import ParseImage from './image'
import ParseText from './text'
import ParseTransform from './transform'
import ParseView from './view'

interface Parser<
  A extends { [k: string]: any },
  S extends Parser.PureStyle
> {
  <P extends Parser.Props<A>>( props: P ): Parser.Return<P, A, S>
}

namespace Parser {
  export type PureStyle = ViewStyle | FlexStyle | TextStyle | ImageStyle | TransformsStyle | ShadowStyleIOS
  export type Props<A> = Partial<A>
  export type Return<P, A extends { [k: string]: any }, S extends PureStyle> =
    { rest: Omit<P, keyof A>, style: S | Compose.StyleWithAnimation<S> }

  export interface Combined<A, S> {}
  export import combine = combineParsers
  export import Common = ParseCommon
  export import Flex = ParseFlex
  export import Text = ParseText
  export import View = ParseView
  export import Transform = ParseTransform
  export import Image = ParseImage
  type _ = [
    typeof Common, typeof Flex, typeof Text, typeof View, typeof Transform, typeof Image,
    typeof combine
  ]
}

export default Parser
