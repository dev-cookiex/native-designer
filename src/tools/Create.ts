import { ForwardRefExoticComponent, ForwardRefRenderFunction, forwardRef, PropsWithoutRef, RefAttributes, PropsWithChildren } from 'react'
import { ViewStyle, TextStyle, ImageStyle, StyleProp } from 'react-native'

import Image from '../parser/image'
import Text from '../parser/text'
import View from '../parser/view'

namespace Create {
  export interface DesignExoticComponent<P> extends ForwardRefExoticComponent<PropsWithChildren<P>> {}
  export interface DesignRenderFunction<P, T> extends ForwardRefRenderFunction<T, P> {}
  export type DesignProps<P, A, T> = A & PropsWithoutRef<P> & RefAttributes<T>
  export type DesignResumedProps<P, A, S> = Omit<P, keyof A> & { style: StyleProp<S> }
  export type GetDesignProps<
    C extends DesignExoticComponent<any>
  > = C extends DesignExoticComponent<infer P> ? PropsWithChildren<P> : never

  export const view = <P, T = any>(
    render: DesignRenderFunction<P & { style: StyleProp<ViewStyle> }, T>
  ): DesignExoticComponent<DesignProps<P & { style?: StyleProp<ViewStyle> }, View.Attributes, T>> => {
    return forwardRef<T, P & View.Attributes>( ( props, ref ) => {
      return render( View.resume( props ) as P & { style: StyleProp<ViewStyle> }, ref )
    } ) as any
  }
  export const text = <P, T = any>(
    render: DesignRenderFunction<P & { style: StyleProp<TextStyle> }, T>
  ): DesignExoticComponent<DesignProps<P & { style?: StyleProp<TextStyle> }, Text.Attributes, T>> => {
    return forwardRef<T, P & Text.Attributes>( ( props, ref ) => {
      return render( Text.resume( props ) as P & { style: StyleProp<TextStyle> }, ref )
    } ) as any
  }
  export const image = <P, T = any>(
    render: DesignRenderFunction<P & { style: StyleProp<ImageStyle> }, T>
  ): DesignExoticComponent<DesignProps<P & { style?: StyleProp<ImageStyle> }, Image.Attributes, T>>  => {
    return forwardRef<T, P & Image.Attributes>( ( props, ref ) => {
      return render( Image.resume( props ) as P & { style: StyleProp<ImageStyle> }, ref )
    } ) as any
  }
}

export default Create
