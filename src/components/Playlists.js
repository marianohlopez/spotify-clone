import axios from "axios";
import styled from "styled-components";
import { useEffect } from "react";
import { reducerCases } from "../utils/Constants";
import { useStateProvider } from "../utils/stateProvider";

const Playlists = () => {
    const [{ token, playlists }, dispatch] = useStateProvider()
    useEffect(() => {
        const getPlaylistData = async () => {
            const response = await axios.get(
                "https://api.spotify.com/v1/me/playlists",
                {
                    headers: {
                        Accept: "application/json",
                        Authorization: "Bearer " + token,
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
    return (
        <Container>
            <ul>
                {playlists.map(({ name, id }) => {
                    return <li key={id}>{name}</li>;
                })}
            </ul>
        </Container>)
}

const Container = styled.div`
    height: 100%;
    overflow: hidden;
    ul {
        list-style-type: none;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding: 1rem;
        height: 52vh;
        max-height: 100%;
        overflow: auto;
        &::-webkit-scrollbar {
            width: 0.7rem;
            &-thumb {
              background-color: rgba(255, 255, 255, 0.6);
            }
        }
        li {
            display: flex;
            gap: 1rem;
            cursor: pointer;
            transition: 0.3 ease-in-out;
            &:hover {
                color: white;
            }
        }`;

export default Playlists;