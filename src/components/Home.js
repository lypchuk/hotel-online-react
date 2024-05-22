import React, { useState } from "react";

export default function Home() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount = count + 1;
    console.log(count);
  };

  return (
    <>
      <div>Home page</div>;
      <div>
        <span className={count > 10 ? "red" : ""}>Counter: {count}</span>
        <button onClick={increment}>+</button>
      </div>
    </>
  );
}
