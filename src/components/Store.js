
/**
 * @param  {Object} {initialState} 어플리케이션의 전체 상태를 나타내는 Object
 * @param  {Number} {initialState.nowId} 현제 선택되어 편집 중인 Document의 id
 * @param  {String} {initialState.title} 편집 중인 Document의 제목 정보
 * @param  {String} {initialState.content} 편집 중인 Document의 내용 정보
 * @param  {{id: Number, title: String, documents: Object[]} []} {initialState.documents} Document의 정보를 포함한 Object들의 Array
 * @param  {Function} {reducer} 발생한 action dispatch에 따라 state를 갱신하는 function
 */

export default function Store({ initialState, reducer }) {

  this.state = initialState;
  this.reducer = reducer;
  this.listener = {};

  this.subscribe = (action, ...handler) => {
    if (!Array.isArray(this.listener[action])) {
      this.listener[action] = [];
    }
    handler.forEach(handler => this.listener[action].push(handler));
  }

  this.getState = () => this.state;

  this.dispatch = async (action, payload = null) => {
    const nextState = await this.reducer(this.state, action, payload);
    this.state = nextState;
    if (this.listener[action]) {
      this.listener[action].forEach(handler => { handler(); });
    }
  };
}
