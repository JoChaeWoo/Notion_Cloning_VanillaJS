import { actions } from "../../util/constants.js";
import Editor from "../Page/EditorPage/Editor.js";

export default function Modal({ $target, store }) {
  const $overlay = document.createElement('div');
  const $window = document.createElement('div');
  $overlay.className = 'modal-overlay';
  $window.className = 'modal-window';
  $target.appendChild($overlay);
  $target.appendChild($window);

  this.init = () => {
    store.subscribe(actions.displayModalBlock, display);
    this.render();
    this.events();

  }

  const display = () => {
    $overlay.style.display = 'block';
    $window.style.display = 'block';
  }

  this.render = () => {
    $window.innerHTML = `<div class="modal-header"><div class="on-page-button">페이지로 열기</div></div`
    new Editor({ $target: $window, store });
  }

  this.events = () => {
    $overlay.addEventListener('click', () => {
      store.dispatch(actions.displayModalNone);
      $overlay.style.display = 'none';
      $window.style.display = 'none';
    });
    $window.querySelector('.on-page-button').addEventListener('click', () => {
      store.dispatch(actions.displayModalNone);
      $overlay.style.display = 'none';
      $window.style.display = 'none';
    })
  }

  this.init();
}
