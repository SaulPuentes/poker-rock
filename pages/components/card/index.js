import Card from '../../../models/Card';
import Suit from '../../../models/Suit';
import Rank from '../../../models/Rank';
import React from 'react';
import Image from 'next/image';

export default class CardComponent extends React.Component {

    model = undefined;

    constructor(props) {
        super(props);
        this.model = new Card(props.suit, props.rank);
    };

    render = () =>
        <Image
            src={this.model.path}
            width={60}
            height={120} />

}
