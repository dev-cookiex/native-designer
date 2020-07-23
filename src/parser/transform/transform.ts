import { TransformsStyle } from 'react-native'

import Parser from '../'
import isAnimationValue from '../../helpers/isAnimationValue'
import Compose from '../../typings/compose'

const Transform: Parser<Transform.Attributes, TransformsStyle> = attributes => {
  const { transform, matrix, ...rest } = attributes
  const style: Compose.StyleWithAnimation<TransformsStyle> = {
    transform: []
  }

  if ( transform !== undefined ) {

    if ( transform.perspective !== undefined )
      style.transform.push( { perspective: transform?.perspective} )

    if ( transform.rotate !== undefined )

      if ( typeof transform.rotate === 'object' && !isAnimationValue( transform.rotate ) ) {

        style.transform.push(
          { rotateX: transform.rotate.x },
          { rotateY: transform.rotate.y },
          { rotateZ: transform.rotate.z }
        )

      } else style.transform.push( { rotate: transform.rotate } )

    if ( transform.scale !== undefined )

      if ( typeof transform.scale === 'object' && !isAnimationValue( transform.scale ) ) {

        style.transform.push(
          { scaleX: transform.scale.x },
          { scaleY: transform.scale.y },
        )

      } else style.transform.push( { scale: transform.scale } )


    if ( transform.skew !== undefined )

      if ( typeof transform.skew === 'object' && !isAnimationValue( transform.skew ) ) {

        style.transform.push(
          { skewX: transform.skew.x },
          { skewY: transform.skew.y },
        )

      } else style.transform.push(
        { skewX: transform.skew },
        { skewY: transform.skew  },
      )

    if ( transform.translate !== undefined )

      if ( typeof transform.translate === 'object' && !isAnimationValue( transform.translate ) ) {

        style.transform.push(
          { translateX: transform.translate.x },
          { translateY: transform.translate.y },
        )

      } else style.transform.push(
        { translateX: transform.translate },
        { translateY: transform.translate },
      )

    if ( transform.matrix !== undefined )
      style.transformMatrix = transform.matrix

    if ( matrix !== undefined )
      style.transformMatrix = matrix

  }

  return { rest, style }
}

namespace Transform {
  export namespace Attributes {
    export interface Transform {
      perspective?: Compose.AcceptAnimation<number>
      rotate?:
        | Compose.AcceptAnimation<string>
        | {
          x?: Compose.AcceptAnimation<string>
          y?: Compose.AcceptAnimation<string>
          z?: Compose.AcceptAnimation<string>
        }
      scale?:
        | Compose.AcceptAnimation<number>
        | {
          x?: Compose.AcceptAnimation<number>
          y?: Compose.AcceptAnimation<number>
        }
      translate?:
        | Compose.AcceptAnimation<number>
        | {
          x?: Compose.AcceptAnimation<number>
          y?: Compose.AcceptAnimation<number>
        }
      skew?:
        | Compose.AcceptAnimation<string>
        | {
          x?: Compose.AcceptAnimation<string>
          y?: Compose.AcceptAnimation<string>
        }
      matrix?: Compose.AcceptAnimation<number>[]
    }
  }
  export interface Attributes {
    transform?: Attributes.Transform
    matrix?: Compose.AcceptAnimation<number>[]
  }
}

export default Transform
