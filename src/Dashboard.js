// in src/Dashboard.js
import React from 'react';
import { Card, CardHeader, CardText } from 'material-ui/Card';

export default () => (
    <Card style={{ margin: '2em' }}>
        <CardHeader title="Welcome to StreamingBandit" />
        <CardText>Run your experiments and have a little fun!</CardText>
    </Card>
);