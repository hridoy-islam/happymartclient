import React from 'react';

const BasicButton = ({children}) => {
    return (
        <button
            type='submit'
            className='bg-primary px-4 py-2 rounded'
        >
            {children}
        </button>
    );
};

export default BasicButton;