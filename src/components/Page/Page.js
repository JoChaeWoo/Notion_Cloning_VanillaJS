import { actions } from "../../util/constants.js";
import DocumentEditorPage from "./EditorPage/DocumentEditorPage.js";
import MainPage from "./MainPage/MainPage.js";

export default function Page({ $target, store }) {
  const $page = document.createElement('div');
  $page.className = 'page-container';
  $target.appendChild($page);

  const documentEditorPage = new DocumentEditorPage({ $target: $page, store });
  const mainPage = new MainPage({ $target: $page });

  this.init = async () => {
    store.subscribe(actions.addRootDocument, pushNextUrl);
    store.subscribe(actions.addSubDocument, pushNextUrl);
    store.subscribe(actions.selectDocument, pushNextUrl);
    store.subscribe(actions.deleteDocument, replaceNextUrl);
    store.subscribe(actions.displayModalNone, documentEditorPage.render);
    this.events();
    this.route();
  }

  const pushNextUrl = () => {
    const { pathname } = window.location;
    const { nowId } = store.getState();
    const nextUrl = `/documents/${nowId}`;
    if (pathname === nextUrl) {
      return;
    }
    history.pushState(null, null, nextUrl);
    this.route();
  }

  const replaceNextUrl = () => {
    const { pathname } = window.location;
    if (pathname === '/') {
      return;
    }
    history.replaceState(null, null, '/');
    this.route();
  }

  this.route = () => {
    $page.innerHTML = '';
    const { pathname } = window.location;
    const [, , nowId] = pathname.split('/');
    if (pathname === '/') {
      mainPage.render();
    } else if (pathname.indexOf('/documents/') === 0) {
      if (nowId !== store.getState().nowId) {
        store.dispatch(actions.selectDocument, { nowId });
      }
      documentEditorPage.render();
    }
  }

  this.events = () => {
    window.addEventListener('popstate', async () => {
      await store.dispatch(actions.getDefaultDocumentState);
      await store.dispatch(actions.loadList);
      this.route();
    })
  }

  this.init();
}
