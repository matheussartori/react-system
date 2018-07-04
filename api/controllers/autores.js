module.exports = app => {
	app.get('/api/autores', (req,res) => {
		let connection = new app.connection.connectionFactory();
		let autores = new app.models.AutoresDao(connection);

		autores.listar((error,result) => {
			if(error) {
				console.log('Erro ao listar os autores: ' + error);
				res.status(500).send(error);
			} else {
				res.status(200).send(result);
			}
		});

	});

	app.post('/api/autores', (req,res) => {
		var autor = req.body;

		req.assert('nome', 'Nome é obrigatório.').notEmpty();
		req.assert('email', 'E-mail é obrigatório.').notEmpty();
		req.assert('senha', 'Senha é obrigatória.').notEmpty();

		let errors = req.validationErrors();
		if(errors) {
			res.format({
				json: () => {
					res.status(400).json(errors);
				}
			});
		} else {
			let connection = new app.connection.connectionFactory();
			let autores = new app.models.AutoresDao(connection);

			autores.salvar(autor, (error, result) => {
				if(error) {
					console.log('Erro ao cadastrar o autor: ' + error);
					res.status(400).send(error);
				} else {
					autores.listar((error,result) => {
						if(error) {
							console.log('Erro ao listar os autores: ' + error);
							res.status(500).send(error);
						} else {
							res.status(200).send(result);
						}
					});
				}
			});
		}
	});
}
