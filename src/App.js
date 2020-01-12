import React from 'react';
import FacebookLogin from 'react-facebook-login';
import './App.css';
import logo from './logo.svg';
require('dotenv').config();

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: null,
			email: null,
			photo: null,
			login: false
		};
	}

	responseFacebook = response => {
		this.doLogin(response);
	};

	doLogin = data => {
		this.setState({ photo: data.picture.data.url });
		console.log('DO LOGIN');
		this.setState({ login: true, name: data.name, email: data.email });
	};

	render() {
		let { name, email, photo, login } = this.state;
		return (
			<div className='App'>
				<header className='App-header'>
					<img src={logo} className='App-logo' alt='logo' />
					{!login ? (
						<FacebookLogin
							appId={process.env.APP_ID_FACEBOOK}
							autoLoad={true}
							fields={'name, email, picture'}
							callback={this.responseFacebook}
							textButton={'Fazer login com Facebook'}
						/>
					) : (
						<div>
							<h1>Bem-vindo, {name}.</h1>
							<h3>Você está logado com o email {email} através do Facebook.</h3>
							<img src={photo} />
						</div>
					)}
				</header>
			</div>
		);
	}
}
