import { createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Cities from './pages/Cities.jsx'
import Notes from './pages/Notes.jsx'
import Minesweeper from './pages/Minesweeper.jsx'
import TicTac from './pages/TicTac.jsx'
import NotFound from './pages/404.jsx'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
        index: true,
    },
    {
        path: '/cities',
        element: <Cities />,
    },
    {
        path: '/minesweeper',
        element: <Minesweeper />,
    },
    {
        path: '/notes',
        element: <Notes />,
    },
    {
        path: '/tic-Tac',
        element: <TicTac />,
    },
    {
        path: '*',
        element: <NotFound />,
    },
])
