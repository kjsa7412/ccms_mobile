import Select from 'react-select';
import {FixedSizeList as List} from 'react-window';
import {ISearchData} from "@custom-interfaces/search-interface";
import './SearchRS.css';

interface SearchRS {
  placeholder: string;
  handleChange: any;
  option: Array<ISearchData>;
  value?: ISearchData | null;
  defaultValue?: ISearchData | null;
  isClearable?: boolean;
  isLong?: boolean;
  required?: boolean;
}

interface MenuList {
  options: any;
  children: any;
  maxHeight: any;
  getValue: any;
}

const MenuList = ({options, children, getValue}: MenuList) => {
  const [value] = getValue();
  const initialOffset = !!value?.value
    ? options.findIndex((i: { value: string }) => i.value == value.value) * 35
    : 35;

  return (
    <List
      width={'100%'}
      height={
        !!children.length ? (children.length * 35 > 7 * 35 ? 7 * 35 : children.length * 35) : 70
      }
      itemCount={children.length}
      itemSize={35}
      initialScrollOffset={
        !!children.length ? (children.length * 35 > 7 * 35 ? initialOffset : 35) : 35
      }
    >
      {({index, style}) => <div style={style}>{children[index]}</div>}
    </List>
  );
};

const SearchRS = ({
                    placeholder,
                    handleChange,
                    option = [],
                    value = null,
                    defaultValue = null,
                    isClearable = true,
                    isLong = false,
                    required = false
                  }: SearchRS) => {
  const placeholderComponent = (
    <div>
      <span style={{color: 'gray', fontSize: 11}}>{placeholder}</span>
    </div>
  );

  const customStyles = {
    control: (provided: any) => ({
      // none of react-select's styles are passed to <Control />
      ...provided,
      width: '100%',
      fontSize: 13,
      borderRadius: 5,
      paddingLeft: 10,
    }),
    input: (provided: any) => ({
      ...provided,
    }),
    option: (provided: any) => ({
      ...provided,
      fontSize: 13,
      lineHeight: 0.9
    }),
  };

  return (
    <div className={`searchRS-baseContainer`} style={{width: isLong ? '100%' : '50%'}}>
      <Select
        components={{MenuList}}
        isClearable={isClearable}
        placeholder={placeholderComponent}
        styles={customStyles}
        options={!!option ? option : []}
        value={value}
        defaultValue={defaultValue}
        onChange={handleChange}
      />
      {required && <div className={"searchRS-required"}/>}
    </div>
  );
};

export default SearchRS;