const User = require('../models/User.js'); // טעינת המודל

try {
    console.log('lsdjl');
    const u = User.updateMany({}, {$set: {firstName: '', lastName: ''}});
    console.log(u);
} catch(err) {
    console.log(err);
}