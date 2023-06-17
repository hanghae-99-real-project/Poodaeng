/* eslint-disable dot-notation */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';

// import makeAnimated from 'react-select/animated';
import makeAnimated from 'react-select/animated';
// import { colourOptions } from '../data';
import Select from 'react-select';
import { styled } from 'styled-components';
import { darken, lighten, linearGradient } from 'polished';
import { interestOptions } from '../data/Areas';

const animatedComponents = makeAnimated();

// 서버에서 id(숫자)를 보내줌. 근데 인덱스가 아니라 데이터베이스 번호라서 -1 해서 인덱스번호로 찾아야 함.

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    // borderColor: "red",
    border: '3px solid #FE5665',
    borderRadius: '10px',
    '&:hover': {
      borderColor: '#FE5665',
    },
    // outline: "none",
    boxShadow: 'none',
  }),
  menu: provided => ({
    ...provided,
    border: `3px solid #FE5665`,
    borderRadius: '10px',
    overflow: 'hidden',
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: '#fff',
    color: state.isSelected ? '#FE5665' : 'black',
    '&:hover': {
      backgroundColor: '#FE5665',
      borderRadius: '3px',
    },
    // backgroundColor: state.isSelected ? "white" : "white",
    // color: state.isSelected ? "white" : "black",
    // "&:hover": {
    //     backgroundColor: state.isSelected ? "#FE5665" : "#F7F7F7",
    // },
  }),
  multiValue: (provided, { data }) => {
    // console.log(data);
    const color = data.color;
    return {
      ...provided,
      backgroundColor: color,
    };
  },
  multiValueLabel: (styles, { data }) => ({
    ...styles,
    color: '#fff',
  }),
  multiValueRemove: (styles, { data }) => ({
    ...styles,
    // color: data.color,
    color: '#fff',
    ':hover': {
      backgroundColor: data.color,
      color: lighten(0.1, data.color),
    },
  }),
  // multiValue: (provided) => ({
  //     ...provided,
  //     backgroundColor: "#FE5665",
  // }),
  singleValue: provided => ({
    ...provided,
    color: 'red',
  }),
};

function Selector({ selectedOptions, setSelectedOptions }) {
  /* setValue 길이가 3이상 증가 안되게 막음 */
  const handleChange = selected => {
    if (selected.length > 3) {
      // console.log('you already chose 3 options.');
      return;
    }
    setSelectedOptions(selected);
  };

  /* selector에 3개 초과 생성되는 것도 막아줘야 함. => 굳이 필요없었음.. */
  const handleCreateOption = inputValue => {
    if (selectedOptions.length < 3) {
      const newOption = { label: inputValue, value: inputValue };
      setSelectedOptions([...selectedOptions, newOption]);
      return newOption;
    }
    return null;
  };

  const [isSelected, setIsSelected] = useState(false);
  return (
    <StyledSelect
      closeMenuOnSelect={false}
      components={animatedComponents}
      styles={customStyles}
      className='basic-multi-select'
      classNamePrefix='select'
      options={interestOptions}
      // defaultValue={[interestOptions[4], interestOptions[5]]}
      // isMulti
      value={selectedOptions}
      isValidNewOption={() => selectedOptions.length < 3}
      onCreateOption={handleCreateOption}
      onChange={handleChange}
      error={selectedOptions.length < 3}
      placeholder='choose at least 3 options'
    />
  );
}

const StyledSelect = styled(Select)`
  /* border: 3px solid ${({ theme }) => theme['borderColor']};
    border-radius: 10px; */

  /* .react-select__control {
        background: linear-gradient(to right, #fe3a72, #ff625f);
        border: 3px solid ${({ theme }) => theme['borderColor']};
        box-shadow: none;
    } */

  /* selector 커스텀 스크롤바 스타일 */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background-color: #fe5665;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #fe5665;
    border-radius: 5px;
    &:hover {
      background-color: #fe5665;
    }
  }
`;

export default React.memo(Selector);
