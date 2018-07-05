module.exports = app => {
    app.get('/api/livros', (req,res) => {
        let connection = new app.connection.connectionFactory();
		let livros = new app.models.LivrosDao(connection);

        livros.listar((error,result) => {
			if(error) {
				console.log('Erro ao listar os livros: ' + error);
				res.status(500).send(error);
			} else {
				res.status(200).send(result);
			}
		});
    });

    app.post('/api/livros', (req,res) => {
        var livro = req.body;

        req.assert('titulo', 'Titulo é obrigatório.').notEmpty();
        req.assert('preco', 'Preço é obrigatório.').notEmpty();
        req.assert('autorId', 'Autor é obrigatório.').notEmpty();

        let errors = req.validationErrors();
		if(errors) {
			res.format({
				json: () => {
					res.status(400).json(errors);
				}
			});
		} else {
            let connection = new app.connection.connectionFactory();
			let livros = new app.models.LivrosDao(connection);

            livros.salvar(livro, (error, result) => {
				if(error) {
					console.log('Erro ao cadastrar o livro: ' + error);
					res.status(400).send(error);
				} else {
					livros.listar((error,result) => {
						if(error) {
							console.log('Erro ao listar os livros: ' + error);
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
