import React, {ChangeEvent, useState} from "react";
import Input, {InputProps} from "../Input/input";

export interface AutoCompleteProps extends Omit<InputProps, "onSelect"> {
  fetchSuggestions: (str: string) => string[]; // 处理要展示的数据
  onSelect?: (item: string) => void; // 选择事件
}

const AutoComplete: React.FC<AutoCompleteProps> = (props) => {
  const {fetchSuggestions, onSelect, value, ...restProps} = props;
  const [inputValue, setInputValue] = useState(value);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  // 输入框输入时执行
  // 输入框有值时，suggestions 设置成对应的提示值
  // 输入框没有值时，suggestions 为 空数组
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setInputValue(value);
    if (value) {
      const results = fetchSuggestions(value);
      setSuggestions(results);
    } else {
      setSuggestions([]);
    }
  };

  const generateDropdown = () => {
    return (
      <ul>
        {suggestions.map((item, index) => {
          return (
            <li key={index}>
              {item}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div className={"genshin-auto-complete"}>
      <Input
        value={inputValue}
        onChange={handleChange}
        {...restProps}
      />
      {(suggestions.length > 0) && generateDropdown()}
    </div>
  );
};

export default AutoComplete;
