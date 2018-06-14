import React, { Component } from 'react';
import './css/pure-min.css';
import './css/side-menu.css';

class App extends Component {
  render() {
    return (
        <div id="layout">
            <a href="#menu" id="menuLink" class="menu-link">
                <span></span>
            </a>

            <div id="menu">
                <div class="pure-menu">
                    <a class="pure-menu-heading" href="#">Company</a>

                    <ul class="pure-menu-list">
                        <li class="pure-menu-item"><a href="#" class="pure-menu-link">Home</a></li>
                        <li class="pure-menu-item"><a href="#" class="pure-menu-link">Autores</a></li>
                        <li class="pure-menu-item"><a href="#" class="pure-menu-link">Livros</a></li>
                    </ul>
                </div>
            </div>

            <div id="main">
                <div class="header">
                <h1>Cadastro de Autores</h1>
            </div>
            <div className="content" id="content">
                <div className="pure-form pure-form-aligned">
                    <form className="pure-form pure-form-aligned">
                        <div className="pure-control-group">
                            <label htmlFor="nome">Nome</label>
                            <input id="nome" type="text" name="nome" value=""  />
                        </div>
                        <div className="pure-control-group">
                            <label htmlFor="email">Email</label>
                            <input id="email" type="email" name="email" value=""  />
                        </div>
                        <div className="pure-control-group">
                            <label htmlFor="senha">Senha</label>
                            <input id="senha" type="password" name="senha"  />
                        </div>
                        <div className="pure-control-group">
                            <label></label>
                            <button type="submit" className="pure-button pure-button-primary">Gravar</button>
                        </div>
                    </form>
                </div>
                <div>
                    <table className="pure-table">
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>email</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Matheus</td>
                                <td>ms.sartori@outlook.com.br</td>
                            </tr>
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
