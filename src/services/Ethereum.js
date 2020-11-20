import Web3 from 'web3'
import ContractInterface from '../build/contracts/Wikipedia.json'
import * as reducer from '../store/reducers/root'


const connect = async dispatch => {
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum)
    try {
      const [account] = await window.ethereum.enable()
      const contract = new window.web3.eth.Contract(
        ContractInterface.abi,
        ContractInterface.networks['5777'].address,
        { from: account }
      )
      console.log("Contract: ", contract);
      console.log("Account: ", account);
      dispatch(reducer.connectEthereum({ account, contract }))
    } catch (error) {
      console.error(error)
    }
  } else {
    console.log('Not Dapp browser.')
  }
}


const addArticle = async (dispatch, getState) =>{
  const {contract} = getState()
  var content = document.getElementById("inputContent").value;
  await contract.methods.addArticle(content).send()
}

const getAllIds = (contract) => async dispatch =>{
  const result = await contract.methods.getAllIds().call();
  dispatch({type: reducer.UPDATE_IDS, result})
}

const getAllArtilces = (contract, ids) => async dispatch =>{
  var articles = new Map();
  for(let id of ids){
    articles.set(id, await contract.methods.articleContent(id).call());
  }
  dispatch({type:reducer.UPDATE_ARTICLES, articles})
}


export { connect, addArticle, getAllIds, getAllArtilces}
