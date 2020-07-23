const propsObjectRename = <R>( prefix: string, object: any ): R => {
  return Object.entries( object )
    .reduce<R>( ( props, [ key, call ] ) => {
      props[prefix + key.replace( /^[a-z]/, ( char ) => char.toUpperCase() )] = call
      return props
    }, {} as R )
}

export default propsObjectRename
