// require('should');
// const TEST_ROLE = [
//     {
//         role_name: "test1"
//     },
//     {
//         role_name: "test2"
//     },
// ]

// describe('Role Model', function() {
//     // describe('After creating the new role', function() {
//     //     it('It should be not empty', function(done) {
//     //         Role.find().then(function(role) {
//     //             console.log(1, role);
//     //             if (role.length !== 2) {
//     //                 return done(new Error(
//     //                     `Should return exactly 2 roles from our test fixtures. ` + 
//     //                     `But instead, got ${role.length} roles.`
//     //                 ));
//     //             };
//     //             return done();
//     //         }).catch(done);
//     //     });
//     // });

//     describe('Creating a new Role record', function() {
//         it('It should create a new Role record', function(done) {
//             Role.create({
//                 roleName: TEST_ROLE[0].role_name
//             })
//             .fetch()
//             .then(function(newRole) {
//                 if (newRole.roleName !== TEST_ROLE[0].role_name) {
//                     return done(new Error(
//                         `Should return exactly ${TEST_ROLE[0].role_name} from mock data. ` + 
//                         `But instead, got role's name ${newRole.roleName}.`
//                     ));
//                 };
//                 return done();
//             }).catch(done);;
//         });
//     });

//     describe('Updating the Role record', function() {
//         it('It should update the Role record', function(done) {
//             Role.create({
//                 roleName: TEST_ROLE[0].role_name
//             })
//             .fetch()
//             .then();

//             Role.update({
//                 roleName: TEST_ROLE[0].role_name
//             })
//             .set({
//                 roleName: TEST_ROLE[1].role_name
//             })
//             .fetch()
//             .then(function(updatedRole) {
//                 if (updatedRole[0].roleName !== TEST_ROLE[1].role_name) {
//                     return done(new Error(
//                         `Should return exactly ${TEST_ROLE[1].role_name} from mock data. ` + 
//                         `But instead, got role's name ${updatedRole.roleName}.`
//                     ));
//                 };
//                 return done();
//             }).catch(done);
//         });
//     });
// })