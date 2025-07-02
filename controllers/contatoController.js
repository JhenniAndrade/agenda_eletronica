const Contato = require('../models/Contato');

exports.listarContatos = async (req, res) => {
    const contatos = await Contato.find({ criadoPor: req.session.user._id });
    res.render('dashboard', { user: req.session.user, contatos });
};

exports.adicionarContato = async (req, res) => {
    const { nome, telefone, email } = req.body;
    await Contato.create({
        nome,
        telefone,
        email,
        criadoPor: req.session.user._id
    });
    res.redirect('/dashboard');
};

exports.deletarContato = async (req, res) => {
    const { id } = req.params;
    await Contato.deleteOne({ _id: id, criadoPor: req.session.user._id });
    res.redirect('/dashboard');
};
