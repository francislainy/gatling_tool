import React, {Component} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './simple-sidebar.css'
import Popup from './components/Popup'
// import Dialog from '@material-ui/core/Dialog';
import {Dialog} from '@material-ui/core';


class App extends Component{

    constructor(props) {
        super(props);
        this.state = {};
        this.openPopupHandler = this.openPopupHandler.bind(this);
        this.closePopupHandler = this.closePopupHandler.bind(this);
    }

    state = {showPopup: false};
    // state = {openDialog: false};

    openPopupHandler = () => {
        this.setState({showPopup: true});
    }

    closePopupHandler = () => {
        this.setState({showPopup: false});
    }

    // handleOpenDialog() {
    //     this.setState({
    //         openDialog: true
    //     });
    // }
    //
    // handleCloseDialog() {
    //     this.setState({
    //         openDialog: false
    //     });
    // }

    render() {

        let popup = null;
        if(this.state.showPopup) {
            popup = (<Popup message='the text you need to display' closeMe={this.closePopupHandler}/>);
            // popup = (<Dialog fullScreen={false} open={this.handleOpenDialog} onCancel={this.handleCloseDialog}/>);
        }

        return (
            <div className="d-flex" id="wrapper">

                <div className="bg-light border-right" id="sidebar-wrapper">
                    <div className="sidebar-heading">Start Bootstrap</div>
                    <div className="list-group list-group-flush">
                        <a href="#" className="list-group-item list-group-item-action bg-light">Dashboard</a>
                        <a href="#" className="list-group-item list-group-item-action bg-light">Shortcuts</a>
                        <a href="#" className="list-group-item list-group-item-action bg-light">Overview</a>
                    </div>
                </div>

                <div id="page-content-wrapper">

                    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                        <div><a href="#" className="navbar-brand">Gatling Reporting Tool</a></div>
                        <button className="navbar-toggler" type="button" data-toggle="collapse"
                                data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item active">
                                    <a className="nav-link" href="#">Dashboard</a>
                                </li>
                            </ul>
                        </div>
                    </nav>

                    <button className="btn btn-primary"
                            onClick={this.openPopupHandler}>
                        Import Gatling Report
                    </button>
                    {popup}
                    {/*{this.openDialog && <Dialog open={this.handleOpenDialog} onCancel={this.handleCloseDialog}  />}*/}

                    <table className="table">
                        <thead className="thead-light">
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Run Date</th>
                            <th scope="col">Created</th>
                            <th scope="col">Category</th>
                            <th scope="col">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                            <td>@mdo</td>
                        </tr>
                        <tr>
                            <th scope="row">2</th>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                            <td>@fat</td>
                        </tr>
                        <tr>
                            <th scope="row">3</th>
                            <td>Larry</td>
                            <td>the Bird</td>
                            <td>@twitter</td>
                            <td>@twitter</td>
                        </tr>
                        </tbody>
                    </table>

                </div>

            </div>
        )

    }
}

export default App;
