import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import FlatButton from 'material-ui/FlatButton';
import { sendEmail, fetchOrders } from '../../actions';
import formFields from './formFields';
import { ACCENT_BLUE, WHITE } from '../../style/constants';

const EmailFormReviewStyles = () => ({
  formContainer: {
    width: 600,
    minWidth: 350,
    paddingLeft: 16,
  },
  inputsContainer: {
    display: 'flex',
    flexDirection: 'column',
    margin: '8px 0px',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  blue: {
    backgroundColor: ACCENT_BLUE,
    color: WHITE,
  },
});

class EmailFormReview extends Component {
  componentDidMount() {
    console.log('==== EmailFormReview Mounted!');
    const variantId = this.props.user.currentTour.payload.variantId;
    this.props.dispatch(fetchOrders(variantId));
  }

  render() {
    console.log('EmailFormReview props', this.props);
    const {
      formContainer,
      inputsContainer,
      buttonContainer,
      blue,
    } = EmailFormReviewStyles();

    const { formValues, onCancel, tourData, user } = this.props;
    const {
      checkIn,
      startTime,
      pickup,
      shipping,
      shippingDate,
      digital,
      digitalDate,
    } = formFields;

    const reviewForm = formFields.map(field => (
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '8px',
        }}
      >
        <h4>{field.label}</h4>
        <p>{formValues[field.name]}</p>
      </div>
    ));

    return (
      <div style={formContainer}>
        <div className="review-form__inputs" style={inputsContainer}>
          {reviewForm}
        </div>
        <div className="email-form__button-container" style={buttonContainer}>
          <FlatButton label="Go Back" onClick={onCancel} />
          <FlatButton
            label="Send to all"
            style={blue}
            onClick={() => {
              this.props.dispatch(
                sendEmail(
                  formValues,
                  tourData.fetchOrdersSuccess.payload,
                  user.currentTour.payload,
                ),
              );
            }}
          />
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  formValues: state.form.emailForm.values,
  tourData: state.shopifyFetch,
  user: state.userAuth,
});

export default connect(mapStateToProps)(EmailFormReview);
