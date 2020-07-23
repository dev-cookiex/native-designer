import React from 'react'
import { Text as RNText, TextProps } from 'react-native'

import propsObjectRename from '../helpers/propsObjectRename'
import Create from '../tools/Create'

const Text = Create.text<Text.Props, RNText>( ( { on, ...props } ) => {
  const events = propsObjectRename<Text.RNTextEventProps>( 'on', on || {} )
  return <RNText {...props} {...events}/>
} )

namespace Text {
  export type RNTextEventProps = Pick<TextProps,
    | 'onAccessibilityAction'
    | 'onAccessibilityEscape'
    | 'onAccessibilityTap'
    | 'onLayout'
    | 'onLongPress'
    | 'onMagicTap'
    | 'onPress'
  >
  export namespace Props {
    export interface Events {
      accessibilityAction: TextProps['onAccessibilityAction']
      accessibilityEscape: TextProps['onAccessibilityEscape']
      accessibilityTap: TextProps['onAccessibilityTap']
      layout: TextProps['onLayout']
      longPress: TextProps['onLongPress']
      magicTap: TextProps['onMagicTap']
      press: TextProps['onPress']
    }
  }
  export interface Props {
    on?: Partial<Props.Events>
  }
}

export default Text
