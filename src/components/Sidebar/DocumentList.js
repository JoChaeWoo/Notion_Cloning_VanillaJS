import { triangle, pageIcon, plus, triangleRotate } from "../../style/svg.js";
import { actions, SESSION_STORAGE_KEY } from "../../util/constants.js";
import { getItem, setItem } from "../../util/storage.js";
export default function DocumentList({
  $target,
  store
}) {
  const $documentList = document.createElement('div');
  $documentList.className = 'document-list';
  $target.appendChild($documentList);

  this.init = () => {
    store.subscribe(actions.loadList, this.render, setFocusItem);
    store.subscribe(actions.deleteDocument, this.render, setFocusItem);
    store.subscribe(actions.addSubDocument, this.render);
    store.subscribe(actions.addRootDocument, this.render);
    store.subscribe(actions.selectDocument, setFocusItem);
    store.subscribe(actions.editTitle, setTitle);
    store.dispatch(actions.loadList);
    this.events();
  }

  const creatDocumentTree = (root, depth = 0) => {
    if (root.title === '') {
      root.title = '제목없음';
    }
    const nowDepth = depth + 1;
    const $div = `
    <div class="document-tree-item" data-id="${root.id}" data-selected="false" style="padding-left:${nowDepth * 20}px">
      <div data-hasEvent="true" class="toggle-button">${root.documents.length === 0 ? triangle : triangleRotate}</div>
      <div data-hasEvent="true" class="document-list-title-container">
        <div style="margin: 0px 5px 0px 5px">${pageIcon}</div>
        <div class="document-title">${root.title}</div>
      </div>
      <button data-hasEvent="true" class="remove-button">x</button>
      <button data-hasEvent="true" class="append-button">+</button>
    </div>
    `
    if (root.documents.length === 0) {
      return $div;
    }
    return `
    ${$div}
    <div class="sub-document-container" data-parent="${root.id}">
      ${root.documents.map(child => `${creatDocumentTree(child, nowDepth)}`).join('')}
    </div>`;

  }

  this.render = () => {
    const { documents } = store.getState();
    $documentList.innerHTML = `
      <div class="document-tree-list">
        ${documents.map(root => creatDocumentTree(root)).join('')}
        <div class="document-tree-item"><div class="make-new-document" data-hasEvent="true">${plus} 페이지 추가</div></div>
      </div>
    `;
    const toggledLists = getItem(SESSION_STORAGE_KEY, {
      toggledId: []
    });
    toggledLists.toggledId.forEach(id => {
      if ($documentList.querySelector(`[data-parent="${id}"]`)) {
        $documentList.querySelector(`[data-parent="${id}"]`).style.display = 'none';
      }
    })
  }

  const getAllSubDocumentId = (id) => {
    const result = [id];
    const $target = $documentList.querySelector(`[data-parent="${id}"]`);
    if ($target) {
      $target.querySelectorAll('div.document-tree-item').forEach($div => {
        result.push($div.dataset.id);
      })
    }
    return result;
  }

  const toggleList = ($target, id) => {
    const $ul = $documentList.querySelector(`[data-parent="${id}"]`);
    if (!$ul) { return; }
    const toggledLists = getItem(SESSION_STORAGE_KEY, {
      toggledId: []
    });
    const newListSet = new Set(toggledLists.toggledId);
    if ($ul.style.display === 'none') {
      $target.innerHTML = triangleRotate;
      $ul.style.display = 'block';
      newListSet.delete(id);
    } else {
      $target.innerHTML = triangle;
      $ul.style.display = 'none';
      newListSet.add(id);
    }
    setItem(SESSION_STORAGE_KEY, {
      toggledId: [...newListSet.values()]
    })
  }

  const setFocusItem = () => {
    const { nowId } = store.getState();
    const $focus = $documentList.querySelector('[data-selected="true"]');
    if ($focus) {
      $focus.setAttribute('data-selected', 'false');
    }
    const $nextFocus = $documentList.querySelector(`[data-id="${nowId}"]`);
    if ($nextFocus) {
      $nextFocus.setAttribute('data-selected', 'true');
    }
  }

  const setTitle = () => {
    const { title, nowId } = store.getState();
    const $titleDiv = $documentList.querySelector(`[data-id="${nowId}"]  .document-title`);
    if (!$titleDiv) { return; }
    $titleDiv.textContent = title === '' ? '제목없음' : title;
  }

  this.events = () => {
    $documentList.addEventListener('click', e => {
      const $li = e.target.closest('.document-tree-item');
      const $target = e.target.closest('[data-hasEvent="true"]');
      if (!$li || !$target) { return; }
      const { id } = $li.dataset;
      const { className } = $target;
      switch (className) {
        case "document-list-title-container":
          store.dispatch(actions.selectDocument, { nowId: id });
          break;
        case "remove-button":
          $li.style.display = 'none';
          const $sub = $documentList.querySelector(`[data-parent="${id}"]`);
          if ($sub) $sub.style.display = 'none';
          store.dispatch(actions.deleteDocument, { allId: getAllSubDocumentId(id) });
          break;
        case "append-button":
          store.dispatch(actions.addSubDocument, { parentId: id });
          store.dispatch(actions.displayModalBlock);
          break;
        case "make-new-document":
          store.dispatch(actions.addRootDocument);
          break;
        case "toggle-button":
          toggleList($target, id);
          break;
      }
    })
  }

  this.init();
}
