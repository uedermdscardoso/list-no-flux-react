import React, { Component } from 'react';
import './List.css';

import ListItem from '../ListItem/ListItem';

class List extends Component {

    static defaultProps = {
        items : [],
        onRemove: () => {},
        onUpdate: () => {}
    };

    constructor(props){
        super(props);
        this.update = this.update.bind(this);
        this.remove = this.remove.bind(this);
    }

    update(item){
        this.props.onUpdate(item);
    }

    remove(id){
        this.props.onRemove(id);
    }

    render(){
        const { props } = this;
        if(props.items.length === 0){
            return <div className="message-no-items"><h3>No Items</h3></div>;
        }
        return(
            <ul>
                {
                    props.items.map(item => <ListItem 
                                                key={item.id} 
                                                item={item} 
                                                onRemove={this.remove} 
                                                onUpdate={this.update} />)
                }
            </ul>
        );
    };
}
export default List;