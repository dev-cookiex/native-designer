import { FlexStyle } from 'react-native'

import Parser from '../'

const Align: Parser<Align.Attributes, FlexStyle> = attributes => {
  const { align, ...rest } = attributes

  const style: FlexStyle = {}

  if ( align !== undefined )

    if ( typeof align === 'object' ) {

      if ( typeof align.content === 'string' )

        if ( align.content === 'start' || align.content === 'end' )

          style.alignContent = `flex-${align.content}` as 'flex-start' | 'flex-end'

        else if ( align.content === 'between' || align.content === 'around' )

          style.alignContent = `space-${align.content}` as 'space-between' | 'space-around'

        else style.alignContent = align.content

      else if ( align.content ) style.alignContent = 'center'

      if ( typeof align.items === 'string' )

        if ( align.items === 'end' || align.items === 'start' )
          style.alignItems = `flex-${align}` as 'flex-start' | 'flex-end'

        else style.alignItems = align.items

      else if ( align.items ) style.alignItems = 'center'

      if ( typeof align.self === 'string' )

        if ( align.self === 'start' || align.self === 'end' )

          style.alignSelf = `flex-${align.self}` as 'flex-start' | 'flex-end'

        else style.alignSelf = align.self

      else if ( align.self ) style.alignSelf = 'center'

    }

    else if ( typeof align === 'string' )

      if ( align === 'all' ) style.alignItems = style.alignContent = style.alignSelf = 'center'

      else if ( align === 'end' || align === 'start' )
        style.alignItems = `flex-${align}` as 'flex-start' | 'flex-end'

      else style.alignItems = align

    else if ( align ) style.alignItems = 'center'

  return { rest, style }
}

namespace Align {
  export namespace Attributes {
    export type Align =
      | boolean
      | 'all'
      | 'start' | 'end' | 'center' | 'stretch' | 'baseline'
      | {
        items?: boolean | 'start' | 'end' | 'center' | 'stretch' | 'baseline'
        content?: boolean |'start' | 'end' | 'center' | 'stretch' | 'between' | 'around'
        self?: boolean | 'auto' | 'start' | 'end' | 'center' | 'stretch' | 'baseline'
      }
  }
  export interface Attributes {
    align?: Attributes.Align
  }
}

export default Align
