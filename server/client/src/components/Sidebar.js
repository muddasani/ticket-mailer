import React, { Component } from 'react';
import { connect } from 'react-redux';
import Radium from 'radium';
import { List, ListItem } from 'material-ui/List';
import SettingsIcon from 'material-ui/svg-icons/action/settings';
import { LIGHT_BLUE, DARK_BLUE, WHITE } from '../style/constants';

const SidebarStyles = () => ({
  sidebar: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: DARK_BLUE,
    color: LIGHT_BLUE,
    height: '100vh',
    position: 'fixed',
  },
  listStyleTop: {
    width: 180,
  },
  listItemStyle: {
    color: LIGHT_BLUE,
  },
});


class Sidebar extends Component {
  componentDidMount() {
    console.log('==== Sidebar mounted!');
  }

  componentWillReceiveProps() {
    this.greeting();
  }

  handleLogout = () => {

  }

  greeting = () => {
    if (this.props.user.fetchedUserSuccess !== undefined) {
      const { firstName } = this.props.user.fetchedUserSuccess.payload;
      return `Hello, ${firstName}.`;
    }
  }

  render() {
    const {
      sidebar,
      listStyleTop,
      listItemStyle,
    } = SidebarStyles();


    return (
      <div className="sidebar" style={sidebar}>
        <List style={listStyleTop}>
          <ListItem primaryText={this.greeting()} style={listItemStyle} />
          <ListItem primaryText="Home" style={listItemStyle} />
          <ListItem primaryText="Tours" style={listItemStyle} />
          <ListItem primaryText="Shows" style={listItemStyle} />
          <ListItem primaryText="Orders" style={listItemStyle} />
        </List>
        <List>
          <ListItem primaryText="Settings" style={listItemStyle} rightIcon={<SettingsIcon color={LIGHT_BLUE} />} />
          <ListItem primaryText="Log out" style={listItemStyle} onClick={this.handleLogout} />
        </List>
      </div>
    );
  }
}

const mapStateToProps = state => ({ user: state.userAuth });

export default Radium(connect(mapStateToProps)(Sidebar));
