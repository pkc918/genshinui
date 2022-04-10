import React from "react";
import Button, {ButtonSize, ButtonType} from "./components/Button/button";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Button> Hello World </Button>
        <Button btnType={ButtonType.Primary} size={ButtonSize.Large}> Primary+Large </Button>
        <Button btnType={ButtonType.Danger} size={ButtonSize.Small}> Primary+Large </Button>
        <Button btnType={ButtonType.Link} hrefLink="http://www.xxx.com"> Link </Button>
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
