import React, {ChangeEvent, ReactElement, useEffect, useState, KeyboardEvent} from "react";
import Input, {InputProps} from "../Input/input";
import Icon from "../Icon";
import useDebounce from "../../hooks/useDebounce";
import classNames from "classnames";

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
  const [highlightIndex, setHighlightIndex] = useState(-1);
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
    // 重置高亮
    setHighlightIndex(-1);
  }, [debouncedValue]);
  const highlight = (index: number) => {
    if (index < 0) {
      index = 0;
    }
    if (index >= suggestions.length) {
      index = suggestions.length - 1;
    }
    setHighlightIndex(index);
  };
  const handleKeyDown = ({keyCode}: KeyboardEvent<HTMLInputElement>) => {
    console.log("keyboard", keyCode);
    switch (keyCode) {
      case 13:
        // Enter 键选中当前的 item
        if (suggestions[highlightIndex]) {
          handleSelect(suggestions[highlightIndex]);
        }
        break;
      case 38:
        // ↑ 键盘选中高亮item
        highlight(highlightIndex - 1);
        break;
      case 40:
        // ↓ 键盘选中高亮item
        highlight(highlightIndex + 1);
        break;
      case 27:
        // Esc 关闭搜索结果栏
        setSuggestions([]);
        break;
      default:
        break;
    }
  };
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
          const cnames = classNames("suggestion-item", {
            "item-highlighted": index === highlightIndex
          });
          return (
            <li key={index} className={cnames} onClick={() => handleSelect(item)}>
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
        onKeyDown={handleKeyDown}
        {...restProps}
      />
      {loading && <ul><Icon icon={"spinner"} spin/></ul>}
      {(suggestions.length > 0) && generateDropdown()}
    </div>
  );
};

export default AutoComplete;
