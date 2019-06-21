import React, { Component } from 'react'
import FileUpload from './FileUpload';
import axios from 'axios';

class New extends Component {

  constructor(props) {
    super(props);
    this.state = {
      newBurger: {
        name: "",
        price: 0,
        description: "",
        source: "",
        isHomemade: false,
        image: "default"
      },
      errors: {}
    }
  }

  change = (key, e) => {
    let b = {...this.state.newBurger};
    b[key] = e.target.value;
    this.setState({newBurger: b});
  }

  fileChange = (image) => {
    let b = {...this.state.newBurger, image: image};
    this.setState({newBurger: b});
  }

  makeBurger = (e) => {
    e.preventDefault();
    axios.post("/api/burgers", this.state.newBurger)
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
      <form onSubmit={this.makeBurger}>
        <div className="form-group">
          <label>Burger Name:</label>
          <input type="text" onChange={this.change.bind(this, "name")} />
          {
            this.state.errors.name ? 
            <p>{this.state.errors.name.message}</p>:
            ""
          }
        </div>

        <div className="form-group">
          <label>Burger Price:</label>
          <input type="number" onChange={this.change.bind(this, "price")} step="0.01" />
        </div>

        <div className="form-group">
          <label>Burger Description:</label>
          <input type="text" onChange={this.change.bind(this, "description")} />
        </div>

        <div className="form-group">
          <label>Burger Source:</label>
          <input type="text" onChange={this.change.bind(this, "source")} />
        </div>

        <div className="form-group">
          <label>Burger Image:</label>
          <FileUpload onUpload={this.fileChange} />
        </div>

        <input type="submit" className="btn-submit" />

      </form>
    )
  }
}

export default New
