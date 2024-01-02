import  Rating  from '../models/Rating.js';

export const calcRating = async (req, res) => {
    let incomes = 0;
    const ratingToAdd = req.body.rating;
    ratingToAdd.incomes?.forEach(income => {
        incomes += income.sum;
    });
    const disposableIncome = incomes - ratingToAdd.payingOut.monthlyRefund;
    const monthlyPayment = (0.005 * ratingToAdd.property.ratingToAdd);
    const ability = disposableIncome * 0.4;
    let mark = 0;

    if (ability >= monthlyPayment) {
        mark = 10
    } else {
        mark = 0;
    }
    ratingToAdd.mark = mark;

    const rating = await addRatingToDB(ratingToAdd);
    if (rating) {
        res.status(201).json(rating);
    } else {
        res.status(300).json('err');        
    }


}

async function addRatingToDB(ratingToAdd) {
    try {
        const rating = await Rating.create(ratingToAdd);
        return rating;

    } catch (err) {
        return null;
    }
}

