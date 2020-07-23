import { ViewStyle, ShadowStyleIOS } from 'react-native'

import Parser from '../'
import isAnimationValue, { isNativeAnimationValue, isNativeAnimationInterpolation, isReAnimatedAnimationValue, isReAnimatedAnimationNode } from '../../helpers/isAnimationValue'
import Compose from '../../typings/compose'

type Style = ShadowStyleIOS & Pick<ViewStyle, 'elevation'>

const Shadow: Parser<Shadow.Attributes, Style> = attributes => {
  const { shadow, ...rest } = attributes
  const style: Compose.StyleWithAnimation<Style> = {}

  if ( shadow !== undefined )

    if ( typeof shadow === 'object' && !isAnimationValue( shadow ) )

      if ( isReAnimatedAnimationNode( shadow.base ) ) {
        style.shadowColor = shadow.color ?? '#000'
        style.shadowOffset = {
          width: shadow.width ?? 0,
          height: shadow.height
        }
        style.shadowOpacity = shadow.opacity
        style.shadowRadius = shadow.radius
        style.elevation = shadow.elevation

      } else if ( typeof shadow.base === 'object' ) {

        style.shadowColor = shadow.color ?? '#000'
        style.shadowOffset = {
          width: shadow.width ?? 0,
          height: shadow.height ?? shadow.base.interpolate( {
            inputRange: [ 1, 24 ],
            outputRange: [ 1, 12 ]
          } )
        }
        style.shadowOpacity = shadow.opacity ?? shadow.base.interpolate( {
          inputRange: [ 1, 24 ],
          outputRange: [ .18, .58 ],
        } )
        style.shadowRadius = shadow.radius ?? shadow.base.interpolate( {
          inputRange: [ 1, 24 ],
          outputRange: [ 1, 16 ],
        } )
        style.elevation = shadow.elevation

      } else {
        style.shadowColor = shadow.color ?? '#000'
        style.shadowOffset = {
          width: shadow.width ?? 0,
          height: shadow.height ?? shadow.base !== undefined ? Math.trunc( shadow.base / 2 ) : undefined
        }
        style.shadowOpacity = shadow.opacity ?? shadow.base !== undefined ? .18 + shadow.base * .02 : undefined
        style.shadowRadius = shadow.radius ?? shadow.base !== undefined ? shadow.base / 24 * 16 : undefined
        style.elevation = shadow.elevation ?? shadow.base
      }

    else {
      if (
        isNativeAnimationValue( shadow )
        ||
        isNativeAnimationInterpolation( shadow )
        ||
        isReAnimatedAnimationValue( shadow )
      ) {
        style.shadowColor = '#000'
        style.shadowOffset = {
          width: 0,
          height: shadow.interpolate( {
            inputRange: [ 1, 24 ],
            outputRange: [ 1, 12 ]
          } )
        }
        style.shadowOpacity = shadow.interpolate( {
          inputRange: [ 1, 24 ],
          outputRange: [ .18, .58 ]
        } )
        style.shadowRadius = shadow.interpolate( {
          inputRange: [ 1, 24 ],
          outputRange: [ 1, 16 ],
        } )
        style.elevation = shadow
      }

      else if ( isReAnimatedAnimationNode( shadow ) ) void 0

      else {
        style.shadowColor = '#000'
        style.shadowOffset = {
          width: 0,
          height: Math.trunc( shadow / 2 )
        }
        style.shadowOpacity = .18 + shadow * .02
        style.shadowRadius = shadow / 24 * 16
        style.elevation = shadow
      }
    }
  
  return { rest, style }
}

namespace Shadow {
  export namespace Attributes {
    export interface ComplexShadow {
      base?: Compose.AcceptAnimation<number>
      color?: Compose.AcceptAnimation<string>
      opacity?: Compose.AcceptAnimation<number>
      radius?: Compose.AcceptAnimation<number>
      width?: Compose.AcceptAnimation<number>
      height?: Compose.AcceptAnimation<number>
      elevation?: Compose.AcceptAnimation<number>
    }
    export type Shadow = Compose.AcceptAnimation<number> | ComplexShadow
  }
  export interface Attributes {
    shadow?: Attributes.Shadow
  }
}

export default Shadow
