require('should');
const Barrels = require('barrels');
const barrels = new Barrels(process.cwd()+'/test/fixtures');
const fixtures = barrels.data;

const RESET_TABLES = 'TRUNCATE role RESTART IDENTITY CASCADE';
const roles = fixtures.role;
const admin = fixtures.account.admin;
let admin_role_id = '';

describe('Account Model', function() {
    beforeEach( async () => {
        // Truncate role table with restarting identity
        await sails.getDatastore('test').sendNativeQuery(RESET_TABLES);

        // Create admin and user role
        for (let role of roles) {
            await Role.create({roleName: role.role_name}).fetch();
        };

        admin_role_id = await Role.findOne({ roleName: 'admin' }).id;
    })

    it('It should create a new Account record', async () => {
        const newAccount = await Account.create({
            userCode: admin.user_code,
            password: admin.password,
            email: admin.email,
            joiningDate: admin.joining_date,
            officialDate: admin.official_date,
            contactType: admin.contact_type,
            position: admin.position,
            idCard: admin.id_card,
            roleId: admin_role_id,
        }).fetch();

        if (newAccount.email !== admin.email) {
            return new Error(
                `Should return exactly ${admin.email} from mocking data. ` + 
                `But instead, got role's name ${newAccount.email}.`
            );
        };
    });
})