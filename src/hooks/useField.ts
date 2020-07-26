import { useContext, useCallback, useMemo } from 'react'

import Form from '../components/Form'
import dot from '../tools/dot'

const useField = ( fieldName: string ) => {
  const {
    scope,
    initial,
    errors: formErrors,
    clear: { error: clearError },
    register: { field: registerField },
    unregister
  } = useContext( Form.Context )

  const name = useMemo( () => {
    return scope ? `${scope}.${fieldName}` : fieldName
  }, [ fieldName, scope ] )
  
  const register = useCallback( ( field: Omit<Form.Field, 'name'> & Pick<Partial<Form.Field>, 'name'> ) => {
    registerField( { name, ...field } )
    return () => unregister.field( name )
  }, [ name, registerField, unregister ] )

  const defaultValue = useMemo( () => {
    return dot.pick( name, initial )
  }, [ name, initial ] )
  
  const errors = useMemo( () => {
    return formErrors[name] || []
  }, [ name, formErrors ] )

  const clear = useCallback( () => {
    clearError( name )
  }, [ name, clearError ] )

  return { name, register, defaultValue, errors, clear }
}

namespace useField {}

export default useField
