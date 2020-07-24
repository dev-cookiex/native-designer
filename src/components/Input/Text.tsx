import React, { useRef, useEffect, useCallback, useMemo } from 'react'
import { TextInput, TextInputProps } from 'react-native'

import mask from '../../helpers/mask'
import propsObjectRename from '../../helpers/propsObjectRename'
import useField from '../../hooks/useField'
import Create from '../../tools/Create'
import View from '../View'

const TextComponent = Create.text<Text.Props, TextInput>( ( {
  name,
  mask: pattern,
  multiline,
  on: { changeText, ...on } = {},
  accessibility,
  style,
  placeholder,
  type,
  size,
  pointer,
  ...props
}, inputRef ) => {
  const { register, defaultValue, errors, clear } = useField( name )
  const ref = useRef<TextInput & { value: string }>( null )
  const events = propsObjectRename<Text.TextInputPropsEvent>( 'on', on )
  const access = propsObjectRename<View.ViewPropsAccessibility>( 'accessibility', accessibility || {} )

  useEffect( () => {
    if ( defaultValue ) {
      if ( pattern ) ref.current.setNativeProps( { text: mask( defaultValue.replace( /\D/g, '' ), pattern ) } )
      else ref.current.setNativeProps( { text: defaultValue } )

      ref.current.value = pattern ? defaultValue.replace( /\D/g, '' ) : defaultValue
    }
  }, [ defaultValue, pattern ] )

  const setValue = useCallback( ( text: string ) => {
    if ( pattern ) ref.current.setNativeProps( { text: mask( text.replace( /\D/g, '' ), pattern ) } )
    else ref.current.setNativeProps( { text } )

    ref.current.value = pattern ? text.replace( /\D/g, '' ) : text
  }, [ pattern ] )

  const getValue = useCallback( () => {
    if ( pattern ) return ref.current.value
    return ref.current.value
  }, [ pattern ] )

  const clearValue = useCallback( () => {
    ref.current.value = ''
    ref.current.clear?.()
  }, [] )

  useEffect( () => {
    register( {
      path: 'value',
      target: ref.current,
      setValue,
      getValue,
      clearValue
    } )
  } )

  if ( multiline && pattern )
    console.warn( 'mask disabled in input multiline' )

  const onChangeText = useCallback( ( text: string ) => {
    if ( ref.current ) {
      if ( pattern ) ref.current.setNativeProps( { text: mask( text, pattern ) } )
      ref.current.value = pattern ? text.replace( /\D/g, '' ) : text
      if ( errors.length ) clear()
    }
    if ( pattern )
      changeText?.( text.replace( /\D/g, '' ) )

    else changeText?.( text )
  }, [ changeText, pattern, clear, errors ] )

  const refCallback = useCallback( ( input: TextInput ) => {
    if ( typeof inputRef === 'function' ) inputRef( input )
    else if ( inputRef !== null ) inputRef.current = input
    ref.current = input as any
  }, [ inputRef ] )

  const processPlaceholder = useMemo( () => {
    if ( typeof placeholder === 'string' ) return { text: placeholder, color: undefined }
    return placeholder ?? {}
  }, [ placeholder ] )

  const processType = useMemo( () => {
    if ( !type ) return {}
    switch ( type ) {
      case 'email':
      case 'number':
      case 'phone': return preSetTypes[type as 'email' | 'number' | 'phone']
      default: return {
        textContentType: type.content,
        keyboardType: type.keyboard,
        autoCompleteType: type.autoComplete
      }
    }
  }, [ type ] )
  
  return <TextInput
    {...props}
    {...events}
    {...access}
    {...processType}
    style={ [ style, {
      height: typeof style === 'object' && 'height' in style ? style.height : size,
      fontSize: size
    }, errors.length && {
      borderWidth: 1,
      borderColor: 'red'
    } ] }
    pointerEvents={pointer}
    placeholder={processPlaceholder.text}
    placeholderTextColor={processPlaceholder.color}
    multiline={multiline && !pattern}
    onChangeText={onChangeText}
    defaultValue={defaultValue}
    ref={refCallback}
  />
} )

const preSetTypes = {
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
} as const

const Text = TextComponent

namespace Text {

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
  export interface Props extends View.Props, Omit<TextInputProps, 'placeholder'> {
    name: string
    on?: Props.Events
    size?: number
    type?: 'email' | 'phone' | 'number' | {
      content?: TextInputProps['textContentType']
      keyboard?: TextInputProps['keyboardType']
      autoComplete?: TextInputProps['autoCompleteType']
    }
    mask?: string | string[]
    placeholder?: string | {
      text?: string
      color?: string
    }
    multiline?: boolean
  }
}

export default Text
