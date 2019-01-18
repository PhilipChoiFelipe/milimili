import React, { Component } from 'react'; //import React Component

import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';



class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'email': undefined,
      'password': undefined,
      // anonymous: false,
      dropdownOpen: false,
      handle: 'select',
      signUpmodal: false,
      signInmodal: false
    };
    this.toggle = this.toggle.bind(this)
    this.modalToggle = this.modalToggle.bind(this);
    this.InmodalToggle = this.InmodalToggle.bind(this);
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
    if (this.state.handle === 'select') {
      alert("신분을 정해주세요!")
    } else {
      this.props.signUpCallback(this.state.email, this.state.password, this.state.handle);
    }
  }

  //handle signIn button
  handleSignIn(event) {
    event.preventDefault();
    this.props.signInCallback(this.state.email, this.state.password);
  }

  handleType(event) {
    // console.log(event.currentTarget.textContent)
    this.setState({ handle: event.currentTarget.textContent });
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  InmodalToggle() {
    this.setState({
      signInmodal: !this.state.signInmodal
    })
  }

  modalToggle() {
    this.setState({
      signUpmodal: !this.state.signUpmodal
    });
  }

  buttonChange(event) {
    this.setState({ btnName: "hi" })
  }

  // handleAnonymous(event) {
  //   event.preventDefault();
  //   this.setState({anonymous: true})
  //   this.props.handleAnonymous(this.state.anonymous)
  // }

  render() {
    return (
      <form>
        {/* email field */}
        {/* <div className="form-group">
          <label htmlFor="email">아이디</label>
          <input className="form-control" placeholder="이메일형식" id="email" type="email" name="email" onChange={(e) => this.handleChange(e)} />
        </div> */}

        {/* password field*/}
        {/* <div className="form-group">
          <label htmlFor="password">비밀번호</label>
          <input className="form-control" id="password" type="password" name="password" onChange={(e) => this.handleChange(e)} />
        </div> */}

        {/* sign up and sign in */}
        <div className="form-group text-center mt-5">
          <button  className="btn" onClick={this.InmodalToggle}>로그인</button>
          <button id="signupButton" className="btn ml-4" onClick={this.modalToggle}>회원가입</button>

          <Modal isOpen={this.state.signInmodal} toggle={this.InmodalToggle} className="modal-dialog-centered">
            <ModalHeader toggle={this.InmodalToggle}>MiliMili</ModalHeader>
            <ModalBody>
              <form>
                {/* email field */}
                <div className="form-group">
                  <label htmlFor="email">아이디</label>
                  <input className="form-control" placeholder="이메일형식" id="email" type="email" name="email" onChange={(e) => this.handleChange(e)} />
                </div>

                {/* password field*/}
                <div className="form-group">
                  <label htmlFor="password">비밀번호</label>
                  <input className="form-control" id="password" type="password" name="password" onChange={(e) => this.handleChange(e)} />
                </div>

                <div className="form-group text-right">
                  <button className="btn btn-primary" onClick={(e) => this.handleSignIn(e)}>로그인</button>
                </div>
              </form>
            </ModalBody>
            {/* <ModalFooter> */}
            {/* <Button color="primary" onClick={this.modalToggle}>Do Something</Button>{' '}
            <Button color="secondary" onClick={this.modalToggle}>Cancel</Button>
          </ModalFooter> */}
          </Modal>
          {/* ------------------------------------------------------------------------------------------------ */}
          <Modal isOpen={this.state.signUpmodal} toggle={this.modalToggle} className="modal-dialog-centered">
            <ModalHeader toggle={this.modalToggle}>MiliMili</ModalHeader>
            <ModalBody>
              <form>
                {/* email field */}
                <div className="form-group">
                  <label htmlFor="email">아이디</label>
                  <input className="form-control" placeholder="이메일형식" id="email" type="email" name="email" onChange={(e) => this.handleChange(e)} />
                </div>

                {/* password field*/}
                <div className="form-group">
                  <label htmlFor="password">비밀번호</label>
                  <input className="form-control" id="password" type="password" name="password" onChange={(e) => this.handleChange(e)} />
                </div>

                <div className="form-group text-right">
                  <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} className="d-inline mr-2"
                    onChange={this.buttonChange}>
                    <DropdownToggle caret color="primary" >
                      {this.state.handle}
                    </DropdownToggle>
                    <DropdownMenu>
                      {/* <DropdownItem header>Header</DropdownItem> */}
                      <DropdownItem onClick={(e) => this.handleType(e)}>미필</DropdownItem>
                      {/* <DropdownItem disabled>Action (disabled)</DropdownItem>
              <DropdownItem divider /> */}
                      <DropdownItem onClick={(e) => this.handleType(e)}>현역</DropdownItem>
                      <DropdownItem onClick={(e) => this.handleType(e)}>전역</DropdownItem>
                      <DropdownItem onClick={(e) => this.handleType(e)}>others</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                  <button id="signupButton1" className="btn btn-primary" onClick={(e) => this.handleSignUp(e)}>회원가입</button>
                </div>
              </form>
            </ModalBody>
            {/* <ModalFooter> */}
            {/* <Button color="primary" onClick={this.modalToggle}>Do Something</Button>{' '}
            <Button color="secondary" onClick={this.modalToggle}>Cancel</Button>
          </ModalFooter> */}
          </Modal>
          {/* <button className = "btn" onClick={(e) => this.handleAnonymous(e)}>비회원</button> */}
        </div>
      </form>
    )
  }
}



export default SignUpForm
