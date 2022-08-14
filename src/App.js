import {Route, Routes} from "react-router-dom";
import {CreatePost, Home} from "pages";

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/create-post" element={<CreatePost/>} />
        </Routes>
    )
}

export default App