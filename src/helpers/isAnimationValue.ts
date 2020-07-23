import { Animated } from 'react-native'
import { Value, Node } from 'react-native-reanimated'

import { loadModule } from './moduleTools'

const isAnimationValue =
  ( value: any ): value is (
    | Value<string | number | boolean>
    | Node<string | number | boolean>
    | Animated.Value
    | Animated.AnimatedInterpolation
  ) =>
    isNativeAnimationValue( value ) ||
    isNativeAnimationInterpolation( value ) ||
    isReAnimatedAnimationValue( value )

export const isReAnimatedAnimationNode =
  ( value: any ): value is Node<string | number | boolean> => {
    try {
      if ( typeof value !== 'object' ) return false
      const ReAnimated = loadModule( 'react-native-reanimated'  ) as typeof import( 'react-native-reanimated' )
      return value instanceof ReAnimated.Node
    } catch { return false }
  }

export const isReAnimatedAnimationValue =
  ( value: any ): value is Value<string | number | boolean> => {
    try {
      if ( typeof value !== 'object' ) return false
      const ReAnimated = loadModule( 'react-native-reanimated'  ) as typeof import( 'react-native-reanimated' )
      return value instanceof ReAnimated.Value
    } catch { return false }
  }

export const isNativeAnimationInterpolation =
  ( value: any ): value is Animated.AnimatedInterpolation => {
    try {
      if ( typeof value !== 'object' ) return false
      const Native = loadModule( 'react-native' ) as typeof import( 'react-native' )
      
      return value instanceof Native.Animated.AnimatedInterpolation
    } catch { return false }
  }

export const isNativeAnimationValue =
  ( value: any ): value is Animated.Value | Animated.AnimatedInterpolation => {
    try {
      if ( typeof value !== 'object' ) return false
      const Native = loadModule( 'react-native' ) as typeof import( 'react-native' )
      
      return value instanceof Native.Animated.Value || value instanceof Native.Animated.AnimatedInterpolation
    } catch { return false }
  }

export default isAnimationValue
