import React, { useEffect, useRef, forwardRef, useCallback } from 'react'

import useField from '../../hooks/useField'
import SelectComponent from '../Select'

const SelectC = forwardRef<SelectComponent.Handlers, Select.Props>( ( { name, ...props }, ref ) => {
  const { register } = useField( name )
  const select = useRef<SelectComponent.Handlers>( null )

  useEffect( () => {
    register( {
      path: 'value',
      target: select.current
    } )
  }, [ register ] )

  const refCallback = useCallback( ( selectRef: SelectComponent.Handlers ) => {
    if ( typeof ref === 'function' ) ref( selectRef )
    else if ( ref !== null ) ref.current = selectRef
    select.current = selectRef
  }, [ ref ] )

  return <SelectComponent {...props} ref={refCallback}/>
} )

const Select = Object.assign( SelectC, { Context: SelectComponent.Context } )

namespace Select {
  export interface Props<T = unknown> extends SelectComponent.Props<T> {
    name: string
  }
}

export default Select
