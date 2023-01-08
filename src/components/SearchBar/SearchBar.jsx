import { Header, Form, SearchButton, Label, Input } from './SearchBar.styled';

export const SearchBar = () => {
  return (
    <Header>
      <Form>
        <SearchButton type="submit">
          <span>Search</span>
        </SearchButton>

        <Label>
          <Input
            type="text"
            autocomplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </Label>
      </Form>
    </Header>
  );
};
