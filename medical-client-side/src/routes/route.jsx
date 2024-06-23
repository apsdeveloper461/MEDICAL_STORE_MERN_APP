import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Store from '../Pages/Store'
import HistoryLog from '../Pages/HistoryLog'
import Dashboard from '../Pages/Dashboard'


const routes = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '',
                element: <Dashboard />,

            },
            {
                path: 'store',
                element: <Store />
            },
            {
                path: 'log',
                element: <HistoryLog />
            }

        ]
    }
])


export default routes