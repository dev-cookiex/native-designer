/* eslint-disable @typescript-eslint/no-unused-vars */

import TouchFeedback from './Feedback'
import TouchHighlight from './Highlight'
import TouchOpacity from './Opacity'
import TouchWithoutFeedback from './WithoutFeedback'

namespace Touch {
  export import Feedback = TouchFeedback
  export import Highlight = TouchHighlight
  export import Opacity = TouchOpacity
  export import WithoutFeedback = TouchWithoutFeedback
}

export default Touch
