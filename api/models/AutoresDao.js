function AutoresDao(connection) {
	this._connection = connection;
}

AutoresDao.prototype.listar = callback => this._connection.query('SELECT * FROM autores', callback);

module.exports = function() {
	return AutoresDao;
}
