import { actions } from "../../../util/constants.js";
import { pageIcon } from "../../../style/svg.js";
export default function DocumentLinkContainer({ $target, store }) {
  const $linkContainer = document.createElement('div');
  $linkContainer.className = 'document-link-container';
  $target.appendChild($linkContainer);

  this.init = () => {
    store.subscribe(actions.selectDocument, this.render);
    this.events();
  }

  const findDocument = (nowId, document) => {
    if (document.id === Number(nowId)) {
      return document;
    }
    if (document.documents.length !== 0) {
      return document.documents.map(item => findDocument(nowId, item))
    }
    return;
  }
  this.render = () => {
    const { nowId, documents } = store.getState();
    const [nowDocument] = documents
      .map(document => findDocument(nowId, document))
      .flat(Infinity)
      .filter(item => item);

    if (!nowDocument) {
      $linkContainer.innerHTML = '';
      return;
    }
    $linkContainer.innerHTML = `
      ${nowDocument.documents.map(item => `
      <div class="document-link" data-id="${item.id}">
        ${pageIcon}
        ${item.title} 
      </div>
      `).join('')}
    `;
  }

  this.events = () => {
    $linkContainer.addEventListener('click', e => {
      const { id } = e.target.dataset;
      store.dispatch(actions.selectDocument, { nowId: id });
    })
  }

  this.init();
}
