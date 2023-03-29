import { store } from '../../API/store'
import { userApiSLice } from '../users/usersApiSlice';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

const Prefetch = () => {
    useEffect(() => {
        console.log('subscribing')
        const users = store.dispatch(userApiSLice.endpoints.getUsers.initiate())

        return () => {
            console.log('unsubscribing')
            users.unsubscribe()
        }
    }, [])

    return <Outlet />
}
export default Prefetch