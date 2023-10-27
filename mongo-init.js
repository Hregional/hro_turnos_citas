print('Start initializing MongoDB...');


var adminUsername = 'admin';
var adminPassword = 'adminpassword';
var dbName = 'hro-tms-database';


print('Creating admin user...');
db.createUser({
 user: adminUsername,
 pwd: adminPassword,
 roles: [{ role: 'root', db: 'admin' }]
});
print('Admin user created successfully!');


print('Switching to the specified database...');
db = db.getSiblingDB(dbName);


print('Creating collections or performing other initialization tasks for ' + dbName + '...');


// Add any other initialization logic specific to your database here


print('Initialization completed.');