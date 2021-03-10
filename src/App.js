import React, { Component } from 'react';
import { Route , Redirect , Switch} from 'react-router-dom';
import { ToastContainer  } from 'react-toastify'; 
import Movies from './Components/movies';
import Customers from './Components/customers';
import Rentals from './Components/rentals';
import NotFound from './Components/notFound';
import NavBar from './Components/common/navBar';
import MoviesForm from './Components/moviesForm';
import LoginForm from './Components/loginForm';
import RegisterForm from './Components/registerForm';
import MovieForm from './Components/movieForm';
import Logout from './Components/logout';
import ProtectedRoute from './Components/common/protectedRoute';
import auth from './services/authService';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';




class App extends Component {
  state = {  };

  componentDidMount() {
   const user = auth.getCurrentUser();
   this.setState({ user });
  };

  render() {
    const  { user } = this.state;    
    return (
      <React.Fragment>
      <ToastContainer />
      <NavBar user = {user} />
      <main className="container">
          <Switch>
            <Route path="/register" component={RegisterForm} />
            <Route path="/movies/new" component={MovieForm} />
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={Logout} />
            <ProtectedRoute path="/movies/:id" component = { MovieForm } />
            <Route path="/movies" 
                render = {props => <Movies  {...props} user={user} />} 
            />
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals}></Route>
            <Route path="/not-found" component={NotFound}></Route>
            <Redirect from='/' exact to= '/movies' />
            <Redirect to = '/not-found' />
          </Switch>
      </main>
      </React.Fragment>
    );
  }
};

export default App;
