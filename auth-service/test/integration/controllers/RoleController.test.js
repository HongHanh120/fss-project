const url = 'http://localhost:8000';

var sails = require('sails');
var request = require('supertest')(url);
const Barrels = require('barrels');
require('should');

const barrels = new Barrels(process.cwd()+'/test/fixtures');
const fixtures = barrels.data;

const roles = fixtures.role;
const admin = fixtures.account.admin;
const user = fixtures.account.user;
const RESET_TABLES = 'TRUNCATE role RESTART IDENTITY CASCADE';

const jwtServie = require('../../../api/services/jwToken');
let access_token = '';
let adminRecord = {};
let userRecord = {};

describe('Role Controller', () => {
    describe('POST /api/v1/role/create', function() {
        beforeEach(async () => {
            // Truncate role table with restarting identity
            await sails.getDatastore('test').sendNativeQuery(RESET_TABLES);
    
            // Create admin and user role
            for (let role of roles) {
                await Role.create({roleName: role.role_name}).fetch();
            };
    
            const admin_role = await Role.findOne({ roleName: 'admin' });
            const user_role = await Role.findOne({ roleName: 'user' });
    
            adminRecord = await Account.create({
                userCode: admin.user_code,
                password: admin.password,
                email: admin.email,
                joiningDate: admin.joining_date,
                officialDate: admin.official_date,
                contactType: admin.contact_type,
                position: admin.position,
                idCard: admin.id_card,
                roleId: admin_role.id,
            }).fetch();
    
            userRecord = await Account.create({
                userCode: user.user_code,
                password: user.password,
                email: user.email,
                joiningDate: user.joining_date,
                officialDate: user.official_date,
                contactType: user.contact_type,
                position: user.position,
                idCard: user.id_card,
                roleId: user_role.id,
            }).fetch();
        });

        it('It should not create a new Role record without login', async function() {
            const res = await request
                .post('/api/v1/role/create')
                // .set('Authorization', `Bearer ${access_token}`)
                .send({roleName: 'test'});
            res.body.statusCode.should.equal(401);
            console.log(res.body);
        });

        it('It should not create a new Role record without permission', async function() {
            access_token = jwtServie.generateToken({userId: userRecord.id, roleId: userRecord.roleId});
            const res = await request
                .post('/api/v1/role/create')
                .set('Authorization', `Bearer ${access_token}`)
                .send({roleName: 'test'});
            res.body.statusCode.should.equal(403);
            console.log(res.body);
        });

        it('It should not create a new Role record with duplicated role', async function() {
            access_token = jwtServie.generateToken({userId: adminRecord.id, roleId: adminRecord.roleId});
            const res = await request
                .post('/api/v1/role/create')
                .set('Authorization', `Bearer ${access_token}`)
                .send({roleName: 'admin'});
            console.log(res.body);
            res.body.statusCode.should.equal(400);
        });

        it('It should create a new Role record', async function() {
            access_token = jwtServie.generateToken({userId: adminRecord.id, roleId: adminRecord.roleId});
            const res = await request
                .post('/api/v1/role/create')
                .set('Authorization', `Bearer ${access_token}`)
                .send({roleName: 'test'})
                .expect(200);
            res.body.should.have.property('data');
            res.body.data.roleName.should.equal('test');
            console.log(res.body);
        });
    })
})