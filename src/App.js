import { useEffect } from "react";
import Login from "./components/Login.js";
import Spotify from "./components/Spotify.js";
import { reducerCases } from "./utils/Constants.js";
import { useStateProvider } from "./utils/stateProvider.js";

function App() {
  const [state, dispatch] = useStateProvider();
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const token = hash.substring(1).split("&")[0].split("=")[1];
      dispatch({ type: reducerCases.SET_TOKEN, token });
    }
  }, [state.token, dispatch]);

  return <div>{state.token ? <Spotify /> : <Login />}</div>;
}

export default App;
