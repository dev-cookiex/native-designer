let blacklist = [ '__proto__', 'prototype', 'constructor' ]
let blacklistFilter = ( part ) => blacklist.includes( part )

const parse = {
  path: ( path: string ) => {
    const parts = path.replace( /\.?\[/g, '.' ).replace( /\]/g, '' ).split( /\.|\[/ )
    if ( parts.some( blacklistFilter ) )
      throw Error( 'Refusing to update blacklisted property ' + path )
    return parts
  }
}
const regexp = {
  number: /\d+/
}
const is = {
  index: ( key: string ) => regexp.number.test( key )
}

const fill = ( path: string, target: any, value: any ) => {
  const parts = parse.path( path )
  return parts.reduce( ( last, key, i, parts ) => {

    if ( last === undefined )
      if ( is.index( key ) ) last = []
      else last = {}

    if ( i + 1 === parts.length ) last[key] = value

    else if ( last[key] === undefined )
      last[key] = is.index( parts[i + 1] ) ? [] : {}

    return last[key]
  }, target )
}

export const object = ( object: { [key: string]: any } ) => {
  return Object.entries( object ).reduce( ( group, [ key, value ] ) => {
    return fill( key, group, value )
  }, {} )
}

export const pick = ( path: string, object: any ) => {
  return parse.path( path ).reduce( ( object, key ) => {
    if ( object === undefined || object === null ) return object
    return object[key]
  }, object )
}

export const set: {
  ( path: string, object: any, value: any ): any
  ( map: { [key: string]: any }, object: any ): any
  in: {
    ( path: string, object: any, value: any ): any
    ( map: { [key: string]: any }, object: any ): any
  }
} = ( path: string | { [key: string]: any }, object: any, value?: any ) => {
  const target = Object.assign( {}, object )

  set.in( path as any, target, value )

  return target
}

set.in = ( path: string | { [key: string]: any }, target: any, value?: any ) => {
  if ( typeof path === 'object' )

    Object.entries( path ).forEach( ( [ path, value ] ) => {
      fill( path, target, value )
    } )

  else fill( path, target, value )

  return target
}

const dot = { object, pick, set }

export default dot
