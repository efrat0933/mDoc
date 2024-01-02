import  mongoose  from 'mongoose';
const schema = mongoose.Schema;

const ratingSchema = new schema({

    personalDetails: {
        name: String,
        age: Number,
        idNumber: String,
    },
    property: {
        requestedLoanAmount: Number,
        propertyValue: Number,
        equity: Number,
    },
    incomes: [{
        sum: Number,
        source: String,
        seniority: Number,
    }],
    payingOut: {
        monthlyRefund: Number,
        sumDebts: Number,
    },
    history: {
        economicHistory: String
    },

    mark: Number

}
);
ratingSchema.post('save', function (doc, next) {
    console.log('user created and saved ', doc);
    next();
});

const Rating = mongoose.model('Rating', ratingSchema);

export default Rating;