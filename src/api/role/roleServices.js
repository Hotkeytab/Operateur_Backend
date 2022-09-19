const { Role } =  require('../../config/index');
const { Permission } =  require('../../config/index');

/**
 * 
 * @returns role list
 */
export const findRoles = async () => {
    return Role.findAll({
        include: [{
            model: Permission,
            as: 'permissions'
        },
    ],
    });
}

/**
 * 
 * @param {Role} role 
 * @description update role if the object contain an id otherwise it create a new one
 */
export const createRole = async (role) => {
    if (role.id) {
        return Role.update(
            role,
            {
                where: {
                    id: role.id
                }
            }
        )
    } else {
        return Role.create(role)
    }
}