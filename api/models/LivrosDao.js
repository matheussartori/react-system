function LivrosDao(connection) {
	this._connection = connection;
}

LivrosDao.prototype.listar = function(callback) {
	this._connection.query('SELECT a.id, a.titulo, a.preco, b.nome as autor FROM livros a LEFT JOIN autores b ON a.autorId = b.id', callback);
}

LivrosDao.prototype.salvar = function(livro, callback) {
	this._connection.query('INSERT INTO livros SET ?', livro, callback);
}

module.exports = function() {
	return LivrosDao;
}
