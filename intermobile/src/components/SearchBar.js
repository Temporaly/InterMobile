import React from 'react';
import { Form, FormControl, InputGroup } from 'react-bootstrap';

const SearchBar = () => {
  return (
    <div className='search'>
      <Form>
        <InputGroup className='row g-3 align-items-center'  >
          <FormControl 
            type="text"
            placeholder="Buscar..."
            style={{ borderRadius: '20px', backgroundColor: '#3A95B5', paddingTop: '4%', paddingBottom: '4%' }}
          />
        </InputGroup>
      </Form>
    </div>
  );
};

export default SearchBar;