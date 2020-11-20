export const UPDATE_USER = 'UPDATE_USER'
export const CONNECT_ETHEREUM = 'CONNECT_ETHEREUM'
export const UPDATE_ARTICLES = 'UPDATE_ARTICLES'
export const UPDATE_IDS = 'UPDATE_IDS'

const initialState = {
  user: null,
  account: null,
  contract: null,
  articles: null,
  ids : null
}

const updateUser = user => ({ type: UPDATE_USER, user })
const updateIds = ids => ({type: UPDATE_IDS, ids})

const connectEthereum = ({ account, contract }) => ({
  type: CONNECT_ETHEREUM,
  account,
  contract,
})

const updateArticles = articles => ({type: UPDATE_ARTICLES, articles})

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_USER:
      const { user } = action
      return { ...state, user }
    case CONNECT_ETHEREUM:
      const { account, contract } = action
      return { ...state, account, contract }
    case UPDATE_ARTICLES:
      const {articles} = action
      return {...state, articles}
    default:
      return state
  }
}

export default rootReducer
export { updateUser, updateIds, connectEthereum, updateArticles}
