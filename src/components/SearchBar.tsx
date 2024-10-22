export interface ISearchBarProps {
  title: string;
  value: string;
  onChange: (arg: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus: () => void;
  onBlur: () => void;
}

export const SearchBar = ({
  title,
  value,
  onChange,
  onFocus,
  onBlur,
}: ISearchBarProps): JSX.Element => {
  return (
    <>
      <span className={"searchbar-title"}>{title as React.ReactNode} </span>
      <input
        name="search"
        type="search"
        className="search"
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur} // Delay is used to allow search links to be clicked before disabling them
        value={value} // Necessary to cast as string
        placeholder="Enter search term"
        spellCheck="false"
        autoComplete="off"
      />
    </>
  );
};
