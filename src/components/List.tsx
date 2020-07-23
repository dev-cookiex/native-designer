import React, { ComponentType, ReactElement, useCallback, useMemo } from 'react'
import { FlatList, ListRenderItemInfo, FlatListProps, ViewStyle } from 'react-native'

import propsObjectRename from '../helpers/propsObjectRename'
import Parser from '../parser'
import Scroll from './Scroll'
import View from './View'

const List = <T, N extends boolean = false>( {
  data,
  cols,
  normalize,
  children,
  component: Component,
  accessibility,
  on,
  nested,
  styles,
  separator,
  cell,
  indicator,
  prefixkey,
  ...rest
}: List.Props<T, N> ) => {
  const events = propsObjectRename<List.FlatListEventProps<T>>( 'on', on || {} )
  const access = propsObjectRename<View.ViewPropsAccessibility>( 'accessibility', accessibility || {} )
  const render = useCallback( ( info: List.Item.Info<T> ) => {
    if ( Component )
      return <Component {...info} />

    if ( !children ) throw new Error( '' )

    if ( Array.isArray( children ) ) throw new Error( '' )

    if ( !React.isValidElement( children ) ) throw new Error( '' )

    const props = { ...children.props as any || {}, ...info }

    return React.cloneElement( children, props )
  }, [ children, Component ] )

  const _data = useMemo( () => {
    if ( normalize ) return List.normalize( data, cols )
    return data
  }, [ data, cols, normalize ] )

  const { rest: props, style } = Parser.View( rest )

  const parserdStyles = useMemo( () => {
    return Object.entries( styles || {} )
      .reduce( ( styles, [ key, toParser ] ) => {
        styles[key] = Parser.View( toParser ).style
        return styles
      }, {} as any )
  }, [ styles ] )

  return <FlatList
    style={ parserdStyles.wrapper }
    contentContainerStyle={ style as ViewStyle }
    ListFooterComponentStyle={ parserdStyles.footer }
    ListHeaderComponentStyle={ parserdStyles.header }
    columnWrapperStyle={ parserdStyles.column }
    ItemSeparatorComponent={ separator }
    CellRendererComponent={ cell }
    ListFooterComponent={undefined}
    ListHeaderComponent={undefined}
    showsHorizontalScrollIndicator={ !!indicator }
    showsVerticalScrollIndicator={ !!indicator }
    indicatorStyle={ typeof indicator === 'string' && indicator || undefined }
    data={_data}
    renderItem={render}
    nestedScrollEnabled={nested}
    keyExtractor={ ( item, index ) => `${prefixkey || ''}${index}` }
    {...events}
    {...access}
    {...props}
  />
}

const normalize = <T extends any>( data: T[], mod: number ) => {
  const resource: ( T | null )[] = data
  while( data.length % mod ) resource.push( null )
  return resource
}

List.normalize = normalize

namespace List {
  export namespace Item {
    export interface Info<T> extends ListRenderItemInfo<T> {}
  }
  export type FlatListEventProps<T> = Pick<FlatListProps<T>,
    | 'onAccessibilityAction'
    | 'onAccessibilityTap'
    | 'onAccessibilityEscape'
    | 'onLayout'
    | 'onMagicTap'
    | 'onContentSizeChange'
    | 'onEndReached'
    | 'onEndReachedThreshold'
    | 'onMomentumScrollBegin'
    | 'onMomentumScrollEnd'
    | 'onMoveShouldSetResponder'
    | 'onMoveShouldSetResponderCapture'
    | 'onRefresh'
    | 'onResponderEnd'
    | 'onResponderGrant'
    | 'onResponderMove'
    | 'onResponderReject'
    | 'onResponderRelease'
    | 'onResponderStart'
    | 'onResponderTerminate'
    | 'onResponderTerminationRequest'
    | 'onScroll'
    | 'onScrollAnimationEnd'
    | 'onScrollBeginDrag'
    | 'onScrollEndDrag'
    | 'onScrollToIndexFailed'
    | 'onScrollToTop'
    | 'onStartShouldSetResponder'
    | 'onStartShouldSetResponderCapture'
    | 'onTouchCancel'
    | 'onTouchEnd'
    | 'onTouchEndCapture'
    | 'onTouchMove'
    | 'onTouchStart'
    | 'onViewableItemsChanged'
  >
  export type Component<T, P extends Component.Props<T>> = ComponentType<P>
  export namespace Component {
    export interface Props<T, N extends boolean = false> {
      item: N extends true ? T | null : T
      separator: any
    }
  }
  export namespace Props {
    export interface Events<T> {
      accessibilityAction: FlatListProps<T>['onAccessibilityAction']
      accessibilityTap: FlatListProps<T>['onAccessibilityTap']
      accessibilityEscape: FlatListProps<T>['onAccessibilityEscape']
      layout: FlatListProps<T>['onLayout']
      magicTap: FlatListProps<T>['onMagicTap']
      contentSizeChange: FlatListProps<T>['onContentSizeChange']
      endReached: FlatListProps<T>['onEndReached']
      endReachedThreshold: FlatListProps<T>['onEndReachedThreshold']
      momentumScrollBegin: FlatListProps<T>['onMomentumScrollBegin']
      momentumScrollEnd: FlatListProps<T>['onMomentumScrollEnd']
      moveShouldSetResponder: FlatListProps<T>['onMoveShouldSetResponder']
      moveShouldSetResponderCapture: FlatListProps<T>['onMoveShouldSetResponderCapture']
      refresh: FlatListProps<T>['onRefresh']
      responderEnd: FlatListProps<T>['onResponderEnd']
      responderGrant: FlatListProps<T>['onResponderGrant']
      responderMove: FlatListProps<T>['onResponderMove']
      responderReject: FlatListProps<T>['onResponderReject']
      responderRelease: FlatListProps<T>['onResponderRelease']
      responderStart: FlatListProps<T>['onResponderStart']
      responderTerminate: FlatListProps<T>['onResponderTerminate']
      responderTerminationRequest: FlatListProps<T>['onResponderTerminationRequest']
      scroll: FlatListProps<T>['onScroll']
      scrollAnimationEnd: FlatListProps<T>['onScrollAnimationEnd']
      scrollBeginDrag: FlatListProps<T>['onScrollBeginDrag']
      scrollEndDrag: FlatListProps<T>['onScrollEndDrag']
      scrollToIndexFailed: FlatListProps<T>['onScrollToIndexFailed']
      scrollToTop: FlatListProps<T>['onScrollToTop']
      startShouldSetResponder: FlatListProps<T>['onStartShouldSetResponder']
      startShouldSetResponderCapture: FlatListProps<T>['onStartShouldSetResponderCapture']
      touchCancel: FlatListProps<T>['onTouchCancel']
      touchEnd: FlatListProps<T>['onTouchEnd']
      touchEndCapture: FlatListProps<T>['onTouchEndCapture']
      touchMove: FlatListProps<T>['onTouchMove']
      touchStart: FlatListProps<T>['onTouchStart']
      viewableItemsChanged: FlatListProps<T>['onViewableItemsChanged']
    }
  }
  export type Props<T, N extends boolean = false, C extends number = 1> = Scroll.Props & Parser.View.Attributes & { 
    data: ( N extends true ? T | null : T )[]
    prefixkey?: string
    cols?: C
    normalize?: N
    on?: Partial<Props.Events<T>>
    accessibility?: Partial<View.Props.Accessibility>
    separator?: FlatListProps<T>['ItemSeparatorComponent']
    cell?: FlatListProps<T>['CellRendererComponent']
    header?: FlatListProps<T>['ListHeaderComponent']
    footer?: FlatListProps<T>['ListFooterComponent']
    styles?: {
      wrapper?: Parser.View.Attributes
      header?: Parser.View.Attributes
      footer?: Parser.View.Attributes
      column?: C extends 1 ? undefined : Parser.View.Attributes
    }
  } & (
    | { component: Component<T, any>, children?: undefined }
    | { children: ReactElement<Component.Props<T, N>>, component?: undefined }
  )
}

export default List
