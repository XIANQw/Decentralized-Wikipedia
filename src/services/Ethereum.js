import Web3 from 'web3'
import ContractInterface from '../build/contracts/Wikipedia.json'
import * as reducer from '../store/reducers/root'


var contractInstance = null;

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
      contractInstance = contract;
      console.log("Contract: ", contract);
      console.log("Account: ", account);

      dispatch({ type: reducer.CONNECT_ETHEREUM, account, contract })
    } catch (error) {
      console.error(error)
    }
  } else {
    console.log('Not Dapp browser.')
  }
}


const addArticle = () => {
  var id = document.getElementById("inputId").value;
  var content = document.getElementById("inputContent").value;
  contractInstance.methods.addArticle(id, content).send()
}

const modifyArticle = () => {
  var id = document.getElementById("inputId").value;
  var content = document.getElementById("inputContent").value;
  contractInstance.methods.modifyContent(id, content).send();
}

const getAllArticles = async () => {
  var ids = await contractInstance.methods.getAllIds().call();
  var articleArr = new Map();
  for (var i = 0; i < ids.length; i++) {
    articleArr.set(ids[i], await contractInstance.methods.articleContent(ids[i]).call());
  }
  return articleArr;
}

const getArticleById = async () => {
  var id = document.getElementById("inputId").value;
  return await contractInstance.methods.articleContent(id).call();
}

export { connect, addArticle, modifyArticle, getAllArticles, getArticleById }
