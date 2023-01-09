import { Header, Form, SearchButton, Label, Input } from './SearchBar.styled';
import { ReactComponent as Icon } from '../Icons/search.svg';
import { Component } from 'react';

export class SearchBar extends Component {
  state = {
    value: '',
  };

  handleChange = e => {
    const { value } = e.target;
    this.setState({ value });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.value);
    this.setState({ value: '' });
  };

  render() {
    const { value } = this.state;
    return (
      <Header>
        <Form onSubmit={this.handleSubmit}>
          <SearchButton type="submit">
            <span>
              <Icon />
            </span>
          </SearchButton>

          <Label>
            <Input
              type="text"
              autocomplete="off"
              autoFocus
              placeholder="Search images and photos"
              value={value}
              onChange={this.handleChange}
            />
          </Label>
        </Form>
      </Header>
    );
  }
}
