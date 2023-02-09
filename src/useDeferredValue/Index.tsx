import { useState,useTransition, useEffect,startTransition, useDeferredValue } from "react";
interface Name {
  name: string;
}
export const ProductCards = (props: Name) => {
  const { name } = props;
  const [products, setProducts] = useState<string[]>([]);
  useEffect(() => {
    console.log(name);
    const SIZE = 9999;
    const result = [];
    for (let i = 0; i < SIZE; i++) {
      result.push(name);
    }
    setProducts(result);
  }, [name]);

  return (
    <div>
      {products.map((item, index) => {
        return <li key={index}>{item}</li>;
      })}
    </div>
  );
};

const ProductList = () => {
  const [name, setName] = useState<string>("");
 const [deferredName, setDeferredName] = useState<string>("")
//   const deferredName = useDeferredValue(name);
const [ pending , startTransition]=useTransition()
const handleChange=(e:React.ChangeEvent<HTMLInputElement>) => {
setName(e.target.value)
startTransition(()=>{
    setDeferredName(e.target.value)
})

}
console.log('pending', pending);

  return (
    <>
      <input
        type="text"
        value={name}
        onChange={handleChange}
        autoFocus
      />
      <ProductCards name={deferredName} />
    </>
  );
};

export default ProductList;
