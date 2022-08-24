import DocumentLinkContainer from "./DocumentLinkContainer.js";
import Editor from "./Editor.js";
export default function DocumentEditorPage({ $target, store }) {
  const $page = document.createElement('div');
  $page.className = 'document-edit-page';

  new Editor({
    $target: $page,
    store
  })

  new DocumentLinkContainer({
    $target: $page,
    store
  })
  this.render = () => {
    $target.appendChild($page);
  }

}
