import React, {Component} from "react";
import SideNav, { NavItem, NavText } from '@trendmicro/react-sidenav';
import { Navbar } from "react-bootstrap";
import { ReactAgenda , guid } from 'react-agenda';

import './Account.css'
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

const now = new Date();

class Account extends Component {
  constructor(props) {
    super(props);


    this.state = {
      colors: {
        'color-1':"rgba(102, 195, 131 , 1)" ,
        "color-2":"rgba(242, 177, 52, 1)" ,
        "color-3":"rgba(235, 85, 59, 1)"
      },
      items: [
        {
          _id            :guid(),
          name          : 'Meeting , dev staff!',
          startDateTime : new Date(now.getFullYear(), now.getMonth(), now.getDate(), 10, 0),
          endDateTime   : new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12, 0),
          classes       : 'color-1'
        },
        {
          _id            :guid(),
          name          : 'Working lunch , Holly',
          startDateTime : new Date(now.getFullYear(), now.getMonth(), now.getDate()+1, 11, 0),
          endDateTime   : new Date(now.getFullYear(), now.getMonth(), now.getDate()+1, 13, 0),
          classes       : 'color-2 color-3'
        }
      ],
      selected:[],
      cellHeight:30,
      showModal:false,
      locale:"fr",
      rowsPerHour:2,
      numberOfDays:4,
      startDate: new Date()
    };
    this.handleCellSelection = this.handleCellSelection.bind(this);
    this.handleItemEdit = this.handleItemEdit.bind(this);
    this.handleRangeSelection = this.handleRangeSelection.bind(this);
  }

  handleCellSelection(item){
    console.log('handleCellSelection',item)
  }
  handleItemEdit(item){
    console.log('handleItemEdit', item)
  }
  handleRangeSelection(item){
    console.log('handleRangeSelection', item)
  }

  render() {
    return (
      <div>
        <div>
          <Navbar id="navBarAccount" fixedTop>
            <Navbar.Header>
              <Navbar.Brand>
                <a>
                  <img src={require('./static/SmallLogo.png')} alt="logo" height="100" width="auto" id="logo"/>
                </a>
              </Navbar.Brand>
              <Navbar.Toggle/>
            </Navbar.Header>
            <NavItem>
              <NavText>
                <h1 style={{color: "white", textAlign :"center"}}>
                  Ma gallerie
                </h1>
              </NavText>
            </NavItem>

          </Navbar>
        </div>

        <SideNav id="sideNav" >
          <SideNav.Nav defaultSelected="home">
            <NavItem eventKey="home">
              <NavText className="navText">
                Acceuil
              </NavText>
            </NavItem>
            <NavItem eventKey="statistiques">
              <NavText className="navText">
                Statistiques
              </NavText>
            </NavItem>
            <NavItem id="navItem" eventKey="oeuvres">
              <NavText className="navText">
                Oeuvres
              </NavText>
            </NavItem>
            <NavItem eventKey="Clients">
              <NavText className="navText">
                Clients
              </NavText>
            </NavItem>
            <NavItem eventKey="Facturation">
              <NavText className="navText">
                Facturation
              </NavText>
            </NavItem>
            <h6 id="splitSideBar">
              <span>______________</span>
            </h6>
            <NavItem eventKey="Profil">
              <NavText className="navText">
                Profil
              </NavText>
            </NavItem>
            <NavItem eventKey="Deconnection">
              <NavText className="navText">
                Déconnection
              </NavText>
            </NavItem>
          </SideNav.Nav>
        </SideNav>

        <div>
          <ReactAgenda
            minDate={now}
            maxDate={new Date(now.getFullYear(), now.getMonth()+3)}
            disablePrevButton={false}
            startDate={this.state.startDate}
            cellHeight={this.state.cellHeight}
            locale={this.state.locale}
            items={this.state.items}
            numberOfDays={this.state.numberOfDays}
            rowsPerHour={this.state.rowsPerHour}
            itemColors={this.state.colors}
            autoScale={false}
            fixedHeader={true}
            onItemEdit={this.handleItemEdit.bind(this)}
            onCellSelect={this.handleCellSelection.bind(this)}
            onRangeSelection={this.handleRangeSelection.bind(this)}
          />
        </div>
      </div>
    );
  }
}

export default Account;
