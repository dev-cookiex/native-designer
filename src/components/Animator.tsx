import React, { ComponentType } from 'react'

import { loadModule } from '../helpers/moduleTools'

const ANIMATOR_REANIMATED_KEY = Symbol( 'animator-key' )
const ANIMATOR_NATIVE_KEY = Symbol( 'animator-key' )

const Animator = <C extends ComponentType<any>>( { component, reanimated, ...props }: Animator.Props<C> ) => {
  const Component = Animator.create( component, reanimated )
  return <Component {...props} />
}

Animator.storage = {} as any,
Animator.create = <C extends ComponentType>( Component: C, reanimated = false ) => {
  let Animated
  if ( !reanimated ) {
    const RN = loadModule( 'react-native' ) as typeof import( 'react-native' )
    Animated = RN.Animated
  } else
    Animated = loadModule( 'react-native-reanimated' ) as typeof import( 'react-native-reanimated' )
  
  const KEY = reanimated ? ANIMATOR_REANIMATED_KEY : ANIMATOR_NATIVE_KEY
  
  if ( !Component[KEY] ) {
    const key = Symbol( `${Component.displayName ?? 'component'} animated` )
    Component[KEY] = key
  
    if ( 'prototype' in Component && 'render' in Component.prototype )
      Animator.storage[key] = Animated.createAnimatedComponent( Component )
  
    else Animator.storage[key] = Animated.createAnimatedComponent(
      class Animated extends React.Component<C extends ComponentType<infer P> ? P : {}> {
          public component: C
          public render = () =>
            <Component { ...this.props as any } ref={ ( component: C ) => this.component = component }/>
      }
    )
  }
  return Animator.storage[Component[ANIMATOR_REANIMATED_KEY]]
}

namespace Animator {
  export type Props<C extends ComponentType<any>> = {
    reanimated?: boolean
    component: C
  } & {
    [K in C extends ComponentType<infer P> ? keyof P : never]+?: C extends ComponentType<infer P> ? P[K] : never
  }
}

export default Animator
