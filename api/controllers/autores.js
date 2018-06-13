module.exports = app => {
	app.get('/api/autores', (req,res) => {
		let connection = app.connection.connectionFactory();
		let autores = app.models.AutoresDao(connection);

		autores.listar((error,result) => {
			if(error) {
				console.log('Erro ao listar os autores: ' + error);
				res.status(500).send(error);
			} else {
				res.json(result);
			}
		});

	});
}
