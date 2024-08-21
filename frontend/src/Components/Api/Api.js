// const apiUrl = import.meta.env.VITE_API_URL;

// export default Api = async (url) => {
//     try {
//         const response = await fetch(`${apiUrl}${url}`);
//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }
//         const result = await response.json();
//         return result;
//     } catch (error) {
//         console.error('Fetch error:', error);
//         return { error: error.message };
//     }
// };



const apiUrl = import.meta.env.VITE_API_URL;

const apiFetch = async (url) => {
    try {
        const response = await fetch(`${apiUrl}${url}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Fetch error:', error);
        return { error: error.message };
    }
};

export default apiFetch;
