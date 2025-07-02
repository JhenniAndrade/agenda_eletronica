const express = require('express');
const router = express.Router();
const contatoController = require('../controllers/contatoController');

function isAuth(req, res, next) {
    if (req.session.isAuth) {
        next();
    } else {
        res.redirect('/');
    }
}

router.get('/dashboard', isAuth, contatoController.listarContatos);
router.post('/add', isAuth, contatoController.adicionarContato);
router.get('/delete/:id', isAuth, contatoController.deletarContato);

module.exports = router;
