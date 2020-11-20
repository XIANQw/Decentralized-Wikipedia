import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Switch, Link, Route } from 'react-router-dom'
import * as Ethereum from './services/Ethereum'
import styles from './App.module.css'
// import MediumEditor from 'medium-editor'
import 'medium-editor/dist/css/medium-editor.css'
import 'medium-editor/dist/css/themes/default.css'


var newContent;
export {newContent};

const FormSubmit = () => {
  const dispatch = useDispatch();
  const addArticle = () => dispatch(Ethereum.addArticle);
  return (
    <div className="padding-6">
      <button className="btn btn_outline_primary btn_sm" onClick={addArticle}>Add</button>
    </div>
  )
}

const NewArticle = () => {
  return (
    <div>
    <Home />
    <form>
      <div className={styles.subTitle}>New article</div>
      <div className={styles.mediumWrapper}> 
        <textarea id="inputContent" cols="33" rows="5" className={styles.editable}/>
      </div>
      <FormSubmit />
    </form>
    </div>
  )
}

const Home = () => {
  return (
    <div className={styles.links}>
      <Link to="/">Home</Link>
      <Link to="/article/new">Add an article</Link>
      <Link to="/article/all">All articles</Link>
    </div>
  )
}



const UpdateArticle = (event) => {
  console.log(event.target.id);
}


const AllArticles = () => {
  const [articles, setArticles] = useState(new Map())
  const contract = useSelector(({ contract }) => contract)
  useEffect(() => {
    async function fetchArticles(){
      if (contract) {
        var ids = await contract.methods.getAllIds().call();
        console.log("ids: ", ids);
        var articleArr = new Map();
        for(var i=0;i<ids.length;i++) {
          articleArr.set(ids[i], await contract.methods.articleContent(ids[i]).call());
        }
        setArticles(articleArr);
      }
    }
    fetchArticles();
  }, [contract, setArticles])
  var renderElements = [];
  for(let [id, article] of articles){
    renderElements.push(<tr key={id}><td>{id}</td><td>{article}</td><td><input id={id} onClick={UpdateArticle} type="submit" value="modify" /></td></tr>)
  }
  return (
    <div>
      <Home/>
      <div>
        <div className={styles.title}>All articles</div>
        <table boarder="1">
          <thead><tr><th>Id</th><th>Article</th><th>Event</th></tr></thead>
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
  return (
    <div className={styles.app}>
      <div className={styles.title}>Welcome to Decentralized Wikipedia</div>
      <Switch>
        <Route path="/article/new">
          <NewArticle />
        </Route>
        <Route exact path="/">
          <Home />
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
