import { getDocumentsAll, deleteDocument, creatDocument, getDocument } from "../util/api.js";

export default function asyncReducer(state, eventName, payload = null) {
  switch (eventName) {
    case 'load-list':
      return loadList(state);
    case 'delete-document':
      if (!payload) {
        throw new Error('삭제하려는 파일을 찾을 수 없습니다.');
      }
      const { allId } = payload;
      return deleteDocumentAll(state, allId);
    case 'add-sub-document':
      const { parentId } = payload;
      return addSubDocument(state, parentId);
    case 'add-root-document':
      return addRootDocument(state);
    case 'select-document':
      const nextState = { ...state, nowId: payload.nowId }
      return loadDocument(nextState);
    default:
      throw new Error('잘못된 형식의 Action입니다.');
  }
}

async function loadList(state) {
  const documents = await getDocumentsAll();
  return { ...state, documents }
}

async function loadDocument(state) {
  const document = await getDocument(state.nowId);
  return { ...state, title: document.title, content: document.content };
}

async function deleteDocumentAll(state, allId) {
  const allPromise = allId.map(id => deleteDocument(id));
  await Promise.all(allPromise);
  const documents = await getDocumentsAll();
  return { ...state, documents, nowId: null, title: '', content: '' };
}

async function addSubDocument(state, parentId) {
  const newDocument = await creatDocument('', parentId);
  const documents = await getDocumentsAll();
  return { ...state, documents, nowId: newDocument.id, title: '', content: '' };
}

async function addRootDocument(state) {
  const newDocument = await creatDocument('');
  const documents = await getDocumentsAll();
  return { ...state, documents, nowId: newDocument.id, title: '', content: '' };
}
