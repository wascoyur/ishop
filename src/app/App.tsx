import { AppHeader } from "../widgets/AppHeader/Header.tsx";
import { Routing } from "../pages";
import { Layout } from "../widgets/Layout.tsx";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import * as Toast from "@radix-ui/react-toast";

function App() {
  return (
    <div className="App">
      <Theme>
        <AppHeader />
        <Toast.Provider swipeDirection="right" duration={5000}>
          <Layout>
            <Routing />
          </Layout>
        </Toast.Provider>
      </Theme>
    </div>
  );
}

export default App;
