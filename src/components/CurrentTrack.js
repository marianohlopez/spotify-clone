import styled from "styled-components";
import { useStateProvider } from "../utils/stateProvider";

const CurrentTrack = () => {
    const [{ token }, dispatch] = useStateProvider()
    useEffect(() => {
        const getPlaylistData = async () => {
            const response = await axios.get(
                "https://api.spotify.com/v1/me/playlists",
                {
                    headers: {
                        Accept: "application/json",
                        Authorization: "Bearer " + token,
                        "Content-Type": "application/json",
                    },
                }
            )
            const { items } = response.data;
            const playlists = items.map(({ name, id }) => {
                return { name, id }
            })
            dispatch({ type: reducerCases.SET_PLAYLISTS, playlists })
        };
        getPlaylistData();
    }, [token, dispatch])
    return <Container>Footer</Container>
}

const Container = styled.div`

    `;

export default CurrentTrack;