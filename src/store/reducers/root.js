export const CONNECT_ETHEREUM = 'CONNECT_ETHEREUM'
export const UPDATE_USER = 'UPDATE_USER'
export const UPDATE_ACCOUNT = 'UPDATE_ACCOUNT'
export const UPDATE_CONTRACT = 'UPDATE_CONTRACT'
export const UPDATE_ARTICLES = 'UPDATE_ARTICLES'
export const UPDATE_ID = 'UPDATE_ID'
export const UPDATE_CONTENT = 'UPDATE_CONTENT'
export const UPDATE_IDS = 'UPDATE_IDS'


const initialState = {
  user : null,
  account : null,
  contract : null,
  articles : null,
  sending:{
    id: null,
    content : null
  },
  ids : null
}

const connectEthereum = (state, { account, contract }) => {
  return {...state, account, contract}
}

const updateUser = (state, { user }) => { 
  return { ...state, user }
}

const updateAccount = (state, {account}) => {
  return {...state, account}
}

const updateContract = (state, {contract}) => {
  return {...state, contract}
}

const updateArticles = (state, {articles}) => {
  return {...state, articles}
}

const updateId = (state, {id}) => {
  const sending = {...state.sending, id: id}
  return {...state, sending}
}

const updateContent = (state, {content}) => {
  const sending = {...state.sending, content: content}
  return {...state, sending}
}

const updateIds = (state, {ids}) => {
  return { ...state, ids}
}

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONNECT_ETHEREUM:
      return connectEthereum(state, action);
    case UPDATE_USER:
      return updateUser(state, action)
    case UPDATE_ACCOUNT:
      return updateAccount(state, action);
    case UPDATE_CONTRACT:
      return updateContract(state, action);
    case UPDATE_ARTICLES :
      return updateArticles(state, action);
    case UPDATE_ID:
      return updateId(state, action);
    case UPDATE_CONTENT:
      return updateContent(state, action)
    case UPDATE_IDS:
      return updateIds(state, action);
    default:
      return state
  }
}

export default rootReducer