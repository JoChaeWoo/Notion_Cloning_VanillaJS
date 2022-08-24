
import Store from "./Store.js";
import Page from "./Page/Page.js";
import Sidebar from "./Sidebar/Sidebar.js";
import reducer from "../reducer/Reducer.js";
import Modal from "./Modal/Modal.js"

export default function App({ $target }) {

  const store = new Store(
    {
      initialState: {
        nowId: null,
        title: '',
        content: '',
        documents: []
      },
      reducer
    }
  );

  new Sidebar({
    $target,
    store
  })

  new Page({
    $target,
    store
  })

  new Modal({
    $target,
    store
  })

}
