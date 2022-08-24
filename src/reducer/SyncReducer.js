export default function syncReducer(state, eventName, payload = null) {
  switch (eventName) {
    case 'edit-title':
      return { ...state, title: payload.title };
    case 'edit-content':
      return { ...state, content: payload.content };
    case 'get-default-document-state':
      return { ...state, nowId: null, title: '', content: '' };
    case 'display-modal-block':
      return { ...state, nowId: null, title: '', content: '' };
    case 'display-modal-none':
      return { ...state };
    default:
      throw new Error('잘못된 형식의 Action입니다.');
  }
}
