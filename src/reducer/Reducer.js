import asyncReducer from "./AsyncReducer.js";
import syncReducer from "./SyncReducer.js";

export default function reducer(state, action, payload = null) {
  const [domain, eventName] = action.split('/');
  switch (domain) {
    case 'async':
      return asyncReducer(state, eventName, payload);
    case 'sync':
      return syncReducer(state, eventName, payload);
    default:
      throw new Error('잘못된 형식의 Action입니다.');
  }
}
