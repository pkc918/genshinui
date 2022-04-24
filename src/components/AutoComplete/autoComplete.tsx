import React, {ChangeEvent, ReactElement, useEffect, useState} from "react";
import Input, {InputProps} from "../Input/input";
import Icon from "../Icon";
import useDebounce from "../../hooks/useDebounce";

interface DataSourceObject {
  value: string;
}

export type DataSourceType<T = {}> = T & DataSourceObject;

export interface AutoCompleteProps extends Omit<InputProps, "onSelect"> {
  fetchSuggestions: (str: string) => DataSourceType[] | Promise<DataSourceType[]>; // 处理要展示的数据
  onSelect?: (item: DataSourceType) => void; // 选择事件
  renderOption?: (item: DataSourceType) => ReactElement; // 自定义渲染模板
}

const AutoComplete: React.FC<AutoCompleteProps> = (props) => {
  const {fetchSuggestions, onSelect, value, renderOption, ...restProps} = props;
  const [inputValue, setInputValue] = useState<string>(value as string);
  const [suggestions, setSuggestions] = useState<DataSourceType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  // 自定义 hooks， 使用 useEffect 防抖
  const debouncedValue = useDebounce(inputValue, 500);
  useEffect(() => {
    if (debouncedValue) {
      const results = fetchSuggestions(inputValue);
      // 支持异步
      if (results instanceof Promise) {
        console.log("triggered");
        setLoading(true);
        results.then(data => {
          setLoading(false);
          setSuggestions(data);
        });
      } else {
        setSuggestions(results);
      }
    } else {
      setSuggestions([]);
    }
  }, [debouncedValue]);
  // 输入框输入时执行
  // 输入框有值时，suggestions 设置成对应的提示值
  // 输入框没有值时，suggestions 为 空数组
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setInputValue(value);

  };
  const handleSelect = (item: DataSourceType) => {
    setInputValue(item.value); // input 框内容填充为选择的内容
    setSuggestions([]); // 将下方选择内容清空
    onSelect?.(item); // 将内容传递给用户
  };
  const renderTemplate = (item: DataSourceType) => {
    return renderOption ? renderOption(item) : item.value;
  };
  const generateDropdown = () => {
    return (
      <ul>
        {suggestions.map((item, index) => {
          return (
            <li key={index} onClick={() => handleSelect(item)}>
              {renderTemplate(item)}
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
      {loading && <ul><Icon icon={"spinner"} spin/></ul>}
      {(suggestions.length > 0) && generateDropdown()}
    </div>
  );
};

export default AutoComplete;
