import React from 'react'
import { TouchableOpacity, TouchableOpacityProps } from 'react-native'

import propsObjectRename from '../../helpers/propsObjectRename'
import Create from '../../tools/Create'
import View from '../View'

const Opacity = Create.view<Opacity.Props, TouchableOpacity>( ( { on, accessibility, ...props }, ref ) => {
  const events = propsObjectRename<Opacity.TouchableOpacityEventProps>( 'on', on || {} )
  const access = propsObjectRename<View.ViewPropsAccessibility>( 'accessibility', accessibility || {} )

  return <TouchableOpacity { ...{ ...events, ...access, ...props } } ref={ref} />
} )

namespace Opacity {
  export type TouchableOpacityEventProps = Pick<TouchableOpacityProps,
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
      accessibilityAction: TouchableOpacityProps['onAccessibilityAction']
      accessibilityEscape: TouchableOpacityProps['onAccessibilityEscape']
      accessibilityTap: TouchableOpacityProps['onAccessibilityTap']
      blur: TouchableOpacityProps['onBlur']
      focus: TouchableOpacityProps['onFocus']
      layout: TouchableOpacityProps['onLayout']
      longPress: TouchableOpacityProps['onLongPress']
      magicTap: TouchableOpacityProps['onMagicTap']
      press: TouchableOpacityProps['onPress']
      pressIn: TouchableOpacityProps['onPressIn']
      pressOut: TouchableOpacityProps['onPressOut']
    }
  }
  export interface Props extends Pick<View.Props, 'accessibility'> {
    on?: Partial<Props.Events>
  }
}

export default Opacity
