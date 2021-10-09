import "bootstrap";
import "./assets/styles/styles.scss";
import "./assets/styles/demo.scss";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import AdminLayout from "./components/AdminLayout";
import Todo from "./pages/Todo";
import data from "./data/data";
import BootstrapComponent from "./pages/BootstrapComponent";

function App() {
  return (
    <BrowserRouter>
      <AdminLayout>
        <Switch>
          {data.map((val, index) => (
            <Route path={val.route} key={index}>
              <BootstrapComponent data={val} />
            </Route>
          ))}
          <Route path="/" component={Todo} />
        </Switch>
      </AdminLayout>
    </BrowserRouter>
  );
}

export default App;
