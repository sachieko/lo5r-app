export interface ISearchBarProps {
  title: string;
  value: string;
  onChange: (arg: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus: () => void;
  onBlur: () => void;
};

export const SearchBar = ({
  title,
  value, 
  onChange,
  onFocus,
  onBlur
}: ISearchBarProps): JSX.Element => {
  return (
    <>
      <span>{title as React.ReactNode} </span>
        <input 
          type='search' 
          className='search' 
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur} // Delay is used to allow search links to be clicked before disabling them
          value={value} // Necessary to cast as string
          spellCheck='false'
            />
    </>
  );
};
