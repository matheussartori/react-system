import React, { Component } from 'react';
import './css/pure-min.css';
import './css/side-menu.css';
import './css/main.css';
import $ from 'jquery';

import InputCustomForm from './components/InputCustomForm';
import ButtonCustomForm from './components/ButtonCustomForm';

class App extends Component {

    constructor() {
        super();
        this.state = {lista : [], nome:'', email: '', senha: ''};
        this.cadastraAutor = this.cadastraAutor.bind(this);
        this.setNome = this.setNome.bind(this);
        this.setEmail = this.setEmail.bind(this);
        this.setSenha = this.setSenha.bind(this);
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
                this.setState({lista:response});
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
        return (
            <div id="layout">
                <a href="#menu" id="menuLink" className="menu-link">
                    <span></span>
                </a>

                <div id="menu">
                    <div className="pure-menu">
                        <a className="pure-menu-heading" href="">Company</a>

                        <ul className="pure-menu-list">
                            <li className="pure-menu-item"><a href="" className="pure-menu-link">Home</a></li>
                            <li className="pure-menu-item"><a href="" className="pure-menu-link">Autores</a></li>
                            <li className="pure-menu-item"><a href="" className="pure-menu-link">Livros</a></li>
                        </ul>
                    </div>
                </div>

                <div id="main">
                    <div className="header">
                    <h1>Cadastro de Autores</h1>
                </div>
                <div className="content top-spacing" id="content">
                    <div className="pure-form pure-form-aligned">
                        <form className="pure-form pure-form-aligned" onSubmit={this.cadastraAutor} method="post">
                        <InputCustomForm id="nome" type="text" name="nome" label="Nome" value={this.state.nome} onChange={this.setNome}/>
                        <InputCustomForm id="email" type="email" name="email" label="E-mail" value={this.state.email} onChange={this.setEmail}/>
                        <InputCustomForm id="senha" type="password" name="senha" label="Senha" value={this.state.senha} onChange={this.setSenha}/>
                        <ButtonCustomForm label="" buttonText="Gravar"/>
                        </form>
                    </div>
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
                                    this.state.lista.map(function(autor) {
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
                </div>
            </div>
        </div>
    );
  }
}

export default App;
