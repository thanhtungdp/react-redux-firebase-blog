import React, {Component} from 'react';
import {Grid, Col} from 'react-bootstrap';

export default class ProtectedPage extends Component {
    constructor() {
        super(...arguments)
    }

    render() {
        return (
            <Grid>
                <Col md={6} mdOffset={3}>
                    <h4>Protected page</h4>
                </Col>
            </Grid>
        )
    }
}