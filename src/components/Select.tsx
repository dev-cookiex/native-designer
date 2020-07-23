import React, { createContext, useState, useCallback, forwardRef, ReactNode, useRef, useEffect, useImperativeHandle, PropsWithChildren, useMemo } from 'react'
import { LayoutChangeEvent } from 'react-native'

import Parser from '../parser'
import List from './List'
import Text from './Text'
import Touch from './Touch'
import View from './View'

interface SelectItemProps<T> {
  set( value: T ): void
  info: List.Item.Info<T | { label: string | ReactNode, value: T }>
  styles?: {
    item?: Parser.View.Attributes
    text?: Parser.Text.Attributes
  }
}

const SelectItem = <T extends any>( { set, info: { item: option }, styles = {} }: SelectItemProps<T> ) => {
  if ( typeof option === 'object' && 'label' in option && 'value' in option )
    if ( typeof option.label === 'string' )
      return (
        <Touch.Opacity on={ { press: set.bind( null, option.value ) } } {...styles.item}>
          <Text {...styles.text}>{option.label}</Text>
        </Touch.Opacity>
      )
    else return (
      <Touch.Opacity on={ { press: set.bind( null, option.value ) } } {...styles.item}>
        {option.label}
      </Touch.Opacity>
    )
  else return (
    <Touch.Opacity on={ { press: set.bind( null, option ) } } {...styles.item}>
      <Text {...styles.text}>{option.toString()}</Text>
    </Touch.Opacity>
  )
}

const SelectComponent = forwardRef<Select.Handlers, Select.Props<any>>( <T extends any>( {
  mode = 'dropdown',
  options,
  children,
  listHeight,
  defaultIndex = 0,
  defaultValue,
  on: { change, ...on } = {},
  styles = {},
  ...props
}: Select.Props<T>, ref ) => {
  const [ open, setOpen ] = useState( false )

  const filterOption = useCallback( ( option: T | { label: string | ReactNode, value: T } ) => {
    if ( 'label' in option && 'value' in option )
      return option.value
    return option
  }, [] )

  const initialValue = useMemo( () => {
    return defaultValue !== undefined ? defaultValue : filterOption( options[defaultIndex] )
  }, [ defaultValue, filterOption, options, defaultIndex ] )

  const [ value, realSetValue ] = useState( initialValue )
  const viewHeight = useRef<number>( undefined )

  const setValue = useCallback( ( value: T ) => {
    change?.( value )
    realSetValue( value )
    setOpen( false )
  }, [ change ] )

  const toggleCallback = useCallback( () => { setOpen( open => !open ) }, [] )

  const closeCallback = useCallback( () => { setOpen( false ) }, [] )

  const openCallback = useCallback( () => { setOpen( true ) }, [] )

  const setValueCallback = useCallback( ( value: any ) => {
    const option = options.find( option => option === value || 'value' in option && option.value === value )

    if ( !option ) throw new Error( '' )
    setValue( filterOption( option ) )
  }, [ options, setValue, filterOption ] )

  const setValueByIndex = useCallback( ( index: number ) => {
    if ( options.length >= index ) throw new Error( '' )

    const option = options[index]

    if ( 'label' in option && 'value' in option )
      setValue( option.value )
    else setValue( option )
  }, [ options, setValue ] )

  const onLayout = useCallback( ( event: LayoutChangeEvent ) => {
    viewHeight.current = event.nativeEvent.layout.height
  }, [] )

  const events = useMemo( () => ( {
    layout: onLayout,
    press: toggleCallback
  } ), [ onLayout, toggleCallback ] )

  useEffect( () => {
    if ( mode !== 'dropdown' ) console.warn( `mode: ${mode} is not allowed` )
  }, [ mode ] )

  const label: ReactNode = useMemo( () => {
    const option = options.find( option => option === value || 'value' in option && option.value === value )
    if ( 'label' in option && 'value' in option ) return option.label
    return option.toString()
  }, [ value, options ] )

  const providerValue = useMemo( () => ( {
    close: closeCallback,
    open: openCallback,
    toggle: toggleCallback,
    select: setValueCallback,
    selectByIndex: setValueByIndex,
    value,
    options,
    isOpen: open,
    label
  } ), [ closeCallback, openCallback, toggleCallback, setValueCallback, setValueByIndex, value, options, open, label ] )

  useImperativeHandle( ref, () => providerValue, [ providerValue ] )

  const render = useCallback(
    ( info: List.Item.Info<T | { label: string | ReactNode, value: T }> ) =>
      <SelectItem set={setValueCallback} info={info} styles={styles}/>,
    [ setValueCallback, styles ]
  )

  const position = useMemo( () => ( {
    type: open ? 'absolute' : 'relative',
    top: viewHeight.current,
    left: 0,
    right: 0
  } as const ), [ open ] )
  
  return (
    <View {...on} {...props}>
      <Touch.Opacity on={events}>
        <Select.Context.Provider value={providerValue}>
          {children}
        </Select.Context.Provider>
      </Touch.Opacity>
      <View {...styles.wrapper || {}} position={position} hidden={!open} >
        <List data={options} height={{ max: listHeight }} nested component={render}/>
      </View>
    </View>
  )
} )

const Select = Object.assign( SelectComponent, {
  Context: createContext( {} as Select.Context )
} )

namespace Select {
  export interface Component extends React.ForwardRefExoticComponent<Select.Handlers & React.RefAttributes<any>> {}
  export namespace Props {
    export interface Events<T> extends View.Props.Events {
      change( value: T ): void
    }
  }
  export interface Props<T> extends PropsWithChildren<{}>, View.Props, Parser.View.Attributes {
    mode?: 'dropdown'
    options: ( T | { label: string | ReactNode, value: T } )[]
    listHeight?: number
    defaultValue?: T
    defaultIndex?: number
    on?: Partial<Props.Events<T>>
    styles?: {
      wrapper?: Parser.View.Attributes
      item?: Parser.View.Attributes
      text?: Parser.Text.Attributes
    }
  }
  export interface Handlers<T = any> {
    open(): void
    close(): void
    toggle(): void
    select( value: T | { label: string | ReactNode, value: T } ): void
    selectByIndex( index: number ): void
    value: T
    isOpen: boolean
    options: T | { label: string | ReactNode, value: T }
    label: ReactNode
  }
  export interface Context<V = unknown> extends Handlers<V> {}
}

export default Select
