import { AppHeader } from "../widgets/AppHeader/Header.tsx";
import { Routing } from "../pages";
import { Layout } from "../widgets/Layout.tsx";

function App() {
  return (
    <div className="App">
      <AppHeader />
      <Layout>
        <Routing />
      </Layout>
    </div>
  );
}

export default App;
