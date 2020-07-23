import React from 'react'
import { TouchableWithoutFeedbackProps, TouchableWithoutFeedback } from 'react-native'

import propsObjectRename from '../../helpers/propsObjectRename'
import Create from '../../tools/Create'
import View from '../View'

const WithoutFeedback = Create.view<WithoutFeedback.Props, TouchableWithoutFeedback>(
  ( { on, accessibility, ...props }, ref ) => {
    const events = propsObjectRename<WithoutFeedback.TouchableWithoutFeedbackEventProps>( 'on', on || {} )
    const access = propsObjectRename<View.ViewPropsAccessibility>( 'accessibility', accessibility || {} )

    return <TouchableWithoutFeedback { ...{ ...events, ...access, ...props } } ref={ref} />
  } )

namespace WithoutFeedback {
  export type TouchableWithoutFeedbackEventProps = Pick<TouchableWithoutFeedbackProps,
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
      accessibilityAction: TouchableWithoutFeedbackProps['onAccessibilityAction']
      accessibilityEscape: TouchableWithoutFeedbackProps['onAccessibilityEscape']
      accessibilityTap: TouchableWithoutFeedbackProps['onAccessibilityTap']
      blur: TouchableWithoutFeedbackProps['onBlur']
      focus: TouchableWithoutFeedbackProps['onFocus']
      layout: TouchableWithoutFeedbackProps['onLayout']
      longPress: TouchableWithoutFeedbackProps['onLongPress']
      magicTap: TouchableWithoutFeedbackProps['onMagicTap']
      press: TouchableWithoutFeedbackProps['onPress']
      pressIn: TouchableWithoutFeedbackProps['onPressIn']
      pressOut: TouchableWithoutFeedbackProps['onPressOut']
    }
  }
  export interface Props extends Pick<View.Props, 'accessibility'> {
    on?: Partial<Props.Events>
  }
}

export default WithoutFeedback
