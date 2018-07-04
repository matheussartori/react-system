import React, { Component } from 'react';

import $ from 'jquery';

import InputCustomForm from './components/InputCustomForm';
import ButtonCustomForm from './components/ButtonCustomForm';

class FormularioAutores extends Component {
    constructor() {
        super();
        this.state = {nome:'', email: '', senha: ''};
        this.cadastraAutor = this.cadastraAutor.bind(this);
        this.setNome = this.setNome.bind(this);
        this.setEmail = this.setEmail.bind(this);
        this.setSenha = this.setSenha.bind(this);
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
            success: function(response) {
                this.props.callbackAtualiza(response);
            }.bind(this),
            error: function(response) {
                console.log('Erro');
            }
        });
    }

    setNome(event) {
        this.setState({nome:event.target.value});
    }

    setEmail(event) {
        this.setState({email:event.target.value});
    }

    setSenha(event) {
        this.setState({senha:event.target.value});
    }

    render() {
        return(
            <div className="pure-form pure-form-aligned">
                <form className="pure-form pure-form-aligned" onSubmit={this.cadastraAutor} method="post">
                <InputCustomForm id="nome" type="text" name="nome" label="Nome" value={this.state.nome} onChange={this.setNome}/>
                <InputCustomForm id="email" type="email" name="email" label="E-mail" value={this.state.email} onChange={this.setEmail}/>
                <InputCustomForm id="senha" type="password" name="senha" label="Senha" value={this.state.senha} onChange={this.setSenha}/>
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
        this.atualizaListagem = this.atualizaListagem.bind(this);
    }

    componentDidMount() {
        $.ajax({
            url: "http://localhost:8080/api/autores",
            dataType: "json",
            success: function(response) {
                this.setState({lista:response});
            }.bind(this)
        });
    }

    atualizaListagem(novaLista) {
        this.setState({lista:novaLista});
    }

    render() {
        return (
            <div>
                <FormularioAutores callbackAtualiza={this.atualizaListagem}/>
                <TabelaAutores lista={this.state.lista}/>
            </div>
        );
    }
}
