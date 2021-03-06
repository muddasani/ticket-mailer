import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
} from 'material-ui/Table';
import Header from './Header';
import OrdersListItem from './OrdersListItem';
import Spinner from './Spinner';
import { fetchAllOrders } from '../actions';
import { ACCENT_BLUE, LIGHT_BLUE } from '../style/constants';

const AllOrdersListStyles = () => ({
  container: {
    marginLeft: 180,
  },
  header: {
    display: 'flex',
    padding: '0px 24px 0px 24px',
  },
  fieldStyle: {
    margin: '24px 0 0 24px',
  },
  hintStyle: {
    color: LIGHT_BLUE,
  },
  inputStyle: {
    color: LIGHT_BLUE,
  },
  underlineStyle: {
    borderColor: ACCENT_BLUE,
  },
});

class AllOrdersList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: '',
    };
  }

  componentDidMount() {
    console.log('==== All Orders List Mounted!');
    this.props.dispatch(fetchAllOrders());
  }

  handleSearchInput = (event) => {
    this.setState({ search: event.target.value });
    console.log('search input', this.state.search);
  };

  renderContent() {
    const {
      header,
      fieldStyle,
      hintStyle,
      inputStyle,
      underlineStyle,
      refreshIndicator,
    } = AllOrdersListStyles();

    const {
      fetchAllOrdersSuccess,
      fetchAllOrdersRejected,
      fetchAllOrdersPending,
    } = this.props.tourData;

    if (fetchAllOrdersPending) {
      return (
        <Spinner />
      );
    } else if (fetchAllOrdersSuccess) {
      const ordersList = Array.from(fetchAllOrdersSuccess.payload);
      const filteredOrders = ordersList.filter(
        order =>
          order.email.toLowerCase().indexOf(this.state.search.toLowerCase()) !==
            -1 ||
          order.order_number.toString().indexOf(this.state.search) !== -1 ||
          order.shipping_address.name
            .toLowerCase()
            .indexOf(this.state.search.toLowerCase()) !== -1,
      );

      return (
        <div>
          <Header
            pageTitle={'All Orders'}
            searchState={this.state.search}
            handleSearchInput={this.handleSearchInput}
          />
          <Table>
            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
              <TableRow>
                <TableHeaderColumn>Order #</TableHeaderColumn>
                <TableHeaderColumn>Name</TableHeaderColumn>
                <TableHeaderColumn>Email</TableHeaderColumn>
                <TableHeaderColumn>Status</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map(order => (
                <OrdersListItem
                  key={order.id}
                  id={order.id}
                  orderNumber={order.order_number}
                  customerName={order.shipping_address.name}
                  customerEmail={order.email}
                  path={this.props.match.path}
                  variantId={order.line_items[0].variant_id}
                  variantTitle={order.line_items[0].variant_title}
                  dateTitle={order.line_items[0].title}
                  vendor={order.line_items[0].vendor}
                  user={this.props.user}
                />
              ))}
            </TableBody>
          </Table>
        </div>
      );
    } else if (fetchAllOrdersRejected) {
      return (
        <div>
          <p>Looks like there was a problem grabbing your data.</p>
          <p>
            <Link to="/all-orders">Click here to try again.</Link>
          </p>
        </div>
      );
    }
  }

  render() {
    const { container } = AllOrdersListStyles();

    return <div style={container}>{this.renderContent()}</div>;
  }
}

const mapStateToProps = state => ({ tourData: state.shopifyFetch, user: state.userAuth });

export default connect(mapStateToProps)(AllOrdersList);
