import React from "react";
import useProduct from "vtex.product-context/useProduct"

function Teste() {
    const product = useProduct();

    console.log(product);
    
    return null;
}

export default Teste;
