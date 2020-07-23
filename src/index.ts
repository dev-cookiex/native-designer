/* eslint-disable @typescript-eslint/no-unused-vars */

import ComponentAnimator from './components/Animator'
import ComponentForm from './components/Form'
import ComponentInput from './components/Input'
import ComponentSafeArea from './components/SafeArea'
import ComponentScope from './components/Scope'
import ComponentScroll from './components/Scroll'
// import ComponentSelect from './components/Select'
import ComponentText from './components/Text'
import ComponentTouch from './components/Touch'
import ComponentView from './components/View'
import hookUseField from './hooks/useField'
import DesignerParser from './parser'
import DesignerCreate from './tools/Create'
import DesignerCompose from './typings/compose'

// export { default as Form } from './components/Form'
// export { default as Input } from './components/Input'
// export { default as SafeArea } from './components/SafeArea'
// export { default as Scope } from './components/Scope'
// export { default as Scroll } from './components/Scroll'
// export { default as View } from './components/View'

// export { default as Create } from './tools/Create'

// export { default as useField } from './hooks/useField'

namespace Designer {
  export import Create = DesignerCreate
  export import Parser = DesignerParser
  export import Compose = DesignerCompose

  export import View = ComponentView
  export import Form = ComponentForm
  export import Scope = ComponentScope
  export import Input = ComponentInput
  export import Scroll = ComponentScroll
  export import SafeArea = ComponentSafeArea
  export import Animator = ComponentAnimator
  export import Touch = ComponentTouch
  export import Text = ComponentText
  // export import Select = ComponentSelect

  export import useField = hookUseField
}

// export import Parser = Designer.Parser

// [ Parser ]

export = Designer
