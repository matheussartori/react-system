function AutoresDao(connection) {
	this._connection = connection;
}

AutoresDao.prototype.listar = function(callback) {
	this._connection.query('SELECT id, nome, email FROM autores', callback);
}

AutoresDao.prototype.salvar = function(autor, callback) {
	this._connection.query('INSERT INTO autores SET ?', autor, callback);
}

module.exports = function() {
	return AutoresDao;
}
