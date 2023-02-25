import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { useMemo } from 'react';
import { getUserAuthData, getUserRole, UserRole } from '@/entities/User';
import { getRouteForbidden, getRouteMain } from '@/shared/const/router';

interface requireAuthProps {
    children: JSX.Element;
    roles?: UserRole[];
}

export function RequireAuth(props: requireAuthProps) {
    const { roles, children } = props;
    const auth = useSelector(getUserAuthData);
    const location = useLocation();
    const userRole = useSelector(getUserRole);
    const hasRequiredRoles = useMemo(() => {
        if (!roles) {
            return true;
        }
        return roles.some((requiredRole) => {
            const hasRole = userRole?.includes(requiredRole);
            return hasRole;
        });
    }, [roles, userRole]);

    if (!auth) {
        // Redirect them to the /login page, but save the current location they were
        // trying to go to when they were redirected. This allows us to send them
        // along to that page after they login, which is a nicer user experience
        // than dropping them off on the home page.
        return (
            <Navigate to={getRouteMain()} state={{ from: location }} replace />
        );
    }

    if (!hasRequiredRoles) {
        return (
            <Navigate
                to={getRouteForbidden()}
                state={{ from: location }}
                replace
            />
        );
    }

    return children;
}
