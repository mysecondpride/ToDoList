import React from "react";
import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PropTypes from "prop-types"; // Import PropTypes lalu definisikan

class ToDoItem extends React.Component {
  render() {
    return (
      <Container>
        <Row>
          <Col style={colStyle.prop}>
            <div style={style.container}>
              <h3>
                ID: {this.props.ayam.id}, {this.props.ayam.nama}
              </h3>
              <div>
                {" "}
                <Button
                  style={buttonStyle.prop}
                  variant="danger"
                  onClick={this.props.delete}
                >
                  Delete
                </Button>
                {this.props.ayam.isCompleted ? (
                  <Button
                    style={buttonStyle.prop}
                    variant="primary"
                    onClick={this.props.completed}
                  >
                    finished
                  </Button>
                ) : (
                  <Button
                    style={buttonStyle.prop}
                    variant="primary"
                    onClick={this.props.completed}
                  >
                    completed
                  </Button>
                )}
              </div>
            </div>
            <div>
              {console.log("ini coba log:", this.props.completed.isCompleted)};
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

ToDoItem.propTypes = {
  ayam: PropTypes.shape({
    id: PropTypes.string.isRequired,
    nama: PropTypes.string.isRequired,
    isCompleted: PropTypes.bool.isRequired, // Ensure this is a boolean for the ternary check
  }).isRequired,
  delete: PropTypes.func.isRequired,
  completed: PropTypes.func.isRequired,
};

// ToDoItem.propTypes = {
//   completed: PropTypes.shape({
//     id: PropTypes.string.isRequired,
//     nama: PropTypes.string.isRequired,
//     iscompleted: PropTypes.bool.isRequired,
//   }),
// };

const style = {
  container: {
    backgroundColor: " salmon",
    width: "25vw",
    lineHeight: "3.5rem",
    marginBottom: "1rem",
    display: "flex",
    justifyContent: "space-between",
    borderRadius: "10px",
  },
};

const buttonStyle = {
  prop: {
    lineHeight: "1rem",
    marginLeft: "10px",
  },
};

const colStyle = {
  prop: {
    display: "flex",
    alignItems: "center",
  },
};

export default ToDoItem;
