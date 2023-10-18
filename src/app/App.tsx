import { AppHeader } from "../widgets/AppHeader/Header.tsx";
import { Routing } from "../pages";
import { Layout } from "../widgets/Layout.tsx";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";

function App() {
  return (
    <div className="App">
      <Theme>
        <AppHeader />
        <Layout>
          <Routing />
        </Layout>
      </Theme>
    </div>
  );
}

export default App;
