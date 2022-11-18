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
                console.log('utils_auth', auth);
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
            console.info("auth is null || undefined:", authArr);
            return true;
        }
        if (authArr.length === 0) {
            console.info("auth is empty[]:", authArr);
            return !userRole || userRole.length === 0;
        }
        console.info("auth arr:", authArr, authArr.includes(userRole));
        if (userRole && Array.isArray(userRole)) {
            return authArr.some((r) => userRole.indexOf(r) >= 0);
        }
        return authArr.includes(userRole);
    }
}

export default Utils;