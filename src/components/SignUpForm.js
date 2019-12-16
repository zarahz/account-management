import React from 'react';
import { Link } from 'react-router-dom';
// import Selectbox from './Selectbox'

export class SignUpForm extends React.Component {
  constructor () {
    super();

    this.state = {
      username: '',
      titel: '',
      name: '',
      surname: '',
      gender: '',
      email: '',
      password: '',
      street: '',
      zipCode: '',
      city: '',
      country: '',
      organisation: '',
      fieldOfActivity: '',
      researchInterest: '',
      comment: ''
    //   hasAgreed: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange (e) {
    let target = e.target;
    let value = target.type === 'checkbox' ? target.checked : target.value;
    let name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit (e) {
    e.preventDefault();

    console.log('The form was submitted with the following data:');
    console.log(this.state);
  }

  render () {
    return (
      <div className="FormCenter">
        <form onSubmit={this.handleSubmit} className="FormFields">
          <div className="FormField">
            <label className="FormField__Label" htmlFor="username">Username *</label>
            <input type="text" id="username" className="FormField__Input" placeholder="Enter a username" name="username" value={this.state.username} onChange={this.handleChange} required/>
          </div>

          <div className="FormField">
            <label className="FormField__Label" htmlFor="name">Titel</label>
            <input type="text" id="titel" className="FormField__Input" placeholder="Enter your titel" name="titel" value={this.state.titel} onChange={this.handleChange} />
          </div>

          <div className="FormField">
            <label className="FormField__Label" htmlFor="name">Name *</label>
            <input type="text" id="name" className="FormField__Input" placeholder="Enter your name" name="name" value={this.state.name} onChange={this.handleChange} required/>
          </div>

          <div className="FormField">
            <label className="FormField__Label" htmlFor="name">Surname *</label>
            <input type="text" id="surname" className="FormField__Input" placeholder="Enter your surname" name="surname" value={this.state.surname} onChange={this.handleChange} required/>
          </div>

          <div className="FormField">
            <label className="FormField__Label" htmlFor="email">E-Mail Address *</label>
            <input type="email" id="email" className="FormField__Input" placeholder="Enter your email" name="email" value={this.state.email} onChange={this.handleChange} required/>
          </div>

          <div className="FormField">
            <label className="FormField__Label" htmlFor="password">Password *</label>
            <input type="password" id="password" className="FormField__Input" placeholder="Enter your password" name="password" value={this.state.password} onChange={this.handleChange} required/>
          </div>

          <div className="FormField">
            <label className="FormField__Label" htmlFor="name">Street</label>
            <input type="text" id="street" className="FormField__Input" placeholder="Enter your street" name="street" value={this.state.street} onChange={this.handleChange} />
          </div>

          <div className="FormField">
            <label className="FormField__Label" htmlFor="name">Zipcode</label>
            <input type="text" id="zipCode" className="FormField__Input" placeholder="Enter your zipcode" name="zipCode" value={this.state.zipCode} onChange={this.handleChange} />
          </div>

          <div className="FormField">
            <label className="FormField__Label" htmlFor="name">City</label>
            <input type="text" id="city" className="FormField__Input" placeholder="Enter your city" name="city" value={this.state.city} onChange={this.handleChange} />
          </div>

          <div className="FormField">
            <label className="FormField__Label" htmlFor="name">Country</label>
            <input type="text" id="country" className="FormField__Input" placeholder="Enter your country" name="country" value={this.state.country} onChange={this.handleChange} />
          </div>

          <div className="FormField">
            <label className="FormField__Label" htmlFor="name">Organisation *</label>
            <input type="text" id="organisation" className="FormField__Input" placeholder="Enter your organisation" name="organisation" value={this.state.organisation} onChange={this.handleChange} required/>
          </div>

          <div className="FormField">
            <label className="FormField__Label" htmlFor="name">Field of activity</label>
            <input type="text" id="fieldOfActivity" className="FormField__Input" placeholder="Enter your field of activity" name="fieldOfActivity" value={this.state.fieldOfActivity} onChange={this.handleChange} />
          </div>

          <div className="FormField">
            <label className="FormField__Label" htmlFor="name">Research interest *</label>
            <input type="text" id="researchInterest" className="FormField__Input" placeholder="Enter your research interest" name="researchInterest" value={this.state.researchInterest} onChange={this.handleChange} required/>
          </div>

          <div className="FormField">
            <label className="FormField__Label" htmlFor="name">Comment</label>
            <input type="text" id="comment" className="FormField__Input" placeholder="Enter a comment" name="comment" value={this.state.comment} onChange={this.handleChange} />
          </div>

          {/* <div className="FormField">
            <label className="FormField__CheckboxLabel">
              <input className="FormField__Checkbox" type="checkbox" name="hasAgreed" value={this.state.hasAgreed} onChange={this.handleChange} /> I agree all statements in <a href="" className="FormField__TermsLink">terms of service</a>
            </label>
          </div> */}

          {/* <Selectbox
            items={[
              { value: 'option 1', id: 1 },
              { value: 'option 2', id: 2 },
              { value: 'option 3', id: 3 }
            ]}
          /> */}

          <p>marked fields (*) are required.</p>
          <br></br>

          <div className="FormField">
            <button className="FormField__Button mr-20">Sign Up</button>
          </div>

        </form>
      </div>
    );
  }
}
export default SignUpForm;
