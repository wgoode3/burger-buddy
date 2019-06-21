import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';

class List extends Component {

  constructor(props){
    super(props);
    this.state = {
      burgers: []
    }
  }

  sortBurgers(arr){
    for(let i=0; i<arr.length; i++) {
      for(let j=0; j<arr.length-i-1; j++){
        if(arr[j].avgRating < arr[j+1].avgRating) {
          let temp = arr[j];
          arr[j] = arr[j+1];
          arr[j+1] = temp;
        }
      }
    }
    return arr;
  }

  componentDidMount = () => {
    axios.get("/api/burgers")
      .then( res => {
        let burgers = res.data.burgers;
        for(let i=0; i< burgers.length; i++) {
          let s = 0;
          for(let review of burgers[i].reviews) {
            s += review.rating;
          }
          let rating = Math.round(s / burgers[i].reviews.length * 100) / 100;
          if(isNaN(rating)) {
            burgers[i].avgRating = 0;
          } else {
            burgers[i].avgRating = rating;
          }
        }
        this.setState({burgers: this.sortBurgers(burgers)});
      })
      .catch( err => {
        console.log(err);
      });
  }

  delete = (_id) => {
    axios.delete(`/api/burgers/${_id}`)
      .then( res => {
        console.log(res);
        this.componentDidMount();
      })
      .catch( err => {
        console.log(err);
      });
  }

  render() {
    return (
      <>
        {
          this.state.burgers.map( burger =>
            <div key={burger._id} className="burger">
              <img src={burger.image} alt={burger.name} height="100px" />
              <span style={{display: "flex"}}>
                <h3>{burger.name}</h3>
                &nbsp;&nbsp;
                <p>{burger.avgRating}</p>
                &nbsp;&nbsp;
                <p>${burger.price}</p>
                &nbsp;&nbsp;
                <p>{burger.description}</p>
              </span>
              <span>
                <Link to={`/burger/${burger._id}`}>Review</Link>
                &nbsp;
                <Link to={`/edit/${burger._id}`}>Edit</Link>
                &nbsp;
                <a href="#!" onClick={this.delete.bind(this, burger._id)}>Delete</a>
              </span>
            </div>
          )
        }
      </>
    )
  }
}

export default List
