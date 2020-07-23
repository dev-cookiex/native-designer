import React, { useContext, PropsWithChildren } from 'react'

import Form from './Form'

const Scope = ( props: PropsWithChildren<Scope.Props> ) => {
  const { scope, ...context } = useContext( Form.Context )

  return (
    <Form.Context.Provider value={ {
      ...context,
      scope: scope ? `${scope}.${props.path}` : props.path
    } }>
      {props.children}
    </Form.Context.Provider>
  )
}

namespace Scope {
  export interface Props {
    path: string
  }
}

export default Scope
