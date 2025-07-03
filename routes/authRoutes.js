const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const contatoController = require('../controllers/contatoController'); 

function isAuth(req, res, next) {
    if (req.session.isAuth) {
        next();
    } else {
        res.redirect('/');
    }
}

router.get('/', authController.getLogin);
router.post('/login', authController.postLogin);
router.get('/dashboard', isAuth, contatoController.listarContatos);
router.get('/logout', authController.logout);

module.exports = router;
