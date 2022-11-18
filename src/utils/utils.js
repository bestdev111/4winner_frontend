import { authRoles } from "../auth";
class Utils {
    static generateRoutesFromConfigs(configs) {
        let allRoutes = [];
        configs.forEach((config) => {
            allRoutes = [
                ...allRoutes,
                ...this.setRoutes(config)
            ]
        });
        return allRoutes;
    }
    static setRoutes(config) {
        let routes = [...config.routes];

        if (config.auth) {
            routes = routes.map((route) => {
                let auth = config.auth ? [...config.auth] : [];
                auth = route.auth ? [...auth, ...route.auth] : auth;
                return {
                    ...route,
                    auth
                };
            });
        }

        return [...routes];
    }
    static hasPermission(authArr, userRole) {
        if (authArr === null || authArr === undefined) {
            return true;
        }
        if (authArr.length === 0) {
            return !userRole || userRole.length === 0;
        }
        if (userRole && Array.isArray(userRole)) {
            return authArr.some((r) => userRole.indexOf(r) >= 0);
        }
        return authArr.includes(userRole);
    }
}

export default Utils;