import React, { useRef, useEffect, useCallback, useImperativeHandle, forwardRef } from 'react'

import mask from '../../helpers/mask'
import useField from '../../hooks/useField'
import InputText from '../InputText'

const TextComponent = forwardRef<Text.Handler, Text.Props>( ( {
  name,
  preventErrorStyleChange,
  preventClearErrorOnChange,
  mask: pattern,
  style,
  on: { changeText: propChangeText, ...on } = {},
  ...props
}, inputRef ) => {
  const { register, defaultValue, errors, clear } = useField( name )
  const ref = useRef<InputText.Handler>( null )

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

  const getValue = useCallback( () => ref.current.value, [] )

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

  const hasError = useCallback( () => !!errors.length, [ errors ] )
  const firstError = useCallback( () => errors[0], [ errors ] )

  useImperativeHandle( inputRef, () => ( {
    errors,
    hasError,
    firstError,
    get inputText() { return ref.current }
  } ), [ errors, hasError, firstError ] )

  const changeText = useCallback( ( text: string ) => {
    propChangeText?.( text )
    if ( !preventClearErrorOnChange && errors.length ) clear()
  }, [ propChangeText, preventClearErrorOnChange, clear, errors ] )
  
  return <InputText
    {...props}
    on={ { ...on, changeText } }
    style={ [ style, errors.length && !preventErrorStyleChange && Text.errorStyle ] }
    defaultValue={defaultValue}
    ref={ref}
  />
} )

const errorStyle = { borderWidth: 1, borderColor: 'red' }

const Text = Object.assign( TextComponent, { errorStyle } )

namespace Text {
  export interface Handler {
    hasError(): boolean
    firstError(): Error
    errors: Error[]
    inputText: InputText.Handler
  }
  export interface Props extends InputText.Props {
    name: string
    preventErrorStyleChange?: boolean
    preventClearErrorOnChange?: boolean
  }
}

export default Text
