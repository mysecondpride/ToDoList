import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ToDoItem from "../component/toDoItem.jsx";
import { FormControl } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import { Button } from "react-bootstrap";
import Axios from "axios";
import { connect } from "react-redux";
import { getData } from "../redux/toDoAction/index.js";

import PropTypes from "prop-types"; // Import PropTypes lalu definisikan

class ToDoPages extends React.Component {
  constructor(props) {
    super(props);
    // fungsi dari createReff adalah seperti DOM, akses pada input atau field ya intinya.
    this.myRef = React.createRef();
  }

  fetchData = () => {
    Axios.get(`http://localhost:2000/activities`)
      .then((res) => {
        console.log(res.data);
        this.props.getData(res.data);
      })
      .catch((error) => {
        console.error("There was an error deleting the item:", error);
        alert("Failed to delete the item!");
      });
  };

  componentDidMount() {
    this.fetchData();
  }

  onDelete = (id) => {
    Axios.delete(`http://localhost:2000/activities/${id}`)
      .then((res) => {
        console.log(res.data);
        this.fetchData();
      })

      .catch((error) => {
        console.error("There was an error deleting the item:", error);
        alert("Failed to delete the item!");
      });
  };

  onAdd = () => {
    let newTodo = this.myRef.current.value;
    // let afternewTodo = (this.myRef.current.value = " ");
    let obj = { nama: newTodo, isCompleted: false };
    Axios.post(`http://localhost:2000/activities`, obj)
      .then((res) => {
        console.log(res.data);
        this.fetchData();
      })

      .catch((error) => {
        console.error("There was an error deleting the item:", error);
        alert("Failed to delete the item!");
      });
    // afternewTodo;
  };

  onCompleted = (id, newStatus) => {
    Axios.patch(`http://localhost:2000/activities/${id}`, {
      isCompleted: !newStatus,
    })
      .then((res) => {
        console.log("ini setelah di edit oleh patch:", res.data);
        this.fetchData();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  showData = () => {
    return this.props.listActivities.map((item) => {
      return (
        <ToDoItem
          key={item.id}
          ayam={item}
          delete={() => this.onDelete(item.id)}
          completed={() => this.onCompleted(item.id, item.isCompleted)}
        />
      );
    });
  };

  render() {
    console.log(this.props.listActivities);
    return (
      <Container>
        <div style={style.container}>
          {this.showData()}
          <div style={style.input}>
            <FormControl placeholder="bismillah input" ref={this.myRef} />
            <Button variant="primary" onClick={this.onAdd} className="ml-2">
              OK
            </Button>
          </div>
        </div>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  console.log("Redux State:", state.todo.activities);
  console.log(typeof state.todo.activities);

  return {
    listActivities: state.todo.activities,
  };
};

const style = {
  container: {
    padding: "15px",
  },
  input: {
    width: "25vw",
    marginLeft: "10px",
    display: "flex",
  },
};

ToDoPages.propTypes = {
  getData: PropTypes.func.isRequired, // Validate that getData is a function and is required
  listActivities: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired, // id must be a string
      nama: PropTypes.string.isRequired, // nama must be a string
      isCompleted: PropTypes.bool.isRequired, // isCompleted must be a boolean
    })
  ).isRequired,
};

export default connect(mapStateToProps, { getData })(ToDoPages); //parameter reducer dan action sudah lengkap, dihubungkan ke toDOPages
