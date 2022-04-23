import React from "react";
import Button from "./components/Button/button";
import Menu from "./components/Menu/menu";
import MenuItem from "./components/Menu/menuItem";
import SubMenu from "./components/Menu/subMenu";
import Icon from "./components/Icon/icon";
import {library} from "@fortawesome/fontawesome-svg-core";
import {fas} from "@fortawesome/free-solid-svg-icons";
import Input from "./components/Input/input";
import AutoComplete from "./components/AutoComplete/autoComplete";

library.add(fas);

function App() {
  const arr = ["aaa", "aa", "a", "bbb", "bb", "b"];
  return (
    <div className="App">
      <header className="App-header">
        <AutoComplete
          onSelect={(item) => console.log(item)}
          fetchSuggestions={(query: string) => arr.filter(item => item.includes(query))}/>


        <Input icon={"face-angry"} prepend={"hahaha"} onChange={(e) => console.log(e.currentTarget.value)}/>

        <Icon icon={"coffee"} theme={"primary"}/>

        <Menu mode={"horizontal"} defaultOpenSubMenus={["2"]} defaultIndex={"0"} onSelect={(index) => {alert(index);}}>
          <MenuItem>123</MenuItem>
          <MenuItem>123</MenuItem>
          <SubMenu title={"hahaha"}>
            <MenuItem>123</MenuItem>
            <MenuItem>123</MenuItem>
            <MenuItem>123</MenuItem>
          </SubMenu>
          <MenuItem>123</MenuItem>
          <MenuItem>123</MenuItem>
        </Menu>


        <Button> Hello World </Button>
        <Button
          btnType="primary"
          size="lg"
          autoFocus
          onClick={(e) => {
            e.preventDefault();
            console.log(e);
          }}
        > Primary+Large </Button>
        <Button disabled btnType="primary" size="lg"> Primary+Large </Button>
        <Button btnType="danger" size="lg"> Primary+Small </Button>
        <Button btnType="link" hrefLink="http://www.xxx.com"> Link </Button>
        <Button btnType="link" disabled hrefLink="http://www.xxx.com"> Link </Button>
        <hr/>
        <code>
          const a = 'blank'
        </code>
        <p>
          Edit
          <code>
            src/App.tsx
          </code>
        </p>
      </header>
    </div>
  );
}

export default App;
