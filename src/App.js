import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Switch, Link, Route } from 'react-router-dom'
import * as Ethereum from './services/Ethereum'
import styles from './App.module.css'
import 'medium-editor/dist/css/medium-editor.css'
import 'medium-editor/dist/css/themes/default.css'
import * as reducer from './store/reducers/root'

var newContent;
export {newContent};

const FormSubmit = (func) => {
  const dispatch = useDispatch();
  const eventHandler = () => dispatch(func);
  return (
    <div className="padding-6">
      <button className="btn btn_outline_primary btn_sm" onClick={eventHandler}>submit</button>
    </div>
  )
}

const Form = (title, func) => {
  const dispatch = useDispatch();
  const updateId = val => {
    dispatch({type: reducer.UPDATE_ID, val })
  }
  const updateContent = val =>{
    dispatch({type: reducer.UPDATE_CONTENT, val })
  }
  const {sending} = useSelector(({sending})=>{
    return sending;
  })
  const submitCom = FormSubmit(func);
  return (
    <div>
    <Home />
    <form>
      <div className={styles.subTitle}>{title}</div>
      <div className={styles.mediumWrapper}>
        <p>id: <input id="inputId" 
        placeholder="the article's id"
        onChange={event=>updateId(event.target.value)}
        value={sending?.id}
        /></p>
        <p><textarea id="inputContent" cols="33" rows="5" className={styles.editable} 
        placeholder="the article's content"
        onChange={event => updateContent(event.target.value)}
        value={sending?.content}
        /></p>
      </div>
      {submitCom}
    </form>
    </div>
  )
}


const getArticleById = async (dispatch, getState) =>{
  const {articles} = getState();
  var id = document.getElementById("inputId").value;
  var content = articles.get(id);
  document.getElementById("searchResult").innerHTML = content;
}


const Home = () => {
  return (
    <div className={styles.links}>
      <Link to="/">Home</Link>
      <Link to="/article/new">Add an article</Link>
      <Link to="/article/modify">Modify articles</Link>
      <Link to="/article/all">All articles</Link>
    </div>
  )
}

const AllArticles = () => {
  const dispatch = useDispatch();
  const [articles, setArticles] = useState(new Map())
  const contract = useSelector(({ contract }) => contract)
  const eventGetArticle = () => dispatch(getArticleById);
  useEffect(() => {
    Ethereum.getAllArticles(contract).then(setArticles);
  }, [contract])
  dispatch({type: reducer.UPDATE_ARTICLES , articles: articles});
  var renderElements = [];
  for(let [id, article] of articles){
    var contentId = "content" + id;
    if(typeof(article)=='string' && article.length > 10){
      article = article.substr(0, 10) + " ...";
    }
    renderElements.push(
      <tr key={id}>
        <td>{id}</td>
        <td id={contentId}>{article}</td>
        <td></td>
      </tr>)
  }
  return (
    <div>
      <Home/>
      <div>
        <div id="searchArticle">
          <div className={styles.title}>Search article</div>
          <input id="inputId" placeholder="the article's id"></input>
          <input type="submit" value="submit" onClick={eventGetArticle}></input>
          <div id="searchResult"></div>
        </div>
        <div className={styles.title}>All articles</div>
        <table boarder="1">
          <thead><tr><th>Id</th><th>Article</th></tr></thead>
          <tbody>
            {renderElements}
          </tbody>
        </table>
      </div>
    </div>
    )
}


const NotFound = () => {
  return <div>Not found</div>
}

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(Ethereum.connect)
  }, [dispatch])
  const formAdd = Form("add article", Ethereum.addArticle);
  const formModify = Form("modify article", Ethereum.modifyArticle);
  return (
    <div className={styles.app}>
      <div className={styles.title}>Welcome to Decentralized Wikipedia</div>
      <Switch>
        <Route path="/article/new">
          {formAdd}
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/article/modify">
          {formModify}
        </Route>
        <Route path="/article/all">
          <AllArticles />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </div>
  )
}

export default App
