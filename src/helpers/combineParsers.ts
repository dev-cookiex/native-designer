import { StyleSheet } from 'react-native'

import Parser from '../parser'

export interface CombinedParsersComplete<
  A extends { [k: string]: any },
  S extends Parser.PureStyle
> extends combineParsers.CombinedParser<A, S> {
  list: Parser<{ [k: string]: any }, any>[]
  parent: CombinedParsersComplete<A, S> | null
  childrens: CombinedParsersComplete<A, S>[]
}

export const createCombinedParsers = <
  A extends { [k: string]: any },
  S extends Parser.PureStyle
>() => {
  let list: Parser<{ [k: string]: any }, any>[] = []
  let parent: CombinedParsersComplete<A, S> | null = null
  const childrens: CombinedParsersComplete<A, S>[] = []

  const parser: Parser<A, S> = props => {
    return combined.list.reduce<Parser.Return<any, any, any>>( ( result, parser ) => {
      const { rest, style } = parser( result.rest )
      return { rest, style: StyleSheet.flatten( [ result.style, style ] ) }
    }, { rest: props as any, style: {} } as Parser.Return<any, any, any> )
  }

  const register = ( ...parsers: Parser<{ [k: string]: any }, any>[] ) => {
    combined.list.push( ...parsers )
    combined.childrens.forEach( combined => combined.register( ...parsers ) )
    return combined
  }
  const unregister = ( ...parsers: Parser<{ [k: string]: any }, any>[] ) => {
    combined.list = combined.list.filter( parser => !parsers.includes( parser ) )
    combined.childrens.forEach( combined => combined.unregister( ...parsers ) )
    return combined
  }

  const clone = () => {
    const child = createCombinedParsers<A, S>()
    child.register( ...combined.list )
    combined.childrens.push( child )
    child.parent = combined
    return combined
  }

  const resume = <P extends A>( props: P ): Omit<P, keyof A> & { style: S } => {
    const { rest, style } = combined( props ) as any

    return {
      ...rest,
      style: StyleSheet.flatten( [ style, rest.style ] )
    }
  }

  const combined: CombinedParsersComplete<A, S> =
    Object.assign( parser, { list, parent, childrens, register, unregister, clone, resume } )

  return combined
}

const combineParsers = <
  A extends { [k: string]: any },
  S extends any
>( ...parsers: Parser<any, any>[] ): combineParsers.CombinedParser<A, S> => {
  const combined = createCombinedParsers<A, S>()

  combined.register( ...parsers )

  return combined
}

namespace combineParsers {
  export interface CombinedParser<
    A extends { [k: string]: any },
    S extends Parser.PureStyle
  > extends Parser<A, S> {
    register( ...parsers: Parser<{ [k: string]: any }, any>[] ): CombinedParser<A, S>
    unregister( ...parsers: Parser<{ [k: string]: any }, any>[] ): CombinedParser<A, S>
    clone(): CombinedParser<A, S>
    resume<P extends A>( props: P ): Omit<P, keyof A> & { style: S }
  }
}

export default combineParsers
