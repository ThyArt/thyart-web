import React, { Component } from 'react';
import { Jumbotron } from 'react-bootstrap';

import './Services.css'

class ThyArtServices extends Component {
    constructor(props, context) {
        super(props, context);
    }

    render()
    {
        return (
            <div>
                <Jumbotron >
                    <img src="/Device_iPad.png" alt="Ipad" id="deviceOne"/>
                        <p class="servicesLeft">Lorem Ipsum Dolores</p>
                </Jumbotron>
                <Jumbotron>
                    <img src="/Device_Iphone.png" alt="Iphone" id="deviceTwo"/>
                    <p className="servicesRight">Lorem Ipsum Dolores</p>
                </Jumbotron>
                <Jumbotron>
                    <img src="/Device_MacBook.png" alt="MacBook" id="deviceThree"/>
                    <p className="servicesLeft">Lorem Ipsum Dolores</p>
                </Jumbotron>
            </div>
        );
    }
}

export default ThyArtServices;