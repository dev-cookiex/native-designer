import React from 'react'
import { ViewProps, View as RNView } from 'react-native'

import propsObjectRename from '../helpers/propsObjectRename'
import Create from '../tools/Create'

const ViewComponent = Create.view<View.Props, RNView>( ( receive, ref ) => {
  const props = processProps( receive )
  return <RNView ref={ref} { ...props }/>
} )

const processProps = <P extends View.Props>( receive: P ): View.ProcessedProps<P> => {
  const { on = {}, accessibility = {}, pointer, ...props } = receive

  return {
    ...props,
    ...propsObjectRename<View.ViewPropsEvent>( 'on', on ),
    ...propsObjectRename<View.ViewPropsAccessibility>( 'accessibility', accessibility ),
    pointerEvents: pointer
  }
}

const View = Object.assign( ViewComponent, { processProps } )

namespace View {
  export type ProcessedProps<P extends Props> =
    Omit<P, 'on' | 'accessibility' | 'pointer'> &
    ViewPropsEvent &
    ViewPropsAccessibility &
    Pick<ViewProps, 'pointerEvents'>

  export type ViewTv = Pick<ViewProps,
    | 'tvParallaxMagnification'
    | 'tvParallaxProperties'
    | 'tvParallaxShiftDistanceX'
    | 'tvParallaxShiftDistanceY'
    | 'tvParallaxTiltAngle'
  >
  export type ViewPropsAccessibility = Pick<ViewProps,
   | 'accessibilityActions'
   | 'accessibilityComponentType'
   | 'accessibilityElementsHidden'
   | 'accessibilityHint'
   | 'accessibilityIgnoresInvertColors'
   | 'accessibilityLabel'
   | 'accessibilityLiveRegion'
   | 'accessibilityRole'
   | 'accessibilityState'
   | 'accessibilityTraits'
   | 'accessibilityValue'
   | 'accessibilityViewIsModal'
  >
  export type ViewPropsEvent = Pick<ViewProps,
    | 'onAccessibilityAction'
    | 'onAccessibilityEscape'
    | 'onAccessibilityTap'
    | 'onLayout'
    | 'onMagicTap'
    | 'onMoveShouldSetResponder'
    | 'onMoveShouldSetResponderCapture'
    | 'onResponderEnd'
    | 'onResponderGrant'
    | 'onResponderMove'
    | 'onResponderReject'
    | 'onResponderRelease'
    | 'onResponderStart'
    | 'onResponderTerminate'
    | 'onResponderTerminationRequest'
    | 'onStartShouldSetResponder'
    | 'onStartShouldSetResponderCapture'
    | 'onTouchCancel'
    | 'onTouchEnd'
    | 'onTouchEndCapture'
    | 'onTouchMove'
    | 'onTouchStart'
  >
  export namespace Props {
    export interface Events {
      accessibilityAction: ViewProps['onAccessibilityAction']
      accessibilityEscape: ViewProps['onAccessibilityEscape']
      accessibilityTap: ViewProps['onAccessibilityTap']
      layout: ViewProps['onLayout']
      magicTap: ViewProps['onMagicTap']
      moveShouldSetResponder: ViewProps['onMoveShouldSetResponder']
      moveShouldSetResponderCapture: ViewProps['onMoveShouldSetResponderCapture']
      responderEnd: ViewProps['onResponderEnd']
      responderGrant: ViewProps['onResponderGrant']
      responderMove: ViewProps['onResponderMove']
      responderReject: ViewProps['onResponderReject']
      responderRelease: ViewProps['onResponderRelease']
      responderStart: ViewProps['onResponderStart']
      responderTerminate: ViewProps['onResponderTerminate']
      responderTerminationRequest: ViewProps['onResponderTerminationRequest']
      startShouldSetResponder: ViewProps['onStartShouldSetResponder']
      startShouldSetResponderCapture: ViewProps['onStartShouldSetResponderCapture']
      touchCancel: ViewProps['onTouchCancel']
      touchEnd: ViewProps['onTouchEnd']
      touchEndCapture: ViewProps['onTouchEndCapture']
      touchMove: ViewProps['onTouchMove']
      touchStart: ViewProps['onTouchStart']
    }
    export interface Accessibility {
      actions: ViewProps['accessibilityActions']
      componentType: ViewProps['accessibilityComponentType']
      elementsHidden: ViewProps['accessibilityElementsHidden']
      hint: ViewProps['accessibilityHint']
      ignoresInvertColors: ViewProps['accessibilityIgnoresInvertColors']
      label: ViewProps['accessibilityLabel']
      liveRegion: ViewProps['accessibilityLiveRegion']
      role: ViewProps['accessibilityRole']
      state: ViewProps['accessibilityState']
      traits: ViewProps['accessibilityTraits']
      value: ViewProps['accessibilityValue']
      viewIsModal: ViewProps['accessibilityViewIsModal']
    }
  }
  export interface Props {
    pointer?: ViewProps['pointerEvents']
    on?: Partial<Props.Events>
    accessibility?: Partial<Props.Accessibility>
    accessible?: boolean
  }
}

export default View
