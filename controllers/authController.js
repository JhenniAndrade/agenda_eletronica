const User = require('../models/User');

exports.getLogin = (req, res) => {
    res.render('login', { error: null });
};

exports.postLogin = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        return res.render('login', { error: 'Usuário não encontrado' });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
        return res.render('login', { error: 'Senha incorreta' });
    }

    req.session.isAuth = true;
    req.session.user = user;
    res.redirect('/dashboard');
};

exports.getDashboard = (req, res) => {
    if (!req.session.isAuth) {
        return res.redirect('/');
    }
    res.render('dashboard', { user: req.session.user });
};

exports.logout = (req, res) => {
    req.session.destroy(() => {
        res.clearCookie('connect.sid');
        res.redirect('/');
    });
};
