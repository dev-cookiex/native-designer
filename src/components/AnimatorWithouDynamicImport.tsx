import React, { ComponentType } from 'react'
import { Animated } from 'react-native'

const ANIMATOR_REANIMATED_KEY = Symbol( 'animator-key' )
const ANIMATOR_NATIVE_KEY = Symbol( 'animator-key' )

const AnimatorWithouDynamicImport = <C extends ComponentType<any>>(
  { component, ...props }: AnimatorWithouDynamicImport.Props<C> ) => {
  const Component = AnimatorWithouDynamicImport.create( component )
  return <Component {...props} />
}

AnimatorWithouDynamicImport.storage = {} as any,
AnimatorWithouDynamicImport.create = <C extends ComponentType>( Component: C ) => {  
  const KEY = ANIMATOR_NATIVE_KEY
  
  if ( !Component[KEY] ) {
    const key = Symbol( `${Component.displayName ?? 'component'} animated` )
    Component[KEY] = key

    AnimatorWithouDynamicImport.storage[key] = Animated.createAnimatedComponent(
      class AnimatorContainer extends React.Component<C extends ComponentType<infer P> ? P : {}> {
        public component: C
        public render = () =>
          <Component { ...this.props as any } ref={ ( component: C ) => this.component = component }/>
      }
    )
  }
  return AnimatorWithouDynamicImport.storage[Component[ANIMATOR_REANIMATED_KEY]]
}

namespace AnimatorWithouDynamicImport {
  export type Props<C extends ComponentType<any>> = {
    component: C
  } & {
    [K in C extends ComponentType<infer P> ? keyof P : never]+?: C extends ComponentType<infer P> ? P[K] : never
  }
}

export default AnimatorWithouDynamicImport
