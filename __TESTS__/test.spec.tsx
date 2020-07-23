import React from 'react'
import { View, ViewProps } from 'react-native'
import { create } from 'react-test-renderer'

import Create from '../src/tools/Create'

const Block = Create.view<ViewProps, View>(
  ( props, ref ) => {
    return <View {...props} style={props.style} ref={ref}/>
  } )

describe( 'style test suit', () => {
  it( 'basic attributes', () => {
    const block = create( <Block /> )

    console.log( block.toJSON().props )
  } )
} )
