import React from 'react'
import { TouchableHighlightProps, TouchableHighlight } from 'react-native'

import propsObjectRename from '../../helpers/propsObjectRename'
import Create from '../../tools/Create'
import View from '../View'

const Highlight = Create.view<Highlight.Props, TouchableHighlight>( ( { on, accessibility, ...props }, ref ) => {
  const events = propsObjectRename<Highlight.TouchableOpacityEventProps>( 'on', on || {} )
  const access = propsObjectRename<View.ViewPropsAccessibility>( 'accessibility', accessibility || {} )

  return <TouchableHighlight { ...{ ...events, ...access, ...props } } ref={ref} />
} )

namespace Highlight {
  export type TouchableOpacityEventProps = Pick<TouchableHighlightProps,
    | 'onAccessibilityAction'
    | 'onAccessibilityEscape'
    | 'onAccessibilityTap'
    | 'onBlur'
    | 'onFocus'
    | 'onLayout'
    | 'onLongPress'
    | 'onMagicTap'
    | 'onPress'
    | 'onPressIn'
    | 'onPressOut'
  >
  export namespace Props {
    export interface Events {
      accessibilityAction: TouchableHighlightProps['onAccessibilityAction']
      accessibilityEscape: TouchableHighlightProps['onAccessibilityEscape']
      accessibilityTap: TouchableHighlightProps['onAccessibilityTap']
      blur: TouchableHighlightProps['onBlur']
      focus: TouchableHighlightProps['onFocus']
      layout: TouchableHighlightProps['onLayout']
      longPress: TouchableHighlightProps['onLongPress']
      magicTap: TouchableHighlightProps['onMagicTap']
      press: TouchableHighlightProps['onPress']
      pressIn: TouchableHighlightProps['onPressIn']
      pressOut: TouchableHighlightProps['onPressOut']
    }
  }
  export interface Props extends Pick<View.Props, 'accessibility'> {
    on?: Partial<Props.Events>
  }
}

export default Highlight
