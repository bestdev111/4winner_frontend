/**
 * Authorization Roles
 */
const authRoles = {
    admin: ['admin'],
    agent: ['admin', 'agent'],
    distributor: ['admin', 'distributor'],
    cashier: ['admin', 'cashier'],
    user: ['admin', 'agent', 'distributor', 'cashier', 'user'],
    onlyGuest: ['guest'],
    adminPM: ['admin', 'agent', 'distributor', 'cashier']
};

export default authRoles;
