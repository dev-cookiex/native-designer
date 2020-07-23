import React, { useContext, PropsWithChildren, useCallback, useMemo, forwardRef } from 'react'
import { GestureResponderEvent, TouchableOpacity } from 'react-native'

import Parser from '../../parser'
import Form from '../Form'
import Text from '../Text'
import Touch from '../Touch'

const Submit = forwardRef<TouchableOpacity, Submit.Props>( ( { children, ...props } ) => {
  const { submit } = useContext( Form.Context )

  const extractedOn = props.on || {}
  
  const extractedPress = extractedOn.press

  const submitCallback = useCallback( ( event: GestureResponderEvent ) => {
    extractedPress?.( event )
    if ( !event.isDefaultPrevented() ) submit()
  }, [ submit, extractedPress ] )

  const on = useMemo( () => ( {
    ...extractedOn,
    press: submitCallback
  } ), [ submitCallback, extractedOn ] )

  return (
    <Touch.Opacity {...props} on={ on } ref={ touch => {
      touch
    } }>
      {children ?? <Text>Submit</Text>}
    </Touch.Opacity>
  )
} )

namespace Submit {
  export interface Props extends PropsWithChildren<{}>, Touch.Opacity.Props, Parser.View.Attributes {}
}

export default Submit
