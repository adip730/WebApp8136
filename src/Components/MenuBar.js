import React,  { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';
import logo2 from './logo2.png';

import LogOut from './AuthFlow/LogOut';

class MenuBar extends Component {
    constructor(props) {
      super(props);

      this.toggle = this.toggle.bind(this);
      this.state = {
        isOpen: false
      };
    }
    toggle() {
      this.setState({
        isOpen: !this.state.isOpen
      });
    }
    render() {
      return (
        <div>
          <Navbar color="light" light expand="md">
            <NavbarBrand href="/">
              <img src={logo2} width='60' height='48'/>
            </NavbarBrand>


            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>


                <UncontrolledDropdown nav inNavBar>
                  <DropdownToggle nav caret>
                    Workout
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>
                      <NavLink href="/Workout/">Today's Workout</NavLink>
                    </DropdownItem>
                    <DropdownItem>
                      <NavLink href="/Program/">Your Program</NavLink>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>

                <UncontrolledDropdown nav inNavBar>
                  <DropdownToggle nav caret>
                    Progress
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>
                      <NavLink href="/Entry/">New Entry</NavLink>
                    </DropdownItem>
                    <DropdownItem>
                      <NavLink href="/History/">View History</NavLink>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>

                <NavItem>
                  <NavLink href="/ExerciseLibrary/">Exercise Library</NavLink>
                </NavItem>
                
                <UncontrolledDropdown nav inNavBar>
                  <DropdownToggle nav caret>
                    Profile
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>
                      <NavLink href="/Profile/">View Profile</NavLink>
                    </DropdownItem>
                    <DropdownItem>
                      <NavLink href="/Settings/">Settings</NavLink>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
                <LogOut/>


              </Nav>
            </Collapse>
          </Navbar>
        </div>
      );
    }
  }

  export default MenuBar;
