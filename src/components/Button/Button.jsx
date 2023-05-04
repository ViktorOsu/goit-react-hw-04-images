import { ButtonStyled } from './Button.styled';
import PropTypes from 'prop-types';

export const Button = ({ onClick = null }) => {
  return (
    <ButtonStyled type="button" className={Button} onClick={onClick}>
      Load more
    </ButtonStyled>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
