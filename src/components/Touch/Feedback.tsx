import React from 'react'
import { TouchableNativeFeedbackProps, TouchableNativeFeedback } from 'react-native'

import propsObjectRename from '../../helpers/propsObjectRename'
import Create from '../../tools/Create'
import View from '../View'

const Feedback = Create.view<Feedback.Props, TouchableNativeFeedback>( ( { on, accessibility, ...props }, ref ) => {
  const events = propsObjectRename<Feedback.TouchableNativeFeedbackEventProps>( 'on', on || {} )
  const access = propsObjectRename<View.ViewPropsAccessibility>( 'accessibility', accessibility || {} )

  return <TouchableNativeFeedback { ...{ ...events, ...access, ...props } } ref={ref} />
} )

namespace Feedback {
  export type TouchableNativeFeedbackEventProps = Pick<TouchableNativeFeedbackProps,
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
      accessibilityAction: TouchableNativeFeedbackProps['onAccessibilityAction']
      accessibilityEscape: TouchableNativeFeedbackProps['onAccessibilityEscape']
      accessibilityTap: TouchableNativeFeedbackProps['onAccessibilityTap']
      blur: TouchableNativeFeedbackProps['onBlur']
      focus: TouchableNativeFeedbackProps['onFocus']
      layout: TouchableNativeFeedbackProps['onLayout']
      longPress: TouchableNativeFeedbackProps['onLongPress']
      magicTap: TouchableNativeFeedbackProps['onMagicTap']
      press: TouchableNativeFeedbackProps['onPress']
      pressIn: TouchableNativeFeedbackProps['onPressIn']
      pressOut: TouchableNativeFeedbackProps['onPressOut']
    }
  }
  export interface Props extends Pick<View.Props, 'accessibility'> {
    on?: Partial<Props.Events>
  }
}

export default Feedback
