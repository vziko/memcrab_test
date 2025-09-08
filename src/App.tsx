import 'assets/scss/App.scss'
import { MatrixProvider } from "./context/MatrixContext.tsx";
import { FormArguments } from "./components/FormArguments/FormArguments.tsx";
import { MatrixTable } from "./components/MatrixTable/MatrixTable.tsx";

function App() {

    return (
        <MatrixProvider>
            <h1 className="global-title">Table Parameters</h1>
            <FormArguments/>
            <MatrixTable/>
        </MatrixProvider>
    )
}

export default App
