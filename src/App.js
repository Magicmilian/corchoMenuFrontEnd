import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "./Components/Template/Layout";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Layout></Layout>
        </Route>
        <Route exact path="/controlcenter"></Route>
        <Route exact path="*"></Route>
      </Switch>
    </Router>
  );
}

export default App;
