import React, { Component, PropTypes } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

import FieldGroup from './FieldGroup';

const propTypes = {
  order: PropTypes.number.isRequired,
  weight: PropTypes.string,
  reps: PropTypes.string,
  onInputChange: PropTypes.func.isRequired,
  onRemoveSet: PropTypes.func.isRequired,
  getInputName: PropTypes.func.isRequired
};

const defaultProps = {
  weight: '',
  reps: ''
};

class SetForm extends Component {
  constructor(props) {
    super(props);

    this.onRemoveSetClick = this.onRemoveSetClick.bind(this);
  }

  componentDidMount() {
    this.firstField.focus();
  }

  onRemoveSetClick(e) {
    e.preventDefault();

    this.props.onRemoveSet();
  }

  render() {
    const { order, weight, reps, onInputChange, getInputName } = this.props;

    return (
      <div className="set-form">
        <Row>
          <Col className="col-xs-3">
            <label className="row-label">Component {order}</label>
          </Col>
          <Col className="col-xs-7 col-collapse-right">
            <FieldGroup
              id={getInputName('weight')}
              name={getInputName('weight')}
              type="text"
              label="Name"
              srOnly={true}
              value={weight}
              placeholder="Name"
              onChange={(e) => onInputChange("weight", e.target.value)}
              ref={(input) => { this.firstField = input }}
            />
          </Col>
          <Col className="col-xs-2">
            <div className="remove-set">
              <a
                href="#remove-set-{order}"
                onClick={this.onRemoveSetClick}
                className="text-danger"
              >
                Remove
              </a>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}

SetForm.propTypes = propTypes;
SetForm.defaultProps = defaultProps;

export default SetForm;
