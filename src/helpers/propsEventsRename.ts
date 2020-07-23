const propsEventsRename = <O extends { [k: string]: ( ...args: any[] ) => any }, R>( on: O ): R => {
  return Object.entries( on )
    .reduce<R>( ( props, [ key, call ] ) => {
      props['on' + key.replace( /^[a-z]/, ( char ) => char.toUpperCase() )] = call
      return props
    }, {} as R )
}
type On = { [k: string]: ( ...args: any[] ) => any }
type PropsOn = { on?: On }
type RemoveOnInProps<P extends PropsOn> = Omit<P, 'on'> & On

propsEventsRename.fromProps = <
  P extends PropsOn
>( props: P ): RemoveOnInProps<P> => {
  const { on, ...rest } = props

  return { ...rest, ...propsEventsRename( on || {} ) }
}

export default propsEventsRename
