import React, { Component } from 'react'
import FileUpload from './FileUpload';
import axios from 'axios';

class Edit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      burger: {
        name: "",
        price: 0,
        description: "",
        source: "",
        isHomemade: false,
        image: ""
      },
      errors: {}
    }
  }

  componentDidMount = () => {
    console.log(this.props.match.params._id);
    axios.get(`/api/burgers/${this.props.match.params._id}`)
      .then( res => {
        this.setState({burger: res.data.burger});
      })
      .catch( err => {
        console.log(err);
      });
  }

  change = (key, e) => {
    let b = {...this.state.burger};
    b[key] = e.target.value;
    this.setState({burger: b});
  }

  fileChange = (image) => {
    let b = {...this.state.burger, image: image};
    this.setState({burger: b});
  }

  updateBurger = (e) => {
    e.preventDefault();
    axios.put(`/api/burgers/${this.state.burger._id}`, this.state.burger)
      .then( res => {
        if(res.data.errors){
          this.setState({errors: res.data.errors.errors})
        } else {
          this.props.history.push("/");
        }
      });
  }

  render() {
    return (
      <form onSubmit={this.updateBurger}>
        <div className="form-group">
          <label>Burger Name:</label>
          <input type="text" onChange={this.change.bind(this, "name")} value={this.state.burger.name} />
          {
            this.state.errors.name ? 
            <p>{this.state.errors.name.message}</p>:
            ""
          }
        </div>

        <div className="form-group">
          <label>Burger Price:</label>
          <input type="number" onChange={this.change.bind(this, "price")} step="0.01" value={this.state.burger.price} />
        </div>

        <div className="form-group">
          <label>Burger Description:</label>
          <input type="text" onChange={this.change.bind(this, "description")} value={this.state.burger.description} />
        </div>

        <div className="form-group">
          <label>Burger Source:</label>
          <input type="text" onChange={this.change.bind(this, "source")} value={this.state.burger.source} />
        </div>

        <div className="form-group">
          <label>
            <img src={this.state.burger.image} alt="burger image" width="100px" />
          </label>
          <FileUpload onUpload={this.fileChange} />
        </div>

        <input type="submit" className="btn-submit" value="Update" />

      </form>
    )
  }
}

export default Edit
