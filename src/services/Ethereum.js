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
      dispatch({type: reducer.CONNECT_ETHEREUM, account, contract })
    } catch (error) {
      console.error(error)
    }
  } else {
    console.log('Not Dapp browser.')
  }
}


const addArticle = async (dispatch, getState) =>{
  const {contract} = getState();
  var id = document.getElementById("inputId").value;
  var content = document.getElementById("inputContent").value;
  await contract.methods.addArticle(id, content).send()
}

const modifyArticle = async (dispatch, getState) => {
  const {contract} = getState();
  var id = document.getElementById("inputId").value;
  var content = document.getElementById("inputContent").value;
  await contract.methods.modifyContent(id, content).send()
}

const getAllArticles = async (contract) => {
  var ids = await contract.methods.getAllIds().call();
  var articleArr = new Map();
  for(var i=0;i<ids.length;i++) {
    articleArr.set(ids[i], await contract.methods.articleContent(ids[i]).call());
  }
  return articleArr;
}

const getArticleById = async(contract) => {
  var id = document.getElementById("inputId").value;
  return await contract.methods.articleContent(id).call();
}

export { connect, addArticle, modifyArticle, getAllArticles, getArticleById}
