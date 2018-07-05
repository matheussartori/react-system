function LivrosDao(connection) {
	this._connection = connection;
}

LivrosDao.prototype.listar = function(callback) {
	this._connection.query('SELECT id, titulo, preco, autorId FROM livros', callback);
}

LivrosDao.prototype.salvar = function(livro, callback) {
	this._connection.query('INSERT INTO livros SET ?', livro, callback);
}

module.exports = function() {
	return LivrosDao;
}
