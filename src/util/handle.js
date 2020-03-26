import { Message } from 'view-design'

export function HandleError(error) {
  Message.warning({
    content: error,
    duration: 1.5,
  })
}
