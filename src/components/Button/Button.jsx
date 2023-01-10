import PropTypes from 'prop-types';

import { LoadMoreButton, Container } from './Button.styled';

export const Button = ({ onClick }) => {
  return (
    <Container>
      <LoadMoreButton type="button" onClick={onClick}>
        Load more
      </LoadMoreButton>
    </Container>
  );
};

Button.propTypes = { onClick: PropTypes.func.isRequired };
