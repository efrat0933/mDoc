import jwt from 'jsonwebtoken';
import fs from 'fs';

export const requireAuth = (req, res, next) => {
    const header = req.header['autorization'];
    console.log(req.header);
    if (header) {
        const bearer = header.split(' ');
        const token = bearer[1];
        if (token) {
            jwt.verify(token, 'efrat rotshtein, You are amazing person.', (err, decodedTken) => {

            });
            next();
        }
    }
    res.code(401);
}

export const logger = (req, res, next) => {
    fs.readFile('./logs/logs.txt', 'utf8', (err, data) => {

        // טיפול בשגיאה אם קיימת
        if (err) throw err; 
        
        // הוספת רשומה חדשה    
        let newData = data + '\nLog entry at ' + Date();
      
        // כתיבה חזרה לקובץ
        fs.writeFile('./logs.txt', newData, (err) => {
          if (err) throw err;
          console.log('Log updated!'); 
          next();
        });
      
    });
}

