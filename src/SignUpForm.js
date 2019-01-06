import React, { Component } from 'react'; //import React Component

class SignUpForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      'email': undefined,
      'password': undefined
    };
  }

  //update state for specific field
  handleChange(event) {
    let field = event.target.name; 
    let value = event.target.value; 

    let changes = {}; 
    changes[field] = value; 
    this.setState(changes); 
  }

  // signUp button
  handleSignUp(event) {
    event.preventDefault();
    this.props.signUpCallback(this.state.email, this.state.password);
  }

  //handle signIn button
  handleSignIn(event) {
    event.preventDefault(); 
    this.props.signInCallback(this.state.email, this.state.password);
  }

  render() {
    return (
      <form>
        {/* email field */}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input className="form-control" id="email" type="email" name="email" onChange={(e) => this.handleChange(e)}/>
        </div>

        {/* password field*/}
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input className="form-control" id="password" type="password" name="password"onChange={(e) => this.handleChange(e)}/>
        </div>

        {/* sign up and sign in */}
        <div className="form-group">
          <button className="btn btn-primary mr-2" onClick={(e) => this.handleSignUp(e)}>Sign-up</button>
          <button className="btn btn-primary" onClick={(e) => this.handleSignIn(e)}>Sign-in</button>
        </div>
      </form>
    )
  }
}

export default SignUpForm
