import {Container} from 'unstated';
import axios from 'axios';

export default class AppContext extends Container {
    constructor() {
        super();
        const isAuthenticated = localStorage.getItem('isAuthenticated');
        const token = localStorage.getItem('token');
        const email = localStorage.getItem('email');
        this.state = {
            title: "Drum Machine",
            isAuthenticated: isAuthenticated,
            token: token,
            email: email
        }
    }

    setTitle(title) {
        this.setState({title: title});
    }

    async login(data) {
        const res = await axios.post('http://localhost:5000/api/v1/auth/login', data).catch(err => {
            throw err;
        });
        this.setState({token: res.data.token, email: res.data.email, isAuthenticated: true});
        localStorage.setItem('isAuthenticated', true);
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('email', res.data.email);
        return res.data;
    }

    logout() {
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        this.setState({token: "", email: "", isAuthenticated: false});
    }
}