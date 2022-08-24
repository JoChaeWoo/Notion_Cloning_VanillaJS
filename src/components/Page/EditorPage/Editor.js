import { actions } from "../../../util/constants.js";
import { updateDocument } from "../../../util/api.js";

export default function Editor({ $target, store }) {
  const $editor = document.createElement('div');
  $editor.className = 'document-editor';
  $target.appendChild($editor);

  this.init = () => {
    store.subscribe(actions.selectDocument, this.render);
    store.subscribe(actions.addRootDocument, this.render);
    store.subscribe(actions.addSubDocument, this.render);
    store.subscribe(actions.getDefaultDocumentState, this.render);
    store.subscribe(actions.displayModalBlock, this.render);
    store.subscribe(actions.displayModalNone, this.render);
    store.subscribe(actions.editContent, updateDebounce);
    store.subscribe(actions.editTitle, updateDebounce);
    $editor.innerHTML = `
      <div contentEditable="true" name="title" placeholder="제목 없음"></div>
      <div contentEditable="true" name="content" placeholder="내용을 입력해주세요"></div>
    `;
    this.events();
  }

  this.render = () => {
    const { title, content } = store.getState();
    $editor.querySelector('[name=title]').textContent = title;
    $editor.querySelector('[name=content]').innerHTML = content ? splitLine(content) : '';
  }

  const splitLine = (content) => {
    return `${content.split('\n').map(line => `<div contentEditable="true">${line}</div>`).join('')}`;
  }

  let editTimer = null;
  const updateDebounce = () => {
    const { nowId, title, content } = store.getState();
    if (editTimer !== null) {
      clearTimeout(editTimer);
    }
    editTimer = setTimeout(async () => {
      await updateDocument(nowId, { title, content });
      editTimer = null;
      store.dispatch(actions.loadList);
    }, 2000)
  }

  this.events = () => {
    $editor.querySelector('[name=title]').addEventListener('input', (e) => {
      store.dispatch(actions.editTitle, { title: e.target.innerText });
    })

    $editor.querySelector('[name=content]').addEventListener('input', (e) => {
      store.dispatch(actions.editContent, { content: e.target.innerText });
    })
    $editor.querySelector('[name=title]').addEventListener('keydown', (e) => {
      if (e.isComposing) return
      switch (e.key) {
        case 'Enter':
          e.preventDefault()
          e.currentTarget.nextElementSibling.focus();
      }
    })
  }
  this.init();
}
