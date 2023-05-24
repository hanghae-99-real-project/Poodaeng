import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import Router from "./shared/Router";

const queryClient = new QueryClient();

function App() {
  // const [count, setCount] = useState(0);
  // const something = 'hi';
  // if (something === 'hi') {
  //   console.log('hi');
  // } else {
  //   console.log('bye');
  // }
  // console.log('done');
  // useEffect(() => {
  //   setInterval(() => {
  //     console.log(`Count is: ${count}`);
  //   }, 2000);
  // }, []);

  // return (
  //   <div>
  //     {count}
  //     <button type='button' onClick={() => setCount(count + 1)}>
  //       Increase
  //     </button>
  //   </div>
  // );
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
    </QueryClientProvider>
  );
}

export default App;
