import { Header, Form, SearchButton, Label, Input } from './SearchBar.styled';

export const SearchBar = () => {
  return (
    <Header>
      <Form class="form">
        <SearchButton type="submit" class="button">
          <span class="button-label">Search</span>
        </SearchButton>

        <Label>
          <Input
            class="input"
            type="text"
            autocomplete="off"
            autofocus
            placeholder="Search images and photos"
          />
        </Label>
      </Form>
    </Header>
  );
};
