import './SearchContainer.css';

interface Props {
  children: string | JSX.Element | JSX.Element[];
}

const SearchContainer = ({children}: Props) => {
  return (
    <div className={"searchContainer-search"}>{children}</div>
  )
}

export default SearchContainer;