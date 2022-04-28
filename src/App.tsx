import React, {useEffect, useState} from "react";
import Button from "./components/Button/button";
import Menu from "./components/Menu/menu";
import MenuItem from "./components/Menu/menuItem";
import SubMenu from "./components/Menu/subMenu";
import Icon from "./components/Icon/icon";
import {library} from "@fortawesome/fontawesome-svg-core";
import {fas} from "@fortawesome/free-solid-svg-icons";
import Input from "./components/Input/input";
import AutoComplete from "./components/AutoComplete/autoComplete";
import axios from "axios";
import Upload from "./components/Upload/upload";

library.add(fas);

// interface LakerType {
//   value: string;
// }
// interface GithubUserProps {
//   login: string;
//   url: string;
//   avatar_url: string;
// }

function App() {

  // const arr = ["aaa", "aa", "a", "bbb", "bb", "b"];
  // const renderOption = (item: DataSourceType<GithubUserProps>) => {
  //   return (
  //     <>
  //       <h1>{item.value}</h1>
  //     </>
  //   );
  // };
  // const lakers = [
  //   {value: "aaa"},
  //   {value: "aa"},
  //   {value: "a"},
  //   {value: "bbb"},
  //   {value: "bb"},
  //   {value: "b"},
  // ];
  const handleFetch = (query: string) => {
    return fetch(`https://api.github.com/search/users?q=${query}`)
      .then(res => res.json())
      .then(({items}) => {
        console.log(items);
        return items.slice(0, 10).map((item: any) => ({value: item.login, ...item}));
      });
  };
  // const renderOption = (item: DataSourceType) => {
  //   return (
  //     <>
  //       <div>Name: {item}</div>
  //     </>
  //   )
  // }

  const [title, setTitle] = useState("");
  const postData = {
    title: "my title",
    body: "hello man"
  };
  useEffect(() => {
    axios.post("https://jsonplaceholder.typicode.com/posts", postData)
      .then(res => {
        console.log(res);
        setTitle(res.data.title);
      });
  });
  return (
    <div className="App">
      <header className="App-header">
        <Upload
          action={"https://jsonplaceholder.typicode.com/posts/"}
        />


        {title}
        <AutoComplete
          onSelect={(item) => console.log(item)}
          fetchSuggestions={handleFetch}/>


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
