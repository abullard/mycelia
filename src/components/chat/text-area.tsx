import React from 'react';
import styled from 'styled-components';

type TextAreaProps = {
  id: string;
  label?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: () => void;
  disabled?: boolean;
  placeholder?: string;
};

const TextArea = (props: TextAreaProps) => {
  const {
    id,
    label,
    value,
    onChange,
    onSubmit: handleSubmit,
    disabled = false,
    placeholder,
  } = props;

  return (
    <Container>
      {label && <Label htmlFor={id}>{label}</Label>}
      <form action={() => handleSubmit()}>
        <StyledTextArea
          id={id}
          value={value}
          onChange={onChange}
          disabled={disabled}
          placeholder={placeholder}
        />
        <SubmitButton type="submit" value="Submit" />
      </form>
    </Container>
  );
};

export default TextArea;

const SubmitButton = styled.input.attrs({ type: 'submit' })`
  background-color: #f6ad55;
  color: black;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  font-weight: 500;
  margin: 1rem;
  right: 0;
  text-transform: uppercase;  
  font-size: 0.875rem;
  cursor: pointer;

  &:hover {
    background-color: #1565c0;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Label = styled.label`
  font-size: 0.875rem;
  color: #555;
`;

const StyledTextArea = styled.textarea`
  padding: 12px;
  font-size: 1rem;
  font-family: inherit;
  line-height: 1.5;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
  min-height: 100px;
  background-color: #fff;
  width: 100%;
  color: #333;
  transition: border-color 0.2s, box-shadow 0.2s;

  &:focus {
    outline: none;
    border-color: #3f51b5; /* MUI primary color */
    box-shadow: 0 0 0 2px rgba(63, 81, 181, 0.2);
  }

  &:disabled {
    background-color: #f5f5f5;
    color: #aaa;
    cursor: not-allowed;
  }
`;
