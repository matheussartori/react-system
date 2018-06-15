module.exports = app => {
	app.get('/api/autores', (req,res) => {
		let connection = new app.connection.connectionFactory();
		let autores = new app.models.AutoresDao(connection);

		autores.listar((error,result) => {
			if(error) {
				console.log('Erro ao listar os autores: ' + error);
				res.status(500).send(error);
			} else {
				res.setHeader('Access-Control-Allow-Origin', '*');
				res.status(200).send(result);
			}
		});

	});

	app.post('/api/autores', (req,res) => {
		var autor = req.body;

		console.log(autor);

		let connection = new app.connection.connectionFactory();
		let autores = new app.models.AutoresDao(connection);

		res.setHeader('Access-Control-Allow-Origin', '*');
		res.status(200).send('empty1');
	});
}
