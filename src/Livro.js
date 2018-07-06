import React, { Component } from 'react';

import $ from 'jquery';
import PubSub from 'pubsub-js';
import TratadorErros from './TratadorErros';

import InputCustomForm from './components/InputCustomForm';
import ButtonCustomForm from './components/ButtonCustomForm';

class FormularioLivros extends Component {
    constructor() {
        super();
        this.state = {titulo:'', preco:'', autorId:''};
        this.cadastraLivro = this.cadastraLivro.bind(this);
    }

    cadastraLivro(event) {
        event.preventDefault();

        $.ajax({
            url: "http://localhost:8080/api/livros",
            contentType: "application/json",
            dataType: "json",
            type: "post",
            data: JSON.stringify({
                titulo: this.state.titulo,
                preco: this.state.preco,
                autorId: this.state.autorId
            }),
            success: function(novaLista) {
                PubSub.publish('atualiza-lista-livros', novaLista);
                this.setState({titulo: '', preco: '', autorId: ''});
            }.bind(this),
            error: response => {
                if(response.status === 400) {
                    new TratadorErros().lidarErros(response.responseJSON);
                }
            },
            beforeSend: () => {
                PubSub.publish('limpa-erros',{});
            }
        });
    }

    salvaAlteracao(nomeInput,evento) {
        this.setState({[nomeInput]:evento.target.value})
    }

    render() {
        return(
            <div className="pure-form pure-form-aligned">
                <form className="pure-form pure-form-aligned" onSubmit={this.cadastraLivro} method="post">
                <InputCustomForm id="titulo" type="text" name="titulo" label="Título" value={this.state.titulo} onChange={this.salvaAlteracao.bind(this,'titulo')}/>
                <InputCustomForm id="preco" type="text" name="preco" label="Preço" value={this.state.preco} onChange={this.salvaAlteracao.bind(this,'preco')}/>
                <div className="pure-control-group">
                    <label htmlFor="autorId">Autor</label>
                    <select value={ this.state.autorId } name="autorId" onChange={this.salvaAlteracao.bind(this,'autorId')}>
                        <option value="">Selecione</option>
                        {
                            this.props.autores.map(autor => {
                                return <option key={autor.id} value={autor.id}>
                                {autor.nome}
                                </option>;
                            })
                        }
                    </select>
                </div>
                <ButtonCustomForm label="" buttonText="Gravar"/>
                </form>
            </div>
        );
    }
}

class TabelaLivros extends Component {
    render() {
        return(
            <div>
                <table className="pure-table">
                    <thead>
                        <tr>
                            <th>Título</th>
                            <th>Preço</th>
                            <th>Autor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.lista.map(function(livro) {
                                return (
                                    <tr key={livro.id}>
                                        <td>{livro.titulo}</td>
                                        <td>{livro.preco}</td>
                                        <td>{livro.autor}</td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}

export default class LivroBox extends Component {
    constructor() {
        super();
        this.state = {lista : [], autores: []};
    }

    componentDidMount() {
        $.ajax({
            url: "http://localhost:8080/api/livros",
            dataType: "json",
            success: function(response) {
                this.setState({lista:response});
            }.bind(this)
        });

        $.ajax({
            url: "http://localhost:8080/api/autores",
            dataType: "json",
            success: function(response) {
                this.setState({autores:response});
            }.bind(this)
        });

        PubSub.subscribe('atualiza-lista-livros', function(topic,novaLista) {
            this.setState({lista:novaLista});
        }.bind(this));
    }

    render() {
        return (
            <div>
                <div className="header">
                    <h1>Cadastro de livros</h1>
                </div>
                <div className="content top-spacing" id="content">
                    <FormularioLivros autores={this.state.autores} />
                    <TabelaLivros lista={this.state.lista} />
                </div>
            </div>
        );
    }
}
