import { User ,Permission, Role } from '../../config/index'


/**
 * 
 * @returns enabled user list
 */
 export const findUser = async (user) => {
    return User.findOne({
        where: {
            username: user.username
        },
        include: [{
            model: Role,
            include: [{
                model: Permission,
            }]
        }],
    });
}