import { Animated } from 'react-native'
import ReAnimated from 'react-native-reanimated'

type AnimationValue<T extends number | string | boolean> =
  | Animated.Value
  | Animated.AnimatedInterpolation
  | ReAnimated.Node<T>
  | ReAnimated.Value<T>

type Primitive = number | string | boolean

namespace Compose {
  export type AcceptAnimation<T extends number | string | boolean> =
   T | AnimationValue<T>
  export type StyleWithAnimation<O> = {
    [K in keyof O]+?:
      O[K] extends Primitive ?

        O[K] | AnimationValue<O[K]> :
      O[K] extends ( infer A )[] ?

        A extends Primitive ?
          ( A | AnimationValue<A> )[] :

        A extends any[] ?
          never :

        StyleWithAnimation<A>[] :

      StyleWithAnimation<O[K]>
  }
}

export default Compose
