import React, { Component } from 'react';
import { Input, Button, Icon, Checkbox } from 'semantic-ui-react';
import './ListItem.css';

class ListItem extends Component {
    static defaultProps = {
        item: {},
        onRemove: () => {},
        onUpdate: () => {}
    };

    constructor(props){
        super(props);
        
        this.update = this.update.bind(this);
        this.remove = this.remove.bind(this);
        this.check = this.check.bind(this);

        this.input = React.createRef(); //Criando referência
    }

    update(){
        const { item } = this.props;
        item.description = this.input.current.inputRef.current.value; //this.input.current.value;
        this.props.onUpdate(item);
    }
    
    remove(){
       this.props.onRemove(this.props.item.id); 
    }
    
    check(){
        const { item } = this.props;
        item.isChecked = !item.isChecked;
        this.props.onUpdate(item);
    }

    //Atualiza quando tira o foco no campo de descrição
    render(){
        const { props } = this,
            item = props.item;
        return(
            <li className="list-item">
                <Checkbox className="separate" checked={item.isChecked} onChange={this.check}></Checkbox>
                <Input className="separate" onBlur={this.update} ref={this.input} type="text" disabled={item.isChecked} defaultValue={item.description} />
                <Button icon onClick={this.remove}><Icon name="trash alternate"></Icon></Button>
            </li>
        );
    };
}
export default ListItem;