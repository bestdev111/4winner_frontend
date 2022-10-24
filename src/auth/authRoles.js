/**
 * Authorization Roles
 */
const authRoles = {
    admin: ['admin'],
    agent: ['admin', 'agent'],
    distributor: ['admin', 'agent', 'distributor'],
    cashier: ['admin', 'agent', 'distributor', 'cashier'],
    user: ['admin', 'agent', 'distributor', 'cashier', 'user'],
    onlyGuest: ['guest']
};

export default authRoles;
