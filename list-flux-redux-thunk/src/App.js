import React, { Component } from 'react';
import { Container, Grid } from 'semantic-ui-react';
import './App.css';

import List from './views/components/List/List';
import NewItem from './views/components/NewItem/NewItem';

import * as ItemActions from './data/actions/ItemActions';

//Integrar react ocm redux
import { connect } from 'react-redux';

class App extends Component {

  /* 
    install redux and react-redux
    npm i -S redux react-redux
    npm i redux-thunk --save 
  */

  componentDidMount(){//Quando o componente é montado
    this.props.dispatch(ItemActions.list()); //ItemActions.list() retorna uma função e não um objeto
  }

  render(){
      const { props } = this,
        { dispatch } = props;

      return(
        <Container fluid={true}>
          <Grid columns={2} centered={true}>
            <Grid.Row className="grid">
              <Grid.Column width={3}>
                <NewItem onAdd={(description) => dispatch(ItemActions.create(description))} onClear={() => dispatch(ItemActions.clear()) } />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row className="row-separate">
              <Grid.Column width={4}>
                <List items={props.list} onRemove={(id) =>  dispatch(ItemActions.remove(id)) } onUpdate={(item) => dispatch(ItemActions.update(item)) } />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      );
  };

}

//Mapear o estado da nossa store e transformar em propriedade para o nosso componente
const mapStateToProps = state => ({
  list: state.ItemReducer
});

export default connect(mapStateToProps)(App);
