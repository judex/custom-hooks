import { useEffect, useState } from "react";


const localCache = {};

export const useFetch = (url) => {
    
    const [state, setState] = useState({
        data: null,
        isLoading: true,
        hasError: false,
        error: null
    });
    
    useEffect(() => {
        getFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [url]);
    
    const setLoadingState = () => {
        setState({
            data: null,
            isLoading: true,
            hasError: false,
            error: null
        });
    }

    const getFetch = async () => { 
        if (localCache[url]) {
            setState({
                data: localCache[url],
                isLoading: false,
                hasError: false,
                error: null
            });
            return;
        }
        
        setLoadingState();
        const resp = await fetch(url);        

        // sleep(2000);
        await new Promise((resolve) => setTimeout(resolve, 1000));

        if (!resp.ok) { // si la respuesta no es correcta
            setState({
                data: null,
                isLoading: false,
                hasError: true,
                error: {
                    code: resp.status,
                    message: resp.statusText
                }
            });
            return;
        }
        
        const data = await resp.json();
        setState({
            data: data,
            isLoading: false,
            hasError: false,
            error: null
        })
        // manejo de cache
        localCache[url] = data;
        
    }

    // const { data, isLoading, hasError } = state; //B

    // return { // A con esto se puede desestructurar
    //     data: state.data,
    //     isLoading: state.isLoading,
    //     hasError: state.hasError,
    // }

    // return { //B con esta forma se puede desestructurar
    //     data,
    //     isLoading,
    //     hasError,
    // }    
    return { // esta es otra forma de desestructurar conocida como "spread operator"
        ...state
    }    
}
