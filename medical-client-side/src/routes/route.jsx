import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Store from '../Pages/Store'
import HistoryLog from '../Pages/HistoryLog'
import Dashboard from '../Pages/Dashboard'


const route = createBrowserRouter({
    path: '/',
    element: <App />,
    children: [
        {
            path: '',
            element: <Dashboard />,
            children: [
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
    ]
})


export default route