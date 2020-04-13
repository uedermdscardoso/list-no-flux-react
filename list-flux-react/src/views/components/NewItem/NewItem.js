import React, { Component} from 'react';
import { Button, Icon, Form, Input } from 'semantic-ui-react';
import 'semantic-ui/dist/semantic.min.css';
import './NewItem.css';

class NewItem extends Component {

    static defaultProps = {
        onAdd: () => {},
        onClear: () => {}
    };

    constructor(props){
        super(props);
        this.state = {
            description: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.clear = this.clear.bind(this);
        this.add = this.add.bind(this);
    }

    handleChange(event){
        const { name, value } = event.target;

        this.setState({
            [name]: value
        });
    }

    add(event){
        event.preventDefault(); //Evitar o comportamento padrão do formulário para continuar na mesma tela
        const description = this.state.description;
        if(description){
            this.setState({description: ''});
            this.props.onAdd(description);
        }
    }

    clear(){
        this.props.onClear();
    }

    render(){
        const { state } = this;
        return(
            <Form onSubmit={this.add}>
                <Form.Field>
                    <Input type="text" placeholder="New Item" name="description" value={state.description} onChange={this.handleChange} />
                </Form.Field>
                <Button icon color="google plus" title="Add"><Icon name="plus circle" /> Add</Button>
                <Button color="black" title="Clear" onClick={this.clear}><Icon name="close" />Clear</Button>  
            </Form>
        );
    };
}
export default NewItem;