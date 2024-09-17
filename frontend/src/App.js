import { Route, Routes } from "react-router-dom"
import "./App.css"
import Layout from "./components/layout/layout"
import AddStock from "./pages/stock/AddStock"
import UpdateStock from "./pages/stock/UpdateStock"
import GetStock from "./pages/stock/GetStock"
import GetTools from "./pages/tools/GetTools"
import UpdateTool from "./pages/tools/UpdateTool"
import AddTool from "./pages/tools/AddTool"
import ErrorModal from "components/modalError/modalError"
import Home from "./pages/home/Home"
import TestComponent from "components/componentTest/test"
import { NotificationsProvider } from "./context/notificationsContext"
import { ToastContainer } from "react-toastify"
function App() {
  return (
    <Layout logged={true}>
      <ErrorModal/>
      <NotificationsProvider>
      <Routes>
        <Route path="/stock/getstock" element={<GetStock />} />
        <Route path="/stock/addstock" element={<AddStock />} />
        <Route path="/stock/updatestock/:id" element={<UpdateStock />} />
        <Route path="/tools/gettools" element={<GetTools />} />
        <Route path="/tools/search" element={<GetTools />} />
        <Route path="/tools/updatetool/:id" element={<UpdateTool />} />
        <Route path="/tools/addtool" element={<AddTool />} />
        <Route path="/" element={<Home/>}/>
        <Route path="/test" element={<TestComponent/>}/>
      </Routes>
        <ToastContainer 
          position="bottom-right" 
          autoClose={5000}
          hideProgressBar={false}
          closeOnClick
          pauseOnHover
          draggable
        />
      </NotificationsProvider>
    </Layout>
  )
}

export default App
