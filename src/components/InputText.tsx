import React, { useMemo, useRef, useImperativeHandle, useEffect, useCallback } from 'react'
import { TextInputProps, TextInput } from 'react-native'

import mask from '../helpers/mask'
import propsObjectRename from '../helpers/propsObjectRename'
import Create from '../tools/Create'
import View from './View'

const InputTextComponent = Create.text<InputText.Props, InputText.Handler>( ( {
  mask: pattern,
  multiline,
  on: { changeText, ...on } = {},
  accessibility,
  placeholder,
  type,
  pointer,
  ...props
}, inputRef ) => {
  const ref = useRef<TextInput & { value: string }>( null )
  const events = propsObjectRename<InputText.TextInputPropsEvent>( 'on', on )
  const access = propsObjectRename<View.ViewPropsAccessibility>( 'accessibility', accessibility || {} )

  if ( multiline && pattern )
    console.warn( 'mask disabled in input multiline' )

  const processPlaceholder = useMemo( () => {
    if ( typeof placeholder === 'string' ) return { text: placeholder, color: undefined }
    return placeholder ?? {}
  }, [ placeholder ] )

  const processType = useMemo( () => {
    if ( !type ) return {}
    switch ( type ) {
      case 'email':
      case 'number':
      case 'phone': return InputText.types[type]
      default: return {}
    }
  }, [ type ] )

  useEffect( () => {
    if ( !ref.current.value ) ref.current.value = ''
  }, [] )

  useImperativeHandle( inputRef, () => ref.current )

  const onChangeText = useCallback( ( text: string ) => {
    if ( ref.current ) {
      if ( pattern ) ref.current.setNativeProps( { text: mask( text, pattern ) } )
      ref.current.value = pattern ? text.replace( /\D/g, '' ) : text
    }
    if ( pattern )
      changeText?.( text.replace( /\D/g, '' ) )

    else changeText?.( text )
  }, [ changeText, pattern ] )
  
  return <TextInput
    {...props}
    {...events}
    {...access}
    {...processType}
    pointerEvents={pointer}
    placeholder={processPlaceholder.text}
    placeholderTextColor={processPlaceholder.color}
    multiline={multiline && !pattern}
    onChangeText={onChangeText}
    ref={inputRef}
  />
} )

const types: {
  [key: string]: TextInputProps
} = {
  email: {
    textContentType: 'emailAddress',
    keyboardType: 'email-address',
    autoCompleteType: 'email',
  },
  phone: {
    textContentType: 'telephoneNumber',
    keyboardType: 'phone-pad',
    autoCompleteType: 'tel'
  },
  number: { keyboardType: 'numeric' }
}

const InputText = Object.assign( InputTextComponent, { types } )

namespace InputText {
  export type TextInputPropsEvent = Pick<TextInputProps,
   | 'onBlur'
   | 'onChange'
   | 'onChangeText'
   | 'onContentSizeChange'
   | 'onEndEditing'
   | 'onFocus'
   | 'onSelectionChange'
   | 'onSubmitEditing'
   | 'onScroll'
   | 'onKeyPress'

   | 'onAccessibilityAction' | 'onAccessibilityEscape' | 'onAccessibilityTap'
   | 'onLayout' | 'onMagicTap' | 'onMoveShouldSetResponder'
   | 'onMoveShouldSetResponderCapture' | 'onResponderEnd' | 'onResponderGrant'
   | 'onResponderMove' | 'onResponderReject' | 'onResponderRelease'
   | 'onResponderStart' | 'onResponderTerminate' | 'onResponderTerminationRequest'
   | 'onStartShouldSetResponder' | 'onStartShouldSetResponderCapture' | 'onTouchCancel'
   | 'onTouchEnd' | 'onTouchEndCapture' | 'onTouchMove' | 'onTouchStart'
  >
  export namespace Props {
    export interface Events {
      blur: TextInputProps['onBlur']
      change: TextInputProps['onChange']
      changeText: TextInputProps['onChangeText']
      contentSizeChange: TextInputProps['onContentSizeChange']
      endEditing: TextInputProps['onEndEditing']
      focus: TextInputProps['onFocus']
      selectionChange: TextInputProps['onSelectionChange']
      submitEditing: TextInputProps['onSubmitEditing']
      scroll: TextInputProps['onScroll']
      keyPress: TextInputProps['onKeyPress']
      accessibilityAction: TextInputProps['onAccessibilityAction']
      accessibilityEscape: TextInputProps['onAccessibilityEscape']
      accessibilityTap: TextInputProps['onAccessibilityTap']
      layout: TextInputProps['onLayout']
      magicTap: TextInputProps['onMagicTap']
      moveShouldSetResponder: TextInputProps['onMoveShouldSetResponder']
      moveShouldSetResponderCapture: TextInputProps['onMoveShouldSetResponderCapture']
      responderEnd: TextInputProps['onResponderEnd']
      responderGrant: TextInputProps['onResponderGrant']
      responderMove: TextInputProps['onResponderMove']
      responderReject: TextInputProps['onResponderReject']
      responderRelease: TextInputProps['onResponderRelease']
      responderStart: TextInputProps['onResponderStart']
      responderTerminate: TextInputProps['onResponderTerminate']
      responderTerminationRequest: TextInputProps['onResponderTerminationRequest']
      startShouldSetResponder: TextInputProps['onStartShouldSetResponder']
      startShouldSetResponderCapture: TextInputProps['onStartShouldSetResponderCapture']
      touchCancel: TextInputProps['onTouchCancel']
      touchEnd: TextInputProps['onTouchEnd']
      touchEndCapture: TextInputProps['onTouchEndCapture']
      touchMove: TextInputProps['onTouchMove']
      touchStart: TextInputProps['onTouchStart']
    }
  }
  export interface Handler extends TextInput {
    value: string
  }
  export interface Props extends View.Props, Omit<TextInputProps, 'placeholder'> {
    on?: Partial<Props.Events>
    type?: 'email' | 'phone' | 'number'
    mask?: string | string[]
    placeholder?: string | {
      text?: string
      color?: string
    }
    multiline?: boolean
  }
}

export default InputText
