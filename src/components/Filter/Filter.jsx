import css from './filter.module.css';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';

export const Filter = ({ value, onChange }) => {
  const filterId = nanoid();

  return (
    <div className={css.filterWrapper}>
      <input
        id={filterId}
        className={css.filter}
        name="filter"
        type="text"
        value={value}
        onChange={onChange}
        placeholder="search"
      />
    </div>
  );
};

Filter.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};
