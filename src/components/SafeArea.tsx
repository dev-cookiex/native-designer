import React from 'react'
import { SafeAreaView } from 'react-native'

import Create from '../tools/Create'
import View from './View'

const SafeArea = Create.view<SafeArea.Props, SafeAreaView>( ( props, ref ) => {
  return <SafeAreaView ref={ref} { ...View.processProps( props ) }/>
} )

namespace SafeArea {
  export interface Props extends View.Props {}
}

export default SafeArea
