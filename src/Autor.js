import React, { Component } from 'react';

import $ from 'jquery';
import PubSub from 'pubsub-js';
import TratadorErros from './TratadorErros';

import InputCustomForm from './components/InputCustomForm';
import ButtonCustomForm from './components/ButtonCustomForm';

class FormularioAutores extends Component {
    constructor() {
        super();
        this.state = {nome:'', email: '', senha: ''};
        this.cadastraAutor = this.cadastraAutor.bind(this);
    }

    cadastraAutor(event) {
        event.preventDefault();

        $.ajax({
            url: "http://localhost:8080/api/autores",
            contentType: "application/json",
            dataType: "json",
            type: "post",
            data: JSON.stringify({
                nome: this.state.nome,
                email: this.state.email,
                senha: this.state.senha
            }),
            success: function(novaLista) {
                PubSub.publish('atualiza-lista-autores', novaLista);
                this.setState({nome: '', email: '', senha: ''});
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
                <form className="pure-form pure-form-aligned" onSubmit={this.cadastraAutor} method="post">
                <InputCustomForm id="nome" type="text" name="nome" label="Nome" value={this.state.nome} onChange={this.salvaAlteracao.bind(this,'nome')}/>
                <InputCustomForm id="email" type="email" name="email" label="E-mail" value={this.state.email} onChange={this.salvaAlteracao.bind(this,'email')}/>
                <InputCustomForm id="senha" type="password" name="senha" label="Senha" value={this.state.senha} onChange={this.salvaAlteracao.bind(this,'senha')}/>
                <ButtonCustomForm label="" buttonText="Gravar"/>
                </form>
            </div>
        );
    }
}

class TabelaAutores extends Component {
    render() {
        return(
            <div>
                <table className="pure-table">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>E-mail</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.lista.map(function(autor) {
                                return (
                                    <tr key={autor.id}>
                                        <td>{autor.nome}</td>
                                        <td>{autor.email}</td>
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

export default class AutorBox extends Component {
    constructor() {
        super();
        this.state = {lista : []};
    }

    componentDidMount() {
        $.ajax({
            url: "http://localhost:8080/api/autores",
            dataType: "json",
            success: function(response) {
                this.setState({lista:response});
            }.bind(this)
        });

        PubSub.subscribe('atualiza-lista-autores', function(topic,novaLista) {
            this.setState({lista:novaLista});
        }.bind(this));
    }

    render() {
        return (
            <div>
                <div className="header">
                    <h1>Cadastro de autores</h1>
                </div>
                <div className="content top-spacing" id="content">
                    <FormularioAutores />
                    <TabelaAutores lista={this.state.lista} />
                </div>
            </div>
        );
    }
}
