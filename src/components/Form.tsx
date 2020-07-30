import React, { createContext, RefForwardingComponent, useCallback, useImperativeHandle, useRef, useMemo, useState, forwardRef, PropsWithChildren } from 'react'

import dot from '../tools/dot'

const fieldMap = ( field: Form.Field ) => ( { [field.name]: dot.pick( field.path, field.target ) } )

const FormComponent = forwardRef<Form.Handlers, Form.Props>( ( props, formRef ) => {
  const [ errors, setErrors ] = useState<Form.Errors>( {} )
  const fields = useRef<Form.Field[]>( [] ).current

  const getData = useCallback( () => {
    return Object.assign( {}, ...fields.map( fieldMap ) )
  }, [ fields ] )

  const unregisterField = useCallback( ( field: Form.Field | string ) => {
    const path = typeof field === 'object' ? field.path : field
    const index = fields.findIndex( field => field.path === path )
    const find = fields[index]
    fields.splice( index, 1 )
    props.on?.unregister?.( find, fields )
  }, [ fields, props.on ] )

  const registerField = useCallback( ( field: Form.Field ) => {
    fields.push( field )
    props.on?.register?.( field, fields )
  }, [ fields, props.on ] )

  const registerError = useCallback( ( path: string, ...list: Error[] ) => {
    setErrors( errors => ( {
      ...errors,
      [path]: ( errors[path] ?? [] ).concat( list ),
    } ) )
  }, [] )

  const clearError = useCallback( ( path?: string ) => {
    if ( path && errors[path]?.length ) setErrors( errors => ( {
      ...errors,
      [path]: undefined
    } ) )
    else setErrors( {} )
  }, [ errors ] )

  const clearField = useCallback( ( name?: string | boolean, error = true ) => {
    if ( typeof name === 'string' ) {
      const field = fields.find( field => field.name === name )
      if ( !field ) return void 0
      if ( field.clearValue ) field.clearValue()
      else if ( field.setValue ) field.setValue( '' )
      else dot.set.in( field.path, field.target, '' )
      if ( error ) clearError( field.name )
    }
    else if ( name )
      fields.forEach( field => {
        if ( field.clearValue ) field.clearValue()
        else if ( field.setValue ) field.setValue( '' )
        else dot.set.in( field.path, field.target, '' )
        clearError( field.name )
      } )
    else fields.forEach( field => {
      if ( field.clearValue ) field.clearValue()
      else if ( field.setValue ) field.setValue( '' )
      else dot.set.in( field.path, field.target, '' )
    } )
    return void 0
  }, [ fields, clearError ] )

  const clear = useMemo( () => ( {
    error: clearError,
    field: clearField
  } ), [ clearError, clearField ] )

  const register = useMemo( () => ( {
    field: registerField,
    error: registerError
  } ), [ registerField, registerError ] )

  const unregister = useMemo( () => ( {
    field: unregisterField
  } ), [ unregisterField ] )

  const reset = useCallback( () => clearField(), [ clearField ] )

  const submit = useCallback( () => {
    if ( props.clearOnSubmit ) clearError()
    props.on?.submit?.( getData() )
  }, [ props.on, getData, props.clearOnSubmit, clearError ] )

  const scope = useMemo( () => {
    return props.scope ?? ''
  }, [ props.scope ] )

  const initial = useMemo( () => {
    return props.initial ?? {}
  }, [ props.initial ] )

  const handlers = useMemo( () => ( {
    submit,
    register,
    unregister,
    clear,
    reset,
    getData
  } ), [ submit, register, unregister, clear, reset, getData ] )

  useImperativeHandle( formRef, () => handlers, [ handlers ] )

  const provided = useMemo( () => ( {
    ...handlers,
    scope,
    initial,
    errors
  } ), [ handlers, scope, initial, errors ] )

  return (
    <Context.Provider value={ provided }>
      {props.children}
    </Context.Provider>
  )
} )

const Context = createContext( {} as Form.Context.Body )

interface Form extends React.ForwardRefExoticComponent<Form.Props & React.RefAttributes<Form.Handlers>> {}

const Form = Object.assign( FormComponent, { Context } )

namespace Form {
  export interface Component extends RefForwardingComponent<Handlers, Props> {}

  export namespace Context {
    export interface Body extends Handlers {
      scope: string
      initial: any
      errors: {
        [key: string]: any[]
      }
    }
  }
  export interface Context extends React.Context<Context.Body> {}
  export interface Handlers {
    getData(): any
    submit(): void
    register: {
      field( field: Field ): void
      error( key: string, ...errors: [ Error, ...Error[] ] ): void
    }
    reset(): void
    unregister: {
      field( field: Field | string ): void
    }
    clear: {
      error: {
        (): void
        ( path: string ): void
      }
      field: {
        ( errors?: boolean ): void
        ( path: string, error?: boolean ): void
      }
    }
  }
  export interface Props extends PropsWithChildren<{}> {
    scope?: string
    initial?: any
    clearOnSubmit?: boolean
    on?: {
      submit?: ( data: any ) => void
      register?: ( field: Field, fields: Field[] ) => void
      unregister?: ( field: Field, fields: Field[] ) => void
    }
  }
  export interface Errors {
    [k: string]: Error[]
  }
  export interface Field {
    name: string

    path: string
    target: any
    getValue?: () => any
    setValue?: ( value: any ) => void
    clearValue?: () => void
  }
}

export default Form
