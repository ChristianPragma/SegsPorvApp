
export abstract class BaseApiService {
    // constructor(parameters) {}

  protected async post<T>(url: string, data?: any): Promise<T> {
    const requestOptions: RequestInit = {
       // ...options,
        method: 'POST',
        headers: {
          // ...options.headers,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      };
      console.log('llamando api-post');   
    return fetch(url, requestOptions)
      .then((response) => {
        // console.log('response api-post',response);        
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        return response.json();
      })
      .catch((error) => {
        // Manejo personalizado del error
        console.error('Error en la solicitud:', error);
        throw error;
      });
  }

}


