const propsAccessibilityRename = <O extends { [k: string]: any }, R>( on: O ): R => {
  return Object.entries( on )
    .reduce<R>( ( props, [ key, call ] ) => {
      props['accessibility' + key.replace( /^[a-z]/, ( char ) => char.toUpperCase() )] = call
      return props
    }, {} as R )
}
type On = { [k: string]: any }
type PropsOn = { on?: On }
type RemoveOnInProps<P extends PropsOn> = Omit<P, 'on'> & On

propsAccessibilityRename.fromProps = <
  P extends PropsOn
>( props: P ): RemoveOnInProps<P> => {
  const { on, ...rest } = props

  return { ...rest, ...propsAccessibilityRename( on || {} ) }
}

export default propsAccessibilityRename
