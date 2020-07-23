import React from 'react'
import { ScrollViewProps, ScrollView, ViewStyle } from 'react-native'

import ViewParser from '../parser/view'
import Create from '../tools/Create'
import View from './View'

const ScrollComponent = Create.view<Scroll.Props, ScrollView>( ( { style, ...receive }, ref ) => {
  const { indicator, styles, nested, ...props } = processProps( receive )
  return <ScrollView
    showsHorizontalScrollIndicator={ !!indicator }
    showsVerticalScrollIndicator={ !!indicator }
    indicatorStyle={ typeof indicator === 'string' && indicator || undefined }
    contentContainerStyle={ style }
    style={ styles.wrapper }
    ref={ref}
    nestedScrollEnabled={nested}
    { ...props }/>
} )

const processProps = <P extends Scroll.Props>( receive: P ): Scroll.ProcessedProps<P> => {
  const { styles, ...props } = View.processProps( receive )

  return { ...props, styles: Object.fromEntries(
    Object.entries( styles || {} )
      .map( ( [ key, style ] ) => [ key, ViewParser( style ).style ] )
  ) } as any
}

const Scroll = Object.assign( ScrollComponent, { processProps } )

namespace Scroll {
  export type ProcessedProps<P extends Props> =
    Omit<View.ProcessedProps<P>, 'wrapperStyle' | keyof ScrollViewPropsEvent> &
    ScrollViewPropsEvent &
    { styles: {
      wrapper: ViewStyle
    } }

  export type ScrollViewPropsEvent = Pick<ScrollViewProps,
   | keyof View.ViewPropsEvent
   | 'onContentSizeChange'
   | 'onScroll'
   | 'onScrollBeginDrag'
   | 'onScrollEndDrag'
   | 'onMomentumScrollEnd'
   | 'onMomentumScrollBegin'
   | 'onScrollAnimationEnd'
   | 'onScrollToTop'
  >
  export namespace Props {
    export interface Events extends View.Props.Events {
      contentSizeChange: ScrollViewProps['onContentSizeChange']
      scroll: ScrollViewProps['onScroll']
      scrollBeginDrag: ScrollViewProps['onScrollBeginDrag']
      scrollEndDrag: ScrollViewProps['onScrollEndDrag']
      momentumScrollEnd: ScrollViewProps['onMomentumScrollEnd']
      momentumScrollBegin: ScrollViewProps['onMomentumScrollBegin']
      scrollAnimationEnd: ScrollViewProps['onScrollAnimationEnd']
      scrollToTop: ScrollViewProps['onScrollToTop']
    }
  }
  export interface Props extends View.Props {
    on?: Partial<Props.Events>
    indicator?: boolean | 'default' | 'black' | 'white'
    styles?: {
      wrapper?: ViewParser.Attributes
    }
    nested?: boolean
  }
}

export default Scroll
